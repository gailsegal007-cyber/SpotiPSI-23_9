import os
import json
import uuid
from flask import Flask, jsonify, request, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # מאפשר בקשות מה-Frontend שרץ על דומיין/פורט אחר

DATA_DIR = 'data'
SONGS_FILE = os.path.join(DATA_DIR, 'songs.json')
PLAYLISTS_FILE = os.path.join(DATA_DIR, 'playlists.json')
FAVORITES_FILE = os.path.join(DATA_DIR, 'favorites.json')

# יצירת תיקיית data אם לא קיימת
os.makedirs(DATA_DIR, exist_ok=True)

# טעינת נתונים מקבצים או יצירת קבצים ריקים
def load_json_data(filepath, default_data):
    if not os.path.exists(filepath):
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(default_data, f, indent=2, ensure_ascii=False)
        return default_data
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        # אם הקובץ פגום או נמחק, נייצר מחדש
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(default_data, f, indent=2, ensure_ascii=False)
        return default_data


def save_json_data(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# טעינת נתונים ראשונית
songs_data = load_json_data(SONGS_FILE, [])
playlists_data = load_json_data(PLAYLISTS_FILE, [])
favorites_data = load_json_data(FAVORITES_FILE, []) # מערך של song IDs

# --- Routes ---

@app.route('/api/songs', methods=['GET'])
def get_songs():
    """ מחזיר את כל השירים הזמינים """
    # כאן אפשר להוסיף לוגיקה לסרוק תיקייה או להשתמש בקובץ ה-JSON
    return jsonify(songs_data)

@app.route('/api/playlists', methods=['GET'])
def get_playlists():
    """ מחזיר את כל הפלייליסטים """
    return jsonify(playlists_data)

@app.route('/api/playlists', methods=['POST'])
def create_playlist():
    """ יוצר פלייליסט חדש """
    if not request.json or 'name' not in request.json or not request.json['name'].strip():
        abort(400, description="שם פלייליסט חסר או ריק")

    new_playlist_name = request.json['name'].strip()
    new_playlist_id = str(uuid.uuid4()) # יצירת ID ייחודי

    new_playlist = {
        "id": new_playlist_id,
        "name": new_playlist_name,
        "songIds": []
    }

    playlists_data.append(new_playlist)
    save_json_data(PLAYLISTS_FILE, playlists_data)
    return jsonify(new_playlist), 201

@app.route('/api/playlists/<string:playlist_id>/add', methods=['POST'])
def add_song_to_playlist(playlist_id):
    """ מוסיף שיר לפלייליסט """
    playlist = next((p for p in playlists_data if p['id'] == playlist_id), None)
    if not playlist:
        abort(404, description="פלייליסט לא נמצא")

    if not request.json or 'songId' not in request.json:
        abort(400, description="מזהה שיר (songId) חסר")

    song_id_to_add = request.json['songId']

    # וודא שהשיר קיים (אופציונלי אך מומלץ)
    if not any(s['id'] == song_id_to_add for s in songs_data):
         abort(404, description="השיר שאתה מנסה להוסיף לא קיים במערכת")

    if song_id_to_add not in playlist['songIds']:
        playlist['songIds'].append(song_id_to_add)
        save_json_data(PLAYLISTS_FILE, playlists_data)

    return jsonify(playlist)

@app.route('/api/favorites', methods=['GET'])
def get_favorites():
    """ מחזיר את רשימת ה-IDs של השירים המועדפים """
    return jsonify(favorites_data)

@app.route('/api/favorites/add', methods=['POST'])
def add_favorite():
    """ מוסיף שיר למועדפים """
    if not request.json or 'songId' not in request.json:
        abort(400, description="מזהה שיר (songId) חסר")
    song_id = request.json['songId']

    # וודא שהשיר קיים
    if not any(s['id'] == song_id for s in songs_data):
        abort(404, description="השיר שאתה מנסה להוסיף לא קיים במערכת")

    if song_id not in favorites_data:
        favorites_data.append(song_id)
        save_json_data(FAVORITES_FILE, favorites_data)
    return jsonify(favorites_data)

@app.route('/api/favorites/remove', methods=['POST'])
def remove_favorite():
    """ מסיר שיר מהמועדפים """
    if not request.json or 'songId' not in request.json:
        abort(400, description="מזהה שיר (songId) חסר")
    song_id = request.json['songId']

    if song_id in favorites_data:
        favorites_data.remove(song_id)
        save_json_data(FAVORITES_FILE, favorites_data)
    # מחזירים גם אם השיר לא היה שם במקור
    return jsonify(favorites_data)


if __name__ == '__main__':
    # שינוי: מאזין לכל הכתובות הזמינות במחשב בפורט 5001
    app.run(host='0.0.0.0', port=5001, debug=True)

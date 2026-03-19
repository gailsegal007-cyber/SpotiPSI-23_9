import Song from "./song";
import useStyles from "./songStyle";


interface Song {
    id: string;
    name: string;
    artist: string;
    album: string;
}

interface SongListProps {
    songs: Song[];
    favoriteSongs: string[];
    setFavoriteSongs: React.Dispatch<React.SetStateAction<string[]>>;
    addToPlaylist?: (id: string) => void;

    playSongFunction : React.RefObject<((song: Song) => void) |null>; //prop drilling to song
    songQueue: React.RefObject<Song[]>;
}

const SongList: React.FC<SongListProps> = ({ songs, favoriteSongs, setFavoriteSongs, addToPlaylist , playSongFunction, songQueue}) => {


    if (songs.length === 0) {
        return <p>Loading songs...</p>;
    }

    const { classes } = useStyles()

    songQueue.current = songs; //sets the queue to the current list displayed on the screen

    return (
        <div className={classes.scrollBar}>
            {songs.map(song => (
                <Song
                    key={song.id}
                    song={song}
                    f_songs={favoriteSongs}
                    setFavoriteSongs={setFavoriteSongs}
                    addToPlaylist={addToPlaylist ? () => addToPlaylist(song.id) : undefined}
                    playSongFunction={playSongFunction}
                />
            ))}
        </div>
    );
};

export default SongList;
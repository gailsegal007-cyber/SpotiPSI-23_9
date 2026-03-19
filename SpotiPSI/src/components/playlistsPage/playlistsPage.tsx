import React, { useState } from "react";
import useStyles from "./playlistsPageStyle";
import SongList from "../songs/songList";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

const URL = "http://127.0.0.1:5001/api";

interface Props {
    songsList: Song[];
    playlist: Playlist[];
    favoriteSongs?: string[];
    setFavoriteSongs?: React.Dispatch<React.SetStateAction<string[]>>;
    setAllPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
    goToPlaylist: (id: string) => void;
}

interface Song {
    id: string;
    name: string;
    artist: string;
    album: string;
}

export interface Playlist {
    id: string;
    name: string;
    songsIds: string[]; 
}

const PlaylistsPage: React.FC<Props> = ({ songsList,playlist,favoriteSongs = [],setFavoriteSongs,setAllPlaylists,goToPlaylist}) => {
    const { classes } = useStyles();

    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");

    const selectedPlaylist = playlist.find(p => p.id === selectedPlaylistId);

    const playlistSongs = selectedPlaylist
        ? songsList.filter(song => selectedPlaylist.songsIds.includes(song.id))
        : [];

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewPlaylistName("");
    };


    const handleCreatePlaylist = async () => {
        if (!newPlaylistName.trim()) return;

        try {
            const response = await fetch(`${URL}/playlists`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newPlaylistName.trim() }),
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("Server error:", text);
                return;
            }

            const newPlaylist: Playlist = await response.json();
            setAllPlaylists(prev => [...prev, newPlaylist]);
            handleCloseDialog();
        } 
        catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <div className={classes.page}>      
            <div className={classes.topRow}>
                <div className={classes.leftSide}>
                    <h2 className={classes.title}>הפלייליסטים שלי</h2>
                </div>

                <div className={classes.rightSide}>
                    <Button className={classes.creatPlaylistButton} onClick={handleOpenDialog} >
                        צור פלייליסט
                    </Button>
                </div>
            </div>

            <div>
                {playlist.map(p => (
                    <button
                        key={p.id}
                        className={classes.playlistButton}
                        onClick={() => goToPlaylist(p.id)}
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            <div>
                {selectedPlaylist ? (
                    <SongList
                        songs={playlistSongs}
                        favoriteSongs={favoriteSongs}
                        setFavoriteSongs={setFavoriteSongs || (() => {})}
                    />
                ) : (
                    <p>
                        בחר פלייליסט כדי לראות את השירים
                    </p>
                )}
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>צור פלייליסט חדש</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="שם הפלייליסט"
                        type="text"
                        fullWidth
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>בטל</Button>
                    <Button onClick={handleCreatePlaylist} variant="contained">
                        צור
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PlaylistsPage;
import React, { useState } from "react";
import useStyles from "./playlistsPageStyle";
import SongList from "../songs/songList";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

interface Props {
    songsList: Song[];
    playlist: Playlist[];
    favoriteSongs?: string[]; 
    setFavoriteSongs?: React.Dispatch<React.SetStateAction<string[]>>;
    setAllPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
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


const PlaylistsPage: React.FC<Props> = ({ songsList, playlist, favoriteSongs = [], setFavoriteSongs, setAllPlaylists}) => {
    const { classes } = useStyles();

    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");

    const selectedPlaylist = playlist.find(p => p.id === selectedPlaylistId);
    const playlistSongs = selectedPlaylist ? songsList.filter(song => selectedPlaylist.songsIds.includes(song.id)): [];

    // Dialog handlers
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewPlaylistName("");
    };

    //  POST request to server with new playlist
    const handleCreatePlaylist = async () => {
        if (!newPlaylistName.trim()) return;

        try {
            const response = await fetch(`${URL}/playlists`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newPlaylistName.trim() }),
            });

            if (!response.ok) throw new Error("Failed to create playlist");

            const newPlaylist: Playlist = await response.json();
            setAllPlaylists(prev => [...prev, newPlaylist]); 
            handleCloseDialog();
        } 
        catch (error) {
            console.error(`Error ${error}`);
        }
    };

    return (
        <div className={classes.page}>
            <div className={classes.topRow}>
                    
                    <div className={classes.rightSide}>
                        <h2 className={classes.title}>הפלייליסטים שלי</h2>
                    </div>
                    
                    <div className={classes.leftSide}>
                        <Button
                            className={classes.creatPlaylistButton}
                            onClick={handleOpenDialog}
                        >
                            צור פלייליסט חדש
                        </Button>
                    </div>
            </div>

            <div className={classes.playlistButtons}>
                {playlist.map(p => (
                    <button
                        key={p.id}
                        //className={`${classes.playlistButton} ${p.id === selectedPlaylistId ? classes.active : ""}`}
                        onClick={() => setSelectedPlaylistId(p.id)}
                    >
                        {p.name}
                    </button>
                ))}
            </div>
            
            
            <Dialog open={openDialog} onClose={handleCloseDialog} className={classes.dialogStyle}>
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
                    <Button onClick={handleCreatePlaylist} variant="contained" color="primary">
                        צור
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PlaylistsPage;

/*<div className={classes.songsWrapper}>
                {selectedPlaylist ? (
                    <SongList
                        songs={playlistSongs}
                        favoriteSongs={favoriteSongs}
                        setFavoriteSongs={setFavoriteSongs || (() => {})}
                    />
                ) : (
                    <p className={classes.noPlaylistSelected}>בחר פלייליסט כדי לראות את השירים</p>
                )}
            </div>*/
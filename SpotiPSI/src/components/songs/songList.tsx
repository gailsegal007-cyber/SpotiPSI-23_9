import React, { useEffect } from "react";
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
    fetchSongs: <T,>(
        route: "songs" | "playlists" | "favorites",
        setFunction: React.Dispatch<React.SetStateAction<T[]>>
    ) => Promise<void>;
    setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
    route?: "songs" | "playlists" | "favorites"; 
}

const SongList: React.FC<SongListProps> = ({ songs, fetchSongs, setSongs, route = "songs" }) => {

    useEffect(() => {
        fetchSongs<Song>(route, setSongs);
    }, [fetchSongs, setSongs, route]);

    if (songs.length === 0) {
        return <p>Loading songs...</p>;
    }

    const { classes } = useStyles()

    return (
        <div className={classes.scrollBar}>
            {songs.map(song => (
                <Song 
                    key={song.id} 
                    {...song} 
                    //onPlay={onPlay} 
                    //onFavorite={onFavorite} 
                />
            ))}
        </div>
    );
};

export default SongList;
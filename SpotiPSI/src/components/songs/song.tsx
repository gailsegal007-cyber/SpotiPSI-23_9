import useStyles from "./songStyle";
import React from "react";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    song: SongProps;
    f_songs: string[];
    setFavoriteSongs: React.Dispatch<React.SetStateAction<string[]>>;
    addToPlaylist?: (id: string) => void;
    playSongFunction : React.RefObject<((song: SongProps) => void) |null>;
}

export interface SongProps {
    id: string;
    name: string;
    artist: string;
    album: string;
}

interface Message {
    "songId": string
}

const BASE_URL: string = 'http://127.0.0.1:5001/api/favorites'


//A component for a basic song
const Song: React.FC<Props> = ({ song, f_songs, setFavoriteSongs, playSongFunction , addToPlaylist}) => {

    const { classes } = useStyles();

    /**
     * Checks if the songs is a favorite
     * @returns True if the song is in the favorites array false otherwise
     */
    const is_favorite = () => {

        return f_songs.includes(song.id);
    };


    /**
     * 
     * @param id the id of the song
     * @param route whether we are adding the song or removing it
     * @param setFavoriteSongs the set for the favoriteSongs state
     */
    const sendToServer = async (id: string, route: "add" | "remove", setFavoriteSongs: React.Dispatch<React.SetStateAction<string[]>>) => {

        const dataToSend: Message = { "songId": id }

        const urlWithRoute = `${BASE_URL}/${route}`

        //gets the data from the server
        try {
            const response = await fetch(urlWithRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend)
            });
            const data = await response.json();
            setFavoriteSongs(data); //updates the favorite songs state

        } catch (error) {

            console.log(error);

        }


    }

    /**
     * Function that happens when the heart is clicked
     */
    const heartClicked = () => {
        if (is_favorite()) {
            sendToServer(song.id, "remove", setFavoriteSongs)
        } else {
            sendToServer(song.id, "add", setFavoriteSongs)
        }
    }

    //plays the selected song
    const chooseSong = () => {
        if (playSongFunction.current !== null){
        playSongFunction?.current(song);
        }
        
    }

    return (
        <div className={classes.song}>

            <div className={classes.leftSide}>
                <Button
                    className={classes.button_play}
                    startIcon={<PlayArrowIcon />}
                    onClick={chooseSong} //plays the chosen song
                />
                <strong>{song.name}</strong> by {song.artist} <em>({song.album})</em>
            </div>

            <div className={classes.rightSide}>
                {addToPlaylist && (
                <Button
                    className={classes.button_favorite}
                    startIcon={<AddIcon />}
                    onClick={() => addToPlaylist && addToPlaylist(song.id)}
                    disabled={!addToPlaylist}
                />
                )}
                <Button
                    className={classes.button_favorite}
                    startIcon={
                        is_favorite() ? <FavoriteIcon /> : <FavoriteBorderIcon />
                    }
                    onClick={heartClicked}
                />

            </div>
        </div>
    );
};

export default Song;
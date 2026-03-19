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
}

export interface SongProps {
    id: string;
    name: string;
    artist: string;
    album: string;
}

const Song: React.FC<Props> = ({ song, f_songs }) => {

    const is_favorite = () => {
        
        return f_songs.includes(song.id);
    };
    console.log("Song:", song.name, "is favorite?", is_favorite());

    const { classes } = useStyles();

    return (
        <div className={classes.song}>
            
            <div className={classes.leftSide}>
                <Button
                    className={classes.button_play}
                    startIcon={<PlayArrowIcon />}
                />
                <strong>{song.name}</strong> by {song.artist} <em>({song.album})</em>
            </div>

            <div className={classes.rightSide}>
                <Button
                    className={classes.button_favorite}
                    startIcon={<AddIcon />}
                />
                <Button
                    className={classes.button_favorite}
                    startIcon={
                        is_favorite() ? <FavoriteIcon /> : <FavoriteBorderIcon />
                    }
                />
                
            </div>
        </div>
    );
};

export default Song;
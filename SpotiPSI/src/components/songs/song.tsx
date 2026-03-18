import useStyles from "./songStyle";
import React from "react";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';

export interface SongProps {
    id: string;
    name: string;
    artist: string;
    album: string;
    onPlay?: (id: string) => void;      
    onFavorite?: (id: string) => void;  
}

const Song:React.FC<SongProps> = ({ id, name, artist, album, onPlay, onFavorite}) => {
    const { classes } = useStyles()
    return(
        <div className={classes.song}>
        
        {/* LEFT SIDE */}
        <div className={classes.leftSide}>
            <Button
                className={classes.button_play}
                onClick={() => onPlay && onPlay(id)}
                startIcon={<PlayArrowIcon />}
            />
            <strong>{name}</strong> by {artist} <em>({album})</em>
        </div>

        {/* RIGHT SIDE */}
        <div className={classes.rightSide}>
            <Button
                className={classes.button_favorite}
                onClick={() => onFavorite && onFavorite(id)}
                startIcon={<AddIcon />}
            />
            <Button
                className={classes.button_favorite}
                onClick={() => onFavorite && onFavorite(id)}
                startIcon={<FavoriteBorderIcon />}
            />
        </div>

    </div>
           
    )
}

export default Song;
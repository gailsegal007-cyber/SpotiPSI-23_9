import useStyles from "./playerStyles";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import useAudioPlayer from "../../hooks/useAudioPlayer";

interface Props {
    audioRef : React.RefObject<HTMLAudioElement |null>;
    playSongFunction : React.RefObject<((song: Song) => void) |null>;
    songQueue: React.RefObject<Song[]>;
    
}

interface Song {
    id: string,
    name: string,
    artist: string,
    album: string
}

//A component that displays the current song, with a pause, play, and next/previous songs button
const Player: React.FC<Props>  =(prop:Props) =>{
    const {classes} = useStyles()
    const {currentSong, isPlaying, play, togglePlayPause, nextSong, previousSong} = useAudioPlayer(prop.audioRef, prop.songQueue)

    prop.playSongFunction.current = play; //this way App can have access to play song

    const playClicked = () => {
        togglePlayPause(); 
    }

    return(
        <div className={classes.player}>
            <h4 className={classes.text}>{currentSong?.name}</h4>
            <h5 className={classes.text}>{currentSong?.artist}</h5>
            <div className={classes.buttonRow}>
                <SkipNextIcon onClick={nextSong}/>
                {(isPlaying) === true? (
                    <PauseIcon onClick={playClicked} /> 
                ):(
                    <PlayArrowIcon onClick={playClicked} /> 
                )}
                <SkipPreviousIcon onClick={previousSong}/>
            </div>
        </div>
    )
}

export default Player;
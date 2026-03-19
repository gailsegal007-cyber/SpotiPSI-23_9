import SongList from "../songs/songList"
import useStyles from "./AllSongsStyles";

interface Props {

    songsList: Song[];
    favoriteSongsId: string[];
    setFavoriteSongs: React.Dispatch<React.SetStateAction<string[]>>;
    playSongFunction : React.RefObject<((song: Song) => void) |null>; //prop drilling to song
    songQueue: React.RefObject<Song[]>; //prop drilling to songlist 

}

interface Song {
    id: string;
    name: string;
    artist: string;
    album: string;
}

//A component for all of the songs
const AllSongs: React.FC<Props> = (props: Props) => {
    const { classes } = useStyles();
    const title = "כל השירים"

    return (
        <div className={classes.songsContainer}>
            <h2 className={classes.title}>{title}</h2>
            <SongList songs={props.songsList} favoriteSongs={props.favoriteSongsId} setFavoriteSongs={props.setFavoriteSongs} playSongFunction={props.playSongFunction} songQueue={props.songQueue}/>
        </div>
    )


}

export default AllSongs
import SongList from "../songs/songList"
import useStyles from "./AllSongsStyles";

interface Props {

    songsList: Song[];
    favoriteSongsId: string[];
    setFavoriteSongs: React.Dispatch<React.SetStateAction<string[]>>;

}

interface Song {
    id: string;
    name: string;
    artist: string;
    album: string;
}


const AllSongs: React.FC<Props> = (props: Props) => {
    const { classes } = useStyles();
    const title = "כל השירים"

    return (
        <div className={classes.songsContainer}>
            <h2 className={classes.title}>{title}</h2>
            <SongList songs={props.songsList} favoriteSongs={props.favoriteSongsId} setFavoriteSongs={props.setFavoriteSongs} />
        </div>
    )


}

export default AllSongs
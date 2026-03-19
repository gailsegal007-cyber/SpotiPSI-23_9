import useStyles from "./FavoritesPageStyle";
import SongList from "../songs/songList";

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

const FavoritesPage: React.FC<Props> = (props: Props) => {
    const { classes } = useStyles();

    //filters the songs to create an array of just the favorite songs
    const favoriteSongs = props.songsList.filter((song) => {
        return props.favoriteSongsId.includes(song.id);
    })

    const title = "המועדפים שלי"

    return (
        <div className={classes.songsContainer}>
            <h2 className={classes.title}>{title}</h2>
            <SongList songs={favoriteSongs} favoriteSongs={props.favoriteSongsId} setFavoriteSongs={props.setFavoriteSongs}/>
        </div>
    )

}

export default FavoritesPage;
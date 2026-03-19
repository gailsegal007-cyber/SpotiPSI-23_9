import useStyles from "./FavoritesPageStyle";
import SongList from "../songs/songList";

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

//A component that displays the favorite songs
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
            <SongList songs={favoriteSongs} favoriteSongs={props.favoriteSongsId} setFavoriteSongs={props.setFavoriteSongs} playSongFunction={props.playSongFunction} songQueue={props.songQueue}/>
        </div>
    )

}

export default FavoritesPage;
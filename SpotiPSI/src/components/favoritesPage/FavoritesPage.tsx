import useStyles from "./FavoritesPageStyle";

interface Props {

    songsList: Song[];
    favoriteSongsId: string[];

}

interface Song {
    id: string;
    name: string;
    artist: string;
    album: string;
}

const FavoritesPage: React.FC<Props> = (props: Props) => {
    const { classes } = useStyles()

    const favoriteSongs = props.songsList.filter((song) => {
        return props.favoriteSongsId.includes(song.id);
    })

    const title = "המועדפים שלי"

    return (
        <div>
            <h2 className={classes.title}>{title}</h2>
        </div>
    )

}

export default FavoritesPage;
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
    favoriteSongs: string[];
    setFavoriteSongs: React.Dispatch<React.SetStateAction<string[]>>;
}

const SongList: React.FC<SongListProps> = ({ songs, favoriteSongs, setFavoriteSongs }) => {


    if (songs.length === 0) {
        return <p>Loading songs...</p>;
    }

    const { classes } = useStyles()

    return (
        <div className={classes.scrollBar}>
            {songs.map(song => (
                <Song
                    key={song.id}
                    song={song}
                    f_songs={favoriteSongs}
                    setFavoriteSongs={setFavoriteSongs}
                />
            ))}
        </div>
    );
};

export default SongList;
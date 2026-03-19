import { useState, useEffect } from "react";
import Header from "./components/header/header";
import Player from "./components/player/player";
import "./App.css";
import SideBar from "./components/sidebar/Sidebar";
import SongList from "./components/songs/songList"
import useStyles from "./AppStyles";

const URL: string = 'http://127.0.0.1:5001/api/'


interface Song {
    id: string,
    name: string,
    artist: string,
    album: string
}


const App: React.FC = () => {
    const {classes} = useStyles();

    const [allSongs, setAllSongs] = useState<Song[]>([]);
    const [favoriteSongs, setFavoriteSongs] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<"songs" | "playlists" | "favorites">("songs");

    /**
     * 
     * @param route the route to the array we want to get. Either "songs", "playlists" or "favorites"
     * @param setFunction a set function that updates the array
     */
    const fetchSongs = async <T,>(route: "songs" | "playlists" | "favorites", setFunction: React.Dispatch<React.SetStateAction<T[]>>) => {
        const urlWithRoute = `${URL}/${route}`;
        try {

            //gets the data from the server
            const response = await fetch(urlWithRoute);
            const data = await response.json();

            setFunction(() => data);

        } catch (error) {

            console.log(error);

        }
    }

    useEffect(() => {
        fetchSongs<Song>("songs", setAllSongs);
        fetchSongs<string>("favorites", setFavoriteSongs);
    }, []);

    return (
        <div className={classes.page}>
          <Header />
          <div className={classes.mainArea}>
            <SideBar setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            <SongList songs={allSongs} favoriteSongs={favoriteSongs} />
          </div>
          <Player />
        </div>
    )

}


export default App

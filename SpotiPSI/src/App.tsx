import { useState, useEffect } from "react";
import Header from "./components/header/header";
import Player from "./components/player/player";
import "./App.css";
import SideBar from "./components/sidebar/Sidebar";
import SongList from "./components/songs/songList"
import useStyles from "./AppStyles";
import FavoritesPage from "./components/favoritesPage/FavoritesPage";
import AllSongs from "./components/allSongs/AllSongs";




const URL: string = 'http://127.0.0.1:5001/api'


interface Song {
    id: string,
    name: string,
    artist: string,
    album: string
}

interface Playlist {
    id: string,
    name: string,
    songIds: string[]
}


const App: React.FC = () => {
    const {classes} = useStyles();

    const [allSongs, setAllSongs] = useState<Song[]>([]);
    const [favoriteSongs, setFavoriteSongs] = useState<string[]>([])
    const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([])

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

    /**
     * On the first render, get all the data from the server
     */
    useEffect(() => {
        fetchSongs<Song>("songs", setAllSongs);
        fetchSongs<string>("favorites",setFavoriteSongs);
        fetchSongs<Playlist>("playlists", setAllPlaylists);
        console.log("hello fetched")
    },[])


    return (
        <div className={classes.page}>
          <Header />
          <div className={classes.mainArea}>
            <SideBar setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            {currentPage === "songs"? (
                <AllSongs songsList={allSongs} favoriteSongsId={favoriteSongs} setFavoriteSongs={setFavoriteSongs}/>
            ):currentPage === "favorites"? (
                 
                <FavoritesPage songsList={allSongs} favoriteSongsId={favoriteSongs}  setFavoriteSongs={setFavoriteSongs}/>
                
            ): (
                <div>playlists</div> //change  to the playlists page
            )
        }   
          </div>
          <Player />
        </div>
    )

}


export default App

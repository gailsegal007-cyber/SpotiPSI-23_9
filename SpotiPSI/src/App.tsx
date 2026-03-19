import { useState, useEffect, useRef } from "react";
import Header from "./components/header/header";
import Player from "./components/player/player";
import "./App.css";
import SideBar from "./components/sidebar/Sidebar";
import PlaylistsPage from "./components/playlistsPage/playlistsPage";
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
    id: string;
    name: string;
    songsIds: string[];
}

type Page = "songs" | "playlists" | "favorites" | "playlistSongs";

const App: React.FC = () => {
    const {classes} = useStyles();

    const [allSongs, setAllSongs] = useState<Song[]>([]);
    const [favoriteSongs, setFavoriteSongs] = useState<string[]>([]);
    const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);

    const [currentPage, setCurrentPage] = useState<Page>("songs");
    //const [currentPage, setCurrentPage] = useState<"songs" | "playlists" | "favorites" | "playlistSongs">("songs");
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null); //a ref which refrences the audio element

    const playSongFunction = useRef<((song: Song) => void) |null>(null); //a ref which gets the function that plays a song

    const songQueue = useRef<Song[]>([]); // a ref holding the current song queue


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
    },[])

    const goToPlaylist = (id: string) => {
        setSelectedPlaylistId(id);
        setCurrentPage("playlistSongs");
    };
    
    const selectedPlaylist = allPlaylists.find(p => p.id === selectedPlaylistId);
    const playlistSongs = selectedPlaylist
        ? allSongs.filter(s => selectedPlaylist.songsIds.includes(s.id))
        : [];

    return (
        <div className={classes.page}>
          <Header />
          <div className={classes.mainArea}>
            <SideBar setCurrentPage={setCurrentPage as React.Dispatch<React.SetStateAction<"songs" | "playlists" | "favorites">>} currentPage={currentPage as "songs" | "playlists" | "favorites"} />
            {currentPage === "songs"? ( 
                <AllSongs songsList={allSongs} favoriteSongsId={favoriteSongs} setFavoriteSongs={setFavoriteSongs} playSongFunction={playSongFunction} songQueue={songQueue}/>
            ):currentPage === "favorites"? (
                 
                <FavoritesPage songsList={allSongs} favoriteSongsId={favoriteSongs}  setFavoriteSongs={setFavoriteSongs} playSongFunction={playSongFunction} songQueue={songQueue}/>
                
            ): (
                 <PlaylistsPage songsList={allSongs} playlist={allPlaylists} favoriteSongs={favoriteSongs} setFavoriteSongs={setFavoriteSongs} setAllPlaylists={setAllPlaylists} goToPlaylist={goToPlaylist}/>
            )
        }   
          </div>
          <Player audioRef={audioRef} playSongFunction={playSongFunction} songQueue={songQueue}/>
            <audio controls= {false} src="" autoPlay = {true} ref={audioRef} ></audio>
        </div>
    )

}


export default App

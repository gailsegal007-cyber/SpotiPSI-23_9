import { useState } from "react";
import Header from "./components/header";
import Player from "./components/player";

const URL: string = 'http://127.0.0.1:5001/api/'


interface Song {
    id: string,
    name: string,
    artist: string,
    album: string
}


const App: React.FC = () => {

    const [allSongs, setAllSongs] = useState<Song[]>([])

    /**
     * 
     * @param route the route to the array we want to get. Either "songs", "playlists" or "favorites"
     * @param setFunction a set function that updates the array
     */
    const fetchSongs = async <T,>(route: "songs" | "playlists" | "favorites", setFunction: React.Dispatch<React.SetStateAction<T[]>>) => {

        const urlWithRoute = `${URL}/${route}`
        try {

            //gets the data from the server
            const response = await fetch(urlWithRoute);
            const data = await response.json();

            setFunction(() => data);

        } catch (error) {

            console.log(error);

        }
    }


    return (
        <div>
          <Header />
          <Player />
        </div>
    )





}


export default App

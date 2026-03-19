import { useState, useEffect } from "react"


interface Song {
    id: string,
    name: string,
    artist: string,
    album: string
}

const useAudioPlayer= ( audioRef : React.RefObject<HTMLAudioElement | null>, songQueue:React.RefObject<Song[]>) => {

    const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const play = (song: Song) => {
        if (audioRef.current !== null){
        const newUrl =  `src/assets/songs/${song.id}.mp3`;
        audioRef.current.src= newUrl;
        setCurrentSong(() => song);
        setIsPlaying(true);
        }
    }

    const togglePlayPause = () => {
        if (isPlaying === false && audioRef.current !== null){
            audioRef.current.play();
            setIsPlaying(true);
        }
        else if (audioRef.current !== null){
            audioRef.current.pause();
            setIsPlaying(false);
        }
        }
    
    const nextSong = () => {
        if (currentSong !== undefined){
        const songIndex = songQueue.current.indexOf(currentSong);
        if (songIndex === songQueue.current.length -1){ //is the last song in the queue
            play(songQueue.current[0]) //goes to the first song
        }
        else{
            play(songQueue.current[songIndex + 1]) //plays the next song
        }
        }
    }

    const previousSong = () => {
        if (currentSong !== undefined){
        const songIndex = songQueue.current.indexOf(currentSong);
        if (songIndex === 0){ //is the first song in the queue
            play(songQueue.current[songQueue.current.length -1]); //goes to the last song
        }
        else{
            play(songQueue.current[songIndex - 1]); //plays the next song
        }
        }
    }

    audioRef.current?.addEventListener("ended", (event) => {
        nextSong(); //moves to the next song
    })





    return {currentSong, isPlaying, songQueue, play, togglePlayPause, nextSong, previousSong}
}

export default useAudioPlayer;
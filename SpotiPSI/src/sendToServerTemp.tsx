import { useEffect } from "react";

const BASE_URL: string = 'http://127.0.0.1:5001/api/favorites'

interface Message {
    "songId": string
}

const SendToServer = async (id: string, route: "add" | "remove", setFavoriteSongs: React.Dispatch<React.SetStateAction<string[]>>) => {

    const dataToSend: Message = { "songId": id }

    const urlWithRoute = `${BASE_URL}/${route}`

    //gets the data from the server
    try {
        const response = await fetch(urlWithRoute, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend)
        });
        const data = await response.json();

    } catch (error) {

        console.log(error);

    }


}
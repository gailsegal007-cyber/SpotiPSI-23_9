import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    player: {
        textAlign: "center",
        color: "white",
        backgroundColor: "var(--song_hover_color)",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "10%",
        padding: "1%",
        display: "flex",
        flexDirection: "column",
        gap:"3%"
    },
    buttonRow : {
        display: "flex",
        gap: "2%",
        justifyContent: "center"
    },
    text: {
        margin: 0
    }
}));

export default useStyles;
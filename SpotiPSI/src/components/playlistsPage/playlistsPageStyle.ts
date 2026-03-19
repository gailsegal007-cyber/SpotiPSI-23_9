import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    page:{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
    },

    topRow: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        marginBottom: "5vh",
    },

    leftSide: {
        display: "flex",
        justifyContent: "flex-start",
        flex: 1, 
    },

    rightSide: {
        display: "flex",
        justifyContent: "flex-end",
        padding: "1%", 
    },

    creatPlaylistButton: {
        padding: "2%",
        width:"10vw",
        height:"6vh",
        borderRadius: "6vh",
        border: "1px solid var(--color_text)",
        color: "var(--color_text)",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "var(--hover_color)",
        },
    },

    title: {
        color: "var(--text_color)",
        fontSize: "24px",
        fontWeight: "bold",
    },
        playlistButton: {
        width: "85vw",
        height:"5vh",
        textAlign: "left",
        border: "1px solid var(--text_color)",
        backgroundColor: "var(--background_color)",
        color: "var(--text_color)",
        cursor: "pointer",
        transition: "0.2s all",
        "&:hover": {
            backgroundColor: "var(--hover_color)",
        },
    },
}));

export default useStyles;


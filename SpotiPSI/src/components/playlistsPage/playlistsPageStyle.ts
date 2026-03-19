import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    page:{
        
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
    flex: 1, // takes left half
},

rightSide: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1, // takes right half
},

creatPlaylistButton: {
    padding: "4% 12%",
    borderRadius: "6vh",
    border: "1px solid var(--color_text)",
    color: "var(--color_text)",
    cursor: "pointer",
    background: "var(--background_color)", // optional, match playlist buttons
    "&:hover": {
        backgroundColor: "var(--hover_color)",
    },
},

title: {
    color: "var(--text_color)",
    fontSize: "24px",
    fontWeight: "bold",
},
    playlistButtons:{

    },
    dialogStyle:{
        background:"var(--hover_color)",
    },
}));

export default useStyles;


/**
 * pageContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "16px",
        boxSizing: "border-box",
        color:"var(--text_color)"
    },

    topRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
    },

    title: {
        fontSize: "24px",
        fontWeight: "bold",
    },

    playlistButton: {
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid var(--text_color)",
        backgroundColor: "var(--background_color)",
        color: "var(--text_color)",
        cursor: "pointer",
        transition: "0.2s all",
        "&:hover": {
            backgroundColor: "var(--hover_color)",
        },
    },

    active: {
        backgroundColor: "var(--primary_color)",
        color: "#fff",
    },
    songsWrapper: {
        flex: 1,
        overflowY: "auto",
    },

    noPlaylistSelected: {
        fontStyle: "italic",
        color: "var(--text_color)",
    },

    dialogPaper: {
        backgroundColor: "#e0e0e0", // gray background
    },
 */
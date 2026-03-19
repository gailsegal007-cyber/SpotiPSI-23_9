import { makeStyles } from "tss-react/mui";


const useStyles = makeStyles()(() => ({
    song: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "var(--text_color)",
        padding: "8px 0",
        width: "100%", 
        boxSizing: "border-box",
        direction: "ltr",
        borderBottom: "1px solid var(--border_color)" 
    },

    leftSide: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        justifyContent: "flex-start",
        overflowX: "auto"
    },

    rightSide: {
        display: "flex",
        alignItems: "center",
        gap: "6px"
    },

    button_play: {
        backgroundColor: "transparent",
        color: "var(--color_text)",
        minWidth: 0,
        marginLeft: 0
    },

    button_favorite: {
        backgroundColor: "transparent",
        color: "var(--text_color)",
        minWidth: 0
    },

    scrollBar:{
        display: "flex",
        flexDirection: "column",
        height: "100vh",       
        width: "100%",         
        overflowY: "auto",     
        padding: "16px",       
        boxSizing: "border-box",
        backgroundColor: "var(--bg_color)"
      }
}));

export default useStyles;
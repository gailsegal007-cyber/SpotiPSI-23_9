import { makeStyles } from "tss-react/mui";


const useStyles = makeStyles()(() => ({
    song: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "var(--text_color)",
        paddingLeft:0,
        direction: "ltr"
    },

    leftSide: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        justifyContent: "flex-start"
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
    }
}));

export default useStyles;
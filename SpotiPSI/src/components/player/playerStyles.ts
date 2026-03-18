import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    player: {
        textAlign: "center",
        color: "white",
        backgroundColor: "var(--back_ground_color)",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        padding: "1%"
    }
}));

export default useStyles;
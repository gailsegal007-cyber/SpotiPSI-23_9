import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    header: {
        backgroundColor: "var(--back_ground_color)",
        color: "var(--color_text)",
        position: "fixed",
        top: 0, 
        left: 0,
        width: "98%",
        padding: "1%"
    }
}));

export default useStyles;
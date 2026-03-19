import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    title: {
        color: "var(--text_color)"
    },
    songsContainer: {
        width: '85%'
    }
}));

export default useStyles;
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    menu: {
        height:"100%",

    },
    regularItem: {
        gap:"10px",
        height:"50px"
    },

    clickedItem: {
        backgroundColor: "purple"
    }
}));

export default useStyles;
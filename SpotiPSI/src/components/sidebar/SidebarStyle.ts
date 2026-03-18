import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    menu: {
        height:"100%",
        width:"13%",
        borderLeft: "solid 1px gray"

    },
    regularItem: {
        gap:"10px",
        height:"50px",
        color:"white",
        '&:hover': {
        backgroundColor: "var(--hover_coler)",
    }
    },
    

    clickedItem: {
        gap:"10px",
        height:"50px",
        backgroundColor:"var(--selected_color)",
        color: "var(--text_color)",
        '&:hover': {
        backgroundColor: "var(--selected_color)",
    }
    },

    icon:{
        color:"var(--text_color)"
    }
}));

export default useStyles;
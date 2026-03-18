import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    page: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    mainArea : {
        display: "flex",
        height: '90%',
        width: "100%",
        gap: "2%"
    },

    sidebar: {
        width: "250px"
    },

    content: {
        flex:1,
        overflowY: "auto"
    }
}));

export default useStyles;
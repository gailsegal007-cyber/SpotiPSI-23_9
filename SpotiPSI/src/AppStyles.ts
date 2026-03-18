import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    page: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    mainArea : {
        height: '90%'
    }

}));

export default useStyles;
import useStyles from "./playerStyles";

const Player: React.FC =() =>{
    const {classes} = useStyles()
    return(
        <div className={classes.player}>
        מנגן שירים
        </div>
    )
}

export default Player;
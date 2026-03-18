import useStyles from "./headerStyles";

const Header: React.FC = () =>{
    const {classes} = useStyles()
    return(
        <div className={classes.header}>
            SpotiPSI ♪
        </div>
    )

};
export default Header;
import MenuList  from "@mui/material/MenuList";
import MenuItem  from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FavoriteIcon from '@mui/icons-material/Favorite';

import useStyles from "./SidebarStyle";
import React from "react";

interface Prop {
    setCurrentPage: React.Dispatch<React.SetStateAction<"songs" | "playlists" | "favorites">>;
    currentPage : "songs" | "playlists" | "favorites";
}

/***
 * A component for the sidebar
 */
const SideBar : React.FC<Prop> = (prop:Prop) => {

    const {classes} = useStyles();

    const allSongsText = "כל השירים";
    const playlistText = "פלייליסטים";
    const favoritesText = "מועדפים";

    /***
     * Sets the current page to be the one that was clicked
     */
    const menuItemClicked = (pageName:"songs" | "playlists" | "favorites" ) => {
       prop.setCurrentPage(pageName)
    }

    return (
        <div className={classes.menu}>
            <MenuList >
                <MenuItem className={prop.currentPage === "songs" ?classes.clickedItem :classes.regularItem} onClick={() => menuItemClicked("songs")}>
                    <ListItemIcon className={classes.icon}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>{allSongsText}</ListItemText>
                </MenuItem>
                <MenuItem className={prop.currentPage === "playlists" ?classes.clickedItem :classes.regularItem} onClick={() => menuItemClicked("playlists")} >
                    <ListItemIcon className={classes.icon}>
                        <LibraryMusicIcon />
                    </ListItemIcon>
                    <ListItemText>{playlistText}</ListItemText>
                </MenuItem>
                <MenuItem className={prop.currentPage === "favorites" ?classes.clickedItem :classes.regularItem} onClick={() => menuItemClicked("favorites")}>
                    <ListItemIcon className={classes.icon}>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText>{favoritesText}</ListItemText>
                </MenuItem>
            </MenuList>
        </div>
    )



}

export default SideBar
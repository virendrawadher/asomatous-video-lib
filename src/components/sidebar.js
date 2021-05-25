import React from "react"
import { Link } from "react-router-dom"
import styles from "../css/styles.module.css"
import {FaThumbsUp} from "react-icons/fa"
import {ImHome3} from "react-icons/im"
import {RiPlayList2Fill, RiAccountCircleFill} from "react-icons/ri"
const SideBar = () => {
    return (
        <div className = {styles.sidebarcontainer}>
            <div className = {styles.sidebarwrapper}>
                <Link to = "/" className = {styles.sidebarlink}><ImHome3/>{" "}Home</Link>
                <Link to = "/likedvideos" className = {styles.sidebarlink}><FaThumbsUp/>{" "}Liked</Link>
                <Link to = "/playlist" className = {styles.sidebarlink}><RiPlayList2Fill/>{" "}Playlist</Link>
                <Link to = "/" className = {styles.sidebarlink}><RiAccountCircleFill/>{" "}Account</Link>
            </div>
            <div style = {{marginTop: "20rem"}}>
                <span style = {{fontSize: "18px", display: "block"}}>Made By</span>
                <span style = {{fontSize: '18px', fontWeight: "500", color: "#3B82F6"}}>Virendra Wadher</span>
            </div>
        </div>
    )
}

export default SideBar
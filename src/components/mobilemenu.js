import React from "react"
import { Link } from "react-router-dom"
import styles from "../css/styles.module.css"
import {FaThumbsUp} from "react-icons/fa"
import {ImHome3} from "react-icons/im"
import { FaAlignRight, FaGithubAlt, FaTwitter } from 'react-icons/fa'
import { ImLinkedin2 } from "react-icons/im"
import {RiPlayList2Fill, RiAccountCircleFill} from "react-icons/ri"
import { useVideoListing } from "../context/videocontextprovider"
const MobileMenu = () => {
    
    const { setMobileMenu } = useVideoListing()
    return (
        <div className = {styles.mobilemenucontainer}>
            <div className = {styles.mobilemenuwrapper}>
                <Link onClick = {() => setMobileMenu(false)} to = "/" className = {styles.mobilemenulink}><ImHome3/>{" "}Home</Link>
                <Link onClick = {() => setMobileMenu(false)} to = "/likedvideos" className = {styles.mobilemenulink}><FaThumbsUp/>{" "}Liked</Link>
                <Link onClick = {() => setMobileMenu(false)} to = "/playlist" className = {styles.mobilemenulink}><RiPlayList2Fill/>{" "}Playlist</Link>
                <Link onClick = {() => setMobileMenu(false)} to = "/" className = {styles.mobilemenulink}><RiAccountCircleFill/>{" "}Account</Link>
            </div>
            <div className = {styles.socialmediacontainer}>
                <a href = "https://github.com/virendrawadher" target = "_blank" rel = "noreferrer" className = {styles.socialgithubmobile}><FaGithubAlt/></a>
                <a href = "https://twitter.com/virendra_wadher" target = "_blank" rel = "noreferrer" className = {styles.socialtwittermobile}><FaTwitter/></a>
                <a href = "https://www.linkedin.com/in/virendra-wadher-042741155/" target = "_blank" rel = "noreferrer" className = {styles.sociallinkedinmobile}><ImLinkedin2/></a>
            </div>
            <div>
                <span style = {{fontSize: "18px", display: "block"}}>Made By</span>
                <span style = {{fontSize: '18px', fontWeight: "500", color: "#3B82F6"}}>Virendra Wadher</span>
            </div>
        </div>
    )
}

export default MobileMenu
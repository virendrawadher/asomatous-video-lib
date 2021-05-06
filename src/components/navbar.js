import React from 'react';
import styles from '../css/styles.module.css'
import { FaAlignRight, FaGithubAlt, FaTwitter } from 'react-icons/fa'
import { ImLinkedin2 } from "react-icons/im"
// import {ImHome3} from "react-icons/im"
// import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <div>
            <header className = {styles.navheader}>
                <div className = {styles.upperline}></div>
                <nav className = {styles.navbar}>
                    <FaAlignRight size = {30} className = {styles.navmenu}/>
                    <a href = "https://github.com/virendrawadher" target = "_blank" rel = "noreferrer" className = {styles.socialgithub}><FaGithubAlt/></a>
                    <a href = "https://twitter.com/virendra_wadher" target = "_blank" rel = "noreferrer" className = {styles.socialtwitter}><FaTwitter/></a>
                    <a href = "https://www.linkedin.com/in/virendra-wadher-042741155/" target = "_blank" rel = "noreferrer" className = {styles.sociallinkedin}><ImLinkedin2/></a>
                    <div className = {styles.name}>ASOMATOUS</div>
                    {/* <Link to = "/logout">LOG OUT</Link>
                    <Link to = "/likedvideos"><button>Liked</button></Link>
                    <Link to = "/playlist"><button>PlayList</button></Link> */}
                </nav>
            </header>
        </div>
    )
}
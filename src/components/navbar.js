
import styles from '../css/styles.module.css'
import { FaAlignRight, FaGithubAlt, FaTwitter } from 'react-icons/fa'
import { ImLinkedin2 } from "react-icons/im"
import  {CgClose} from "react-icons/cg"
import { useVideoListing } from '../context/videocontextprovider';
import { Link } from "react-router-dom"

export const NavBar = () => {

    const {mobileMenu, setMobileMenu} = useVideoListing()
    return (
        <div>
            <header className = {styles.navheader}>
                <div className = {styles.upperline}></div>
                <nav className = {styles.navbar}>
                    { mobileMenu ? <CgClose onClick = {() => setMobileMenu(mobileMenu => false)}size = {30} className = {styles.navmenu}/> : <FaAlignRight onClick = {() => setMobileMenu(mobileMenu => true)}size = {30} className = {styles.navmenu}/> }
                    <a href = "https://github.com/virendrawadher" target = "_blank" rel = "noreferrer" className = {styles.socialgithub}><FaGithubAlt/></a>
                    <a href = "https://twitter.com/virendra_wadher" target = "_blank" rel = "noreferrer" className = {styles.socialtwitter}><FaTwitter/></a>
                    <a href = "https://www.linkedin.com/in/virendra-wadher-042741155/" target = "_blank" rel = "noreferrer" className = {styles.sociallinkedin}><ImLinkedin2/></a>
                    <Link to = "/" className = {styles.name}>ASOMATOUS</Link>
                </nav>
            </header>
        </div>
    )
}
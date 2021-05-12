import { useVideoListing } from "../context/videocontextprovider";
import styles from "../css/styles.module.css"
import  {CgClose} from "react-icons/cg"
import { Link } from "react-router-dom"

export const LikedVideos = () => {

    const { state, dispatch } = useVideoListing();

    return (
        <div className = {styles.videocontent}>
            <div className = {styles.likeheading}>Liked Videos</div>
            {state.likedVideos.length > 0 ?
                state.likedVideos.map((like) => {
                    return (
                        <div  className = {styles.videolistingcontainer}>
                            <div style = {{position:"relative", width: "75%"}}>
                                <span  className = {styles.likeicon} onClick = {() => dispatch({type: "LIKED", payload: like})}><CgClose/></span>
                            </div>
                            <Link to = {`/play/${like.id}`} className = {styles.videolink}>
                                <div className = {styles.videolisting}>
                                    <img src = {like.snippet.thumbnails.medium.url} alt = {like.snippet.title} className = {styles.videoimage}/>
                                    <div className = {styles.videocontentcontainer}>
                                        <h4 className = {styles.videotitle}>{like.snippet.title}</h4>
                                        <div className = {styles.videodate}>{like.snippet.publishedAt.slice(0,10)}</div>
                                        <div className = {styles.videodesp}>{like.snippet.localized.description.slice(0, 150)}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                }) : <div className = {styles.noliked}>No Liked Videos :/</div>
            }
        </div>
    )
} 
import { useVideoListing } from "../context/videocontextprovider";
import styles from "../css/styles.module.css"
import { MdDelete } from "react-icons/md"
import { Link } from "react-router-dom"

export const LikedVideos = () => {

    const { state, dispatch } = useVideoListing();

    return (
        <div className = {styles.videocontent}>
            <div className = {styles.likeheading}>Liked Videos</div>
            {state.likedVideos.length > 0 ?
                state.likedVideos.map((like) => {
                    return (
                        <div className = {styles.videolisting}>
                        <Link to = {`/play/${like.id}`}>
                        <div>
                            <img src = {like.snippet.thumbnails.medium.url} alt = {like.snippet.title} className = {styles.videoimage}/>
                            <h4 className = {styles.videotitle}>{like.snippet.title}</h4>
                            <div className = {styles.videodesp}>{like.snippet.localized.description.slice(0, 150)}</div>
                        </div>
                        </Link>
                        <span  className = {styles.likeicon} onClick = {() => dispatch({type: "LIKED", payload: like})}><MdDelete/></span>
                        </div>
                    )
                }) : <div className = {styles.noliked}>No Liked Videos :/</div>
            }
        </div>
    )
} 
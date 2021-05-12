
import { NavLink } from "react-router-dom"
import styles from "../css/styles.module.css"
import { useVideoListing } from "../context/videocontextprovider"



const VideoListing = () => {

    const {state, dispatch} = useVideoListing()

    return (
        <div className = {styles.videocontent}>
            {
                state.videoListingData.map((videoList) => {
                    return(
                        <div onClick = {() => dispatch({type: "VIDEOPLAY", videoList})} className = {styles.videolistingcontainer}>
                            <NavLink to = {`/play/${videoList.id}`} className = {styles.videolink}>
                                <div className = {styles.videolisting}>
                                    <img src = {videoList.snippet.thumbnails.medium.url} alt = {videoList.snippet.title} className = {styles.videoimage}/>
                                    <div className = {styles.videocontentcontainer}>
                                        <h4 className = {styles.videotitle}>{videoList.snippet.title}</h4>
                                        <div className = {styles.videodate}>{videoList.snippet.publishedAt.slice(0,10)}</div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default VideoListing
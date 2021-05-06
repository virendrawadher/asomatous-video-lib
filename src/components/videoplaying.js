import { useVideoListing } from "../context/videocontextprovider"
import {FaThumbsUp} from 'react-icons/fa'
import {RiPlayList2Fill} from "react-icons/ri"
import { SavePLayList } from "./saveplaylist"
import styles from "../css/styles.module.css"
import {useParams} from "react-router-dom"

export const VideoPlay = () => {

    const {state, dispatch} = useVideoListing()
    const {videoId} = useParams()
    console.log(videoId)

    const videoplay = state.videoListingData.find((video) => video.id === videoId)
    let videoplaying = {...videoplay, liked: false}
    console.log({videoplay})
    console.log({videoplaying})

    const likedchecker = state.likedVideos.findIndex((likevideo) => likevideo.id === videoplaying.id)

    console.log({likedchecker})

    const remainingvideo = state.videoListingData.filter((video) => video.id !== videoId)

    console.log({remainingvideo})
    if(likedchecker === -1){
        videoplaying = {...videoplaying, liked: true}
    }

    console.log("Playinng:- ", state.videoPlay)
    console.log("Liked Videos:- ", state.likedVideos)
    return(
        <div>
            <div className = {styles.framecontainer}>
                <div className = {styles.videoframewrapper}>
                    <iframe width="560" height="315" src= {`https://www.youtube.com/embed/${videoplaying.id}?autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen className = {styles.videoiframe}></iframe>
                </div>
                <div className = {styles.videoplayingcontainer}>
                    <div className = {styles.videoplayingtitlecontainer}>
                        <span className = {styles.videoplayingtitle}>{videoplaying.snippet.title}</span>
                    </div>
                    <span className = {styles.videoplayviews}>{videoplaying.statistics.viewCount}{" "}Views</span>{" "}
                    <div onClick = {() => dispatch({type: "LIKED", payload: videoplaying})} className = {videoplaying.liked ? styles.buttonwrappers : styles.videoplayingliked}>
                        <i className = {styles.videoplayingicon}><FaThumbsUp /></i>
                        <span className = {styles.videoplayinglike}>{" "}{videoplaying.liked ? "Like" : "Liked"}</span>
                    </div>{" "}
                    <div onClick = {() => dispatch({type: "SAVE"})} className = {styles.buttonwrapper}>
                        <i className = {styles.videoplayingicon}><RiPlayList2Fill/></i>
                        <span className = {styles.videoplayingsave}>{" "}Save</span>
                    </div>
                </div>    
            </div>
            <SavePLayList/>
        </div>
    )
}
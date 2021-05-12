// import React from "react"
// import {useEffect, useReducer} from "react"
import { NavLink } from "react-router-dom"
import styles from "../css/styles.module.css"
import { useVideoListing } from "../context/videocontextprovider"



const VideoListing = () => {

    const {state, dispatch} = useVideoListing()

    // const videoListHandler = (videoList) => {
    //     const videoFindData = videoListingData.find(videoData => videoData.id === videoList.id)
    //     console.log("Find Data:- ", videoFindData)
    // }
    // console.log("Video", videoListingData)
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
                                        {/* <div className = {styles.videodesp}>{videoList.snippet.localized.description.slice(0, 150)}</div> */}
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )
                })
            }
            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/15Z1mtiJnyk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
        </div>
    )
}

export default VideoListing
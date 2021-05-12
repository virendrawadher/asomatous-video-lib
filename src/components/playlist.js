import { useVideoListing } from "../context/videocontextprovider"
import styles from "../css/styles.module.css"
import { Link } from "react-router-dom"

export const PlayList = () => {
    const {state} = useVideoListing()
    console.log("state.playlist", state.playLists)

    return (
        <div className = {styles.videocontent}>
            {
                state.playLists.map((playLis) => {
                    return (
                        <div className = {styles.playlistcontainer}>
                        <div className = {styles.playlistname}>{playLis.name}</div>
                        <div className = {styles.playlistwrapper}>
                        { playLis.videos.length > 0 ?
                            playLis.videos.map((vid) => {
                            return (
                                <Link to = {`/play/${vid.id}`} className = {styles.videolink}>
                                    <div className = {styles.playlistlisting}>
                                        <img src = {vid.snippet.thumbnails.medium.url} alt = {vid.snippet.title} className = {styles.playlistimage}/>
                                        <h4 className = {styles.playlisttitle} style = {{textAlign: "left", marginLeft: "0.5rem"}}>{vid.snippet.title}</h4>
                                        {/* <div className = {styles.playlistdesp}>{vid.snippet.localized.description.slice(0, 150)}</div> */}
                                    </div>
                                </Link>

                            )}) : <div style = {{marginTop: "1rem"}}>No videos added to playlist</div>
                        }
                        </div>
                        </div>
                )})
            }
        </div>
    )
}
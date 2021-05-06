import {useReducer, createContext, useContext} from 'react'
import uuid from 'react-uuid';

export const VideoListingContext = createContext();

export const VideoListingProvider = ({children}) => {

    const initialPlayList = {
        id: uuid(),
        name: "Demo Playlist",
        videos: []
    }

    const [state, dispatch] = useReducer(VideoListing, {videoListingData: [], videoPlay: {}, likedVideos: [], playListName: "", playLists: [initialPlayList],playListModal: false})
    return (
        <VideoListingContext.Provider value = {{state, dispatch}}>
            {children}
        </VideoListingContext.Provider>
    )
}

export const useVideoListing = () => {
    return useContext(VideoListingContext)

}

const VideoListing = (state, actions) => {
    switch(actions.type){
        case "LISTING":
            console.log({...actions.items})
            // break
            return {...state, videoListingData: state.videoListingData.concat(actions.items)}
        case "VIDEOPLAY":
            const findVideo = state.videoListingData.find(videoD => videoD.id === actions.videoList.id)
            console.log({findVideo})
            return {...state, videoPlay: {...findVideo, liked: false}}
        case "LIKED":
            console.log("Liked:- ", actions.payload.liked)
            let checkLikedVideos = state.likedVideos.findIndex((likevideo) => likevideo.id === actions.payload.id)

            if (checkLikedVideos === -1) {
                let findLikeVideos = state.videoListingData.find((findVideo) => findVideo.id === actions.payload.id)

                return {...state, videoPlay: {...actions.payload, liked:true}, likedVideos : state.likedVideos.concat(findLikeVideos)}
            }
            return {...state, videoPlay: {...actions.payload, liked: false}, likedVideos: state.likedVideos.filter((remove) => remove.id !== actions.payload.id)}
        case "SAVE":
            return {...state, playListModal: true}

        case "PLAYLISTNAME":
            return {...state, playListName: actions.payload}
        case "PLAYLIST":
            
            return {...state, playLists: state.playLists.concat(actions.payload), playListName: ""}
        case "ADDPLAYLIST":
            console.log("data:- ", actions.payload.data)
            let checkPlayList = state.playLists.find(play => play.id === actions.payload.data.id)
            console.log({checkPlayList})
            let check = actions.payload.data.videos.findIndex(vid => vid.id === state.videoPlay.id)
            console.log({check})
            let playLis = state.playLists.map((pl) => {
                return pl.id === checkPlayList.id ? (check === -1 ? {...pl, videos: pl.videos.concat({...state.videoPlay, playlistId: checkPlayList.id})}: pl): pl})
            
            console.log({playLis})

            return {...state, playLists: playLis}
            
        case "CLOSE":
            return {...state, playListModal: false}
        default:
            return {actions}
    }

}
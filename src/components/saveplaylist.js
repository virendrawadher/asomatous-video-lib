// import {useState} from "react";
import uuid from "react-uuid";
import { useVideoListing } from "../context/videocontextprovider";
import styles from "../css/styles.module.css"

export const SavePLayList = () => {

    const {state, dispatch} = useVideoListing();

    const submitHandler = (e) => {
        e.preventDefault()
        const playL = {
            id: uuid(),
            name: state.playListName, 
            videos: []
        }
        dispatch({type: "PLAYLIST", payload: playL})
    }



    return (
        <div onClick = {() => dispatch({type: "CLOSE"})} className = {styles.modal} style = {{display: state.playListModal ? "flex" : "none"}}>
            <div style = {{display: state.playListModal ? "flex" : "none"}} className = {styles.saveplaylistmodal} onClick = {(e) => e.stopPropagation()}>
                <div className = {styles.saveplaylistcontainer}>
                <div className = {styles.saveplaylistwrapper}>
                    <form onSubmit = {submitHandler}>
                        <input type = "text" value = {state.playListName} placeholder = "Enter the playlist name" onChange = {(e) => dispatch({type: "PLAYLISTNAME", payload: e.target.value})} className = {styles.saveplaylistinput}/>
                    </form>
                    {
                        state.playLists.map((playL) => {
                            return (
                                <p key = {playL.id}>
                                    <table className = {styles.saveplaylisttable}>
                                        <tr>   
                                        <td><input type = "checkbox" onChange = {(e) => dispatch({type: "ADDPLAYLIST", payload:{
                                        name: "ADD_TO_PLAYLIST",
                                        data: playL}})} className = {styles.saveplaylistcheckbox}/></td>
                                        <td className = {styles.saveplaylistname}>{playL.name}</td>
                                        </tr>
                                    </table>
                                    
                                </p>
                            )
                        })
                    }
                    <button onClick = {() => dispatch({type: "CLOSE"})} className = {styles.closeplaylist}>Close</button>
                </div> 
                </div>
            </div>
        </div>
    )
}
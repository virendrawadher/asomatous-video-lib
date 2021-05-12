// import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/navbar';
import VideoListing from './components/videolisting';
import {VideoPlay} from "./components/videoplaying"
import axios from "axios"
import {useEffect} from "react"
import { useVideoListing } from './context/videocontextprovider';
import {Routes, Route} from "react-router-dom"
import { LikedVideos } from './components/likedvideos';
import {PlayList} from "./components/playlist"
import SideBar from './components/sidebar';
import MobileMenu from './components/mobilemenu';

const API_KEY = "AIzaSyD4ANODrI3sGUr62uvBz1z4I-Xi6zewie0";

function App() {
  const {dispatch, mobileMenu} = useVideoListing()
  // const [dataY, setDataY] = useState([])
  useEffect(() => {
    (async function DataYoutube(id) {
      const {data: {  items }} = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=u7MN0r84Nkg,15Z1mtiJnyk,EyVyipGTa1g,WVJ5_30v-J4,fdHjqVEQvLw,iipwjxKtRqs,dNfyngfxByg,7fBdnwLWu-Y,LSmQ8zhjyjE,mz_ztTzYbDE,dRxLfBEXmYQ,PEvKgZSDtVQ,cL1fwQqz-k4,gVU2cnLEsDU,Xxrq2n3DTkQ,8MBsBcbK63A,IVsri5bQLeM,J4CooI0kC6w,nti93iK7odY,USyvMGClNdY,ERtGhEHbMpI,xwKQdAt2CPU,37W4lcNEfGQ,D8o6pfifCsE,IDY2P0vM4AE,HYmnMZgmWWk,DlJkis91s58,PgYO3VB6ubo,Z2HEV4CcdFM&key=${API_KEY}`
      );
      console.log({ items });
      dispatch({type: "LISTING", items})
    })();
  }, []);
  return (
    <div className="App">
      <NavBar/>
      <SideBar/>
      { mobileMenu && <MobileMenu/> }
      <Routes>
        <Route path = "/" element = {<VideoListing/>} />
        <Route path = "/play/:videoId" element = {<VideoPlay/>}/>
        <Route path = "/likedvideos" element = {<LikedVideos/>}/>
        <Route path = "/playlist" element = {<PlayList/>}/>
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import { NavBar } from './components/navbar';
import VideoListing from './components/videolisting';
import { VideoPlay } from './components/videoplaying';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useVideoListing } from './context/videocontextprovider';
import { Routes, Route } from 'react-router-dom';
import { LikedVideos } from './components/likedvideos';
import { PlayList } from './components/playlist';
import SideBar from './components/sidebar';
import MobileMenu from './components/mobilemenu';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const { dispatch, mobileMenu } = useVideoListing();

	const [loader, setLoader] = useState(false);
	useEffect(() => {
		(async function DataYoutube(id) {
			try {
				setLoader(true);
				const { data } = await axios.get(
					'https://cryptic-anchorage-74362.herokuapp.com/videolisting',
				);

				if (data.success) {
					dispatch({ type: 'LISTING', payload: data.video });
				}
				// console.log({ items });
				setLoader(false);
			} catch (error) {
				setLoader(false);
				console.log(error);
			}
		})();
	}, []);
	return (
		<div className='App'>
			<NavBar />
			<SideBar />
			{mobileMenu && <MobileMenu />}
			<Routes>
				<Route
					path='/'
					element={<VideoListing loader={loader} setLoader={setLoader} />}
				/>
				<Route
					path='/play/:videoId'
					element={
						<VideoPlay toast={toast} loader={loader} setLoader={setLoader} />
					}
				/>
				<Route
					path='/likedvideos'
					element={
						<LikedVideos toast={toast} loader={loader} setLoader={setLoader} />
					}
				/>
				<Route
					path='/playlist'
					element={
						<PlayList toast={toast} loader={loader} setLoader={setLoader} />
					}
				/>
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;

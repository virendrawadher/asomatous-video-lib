import { useState, useReducer, createContext, useContext } from 'react';

export const VideoListingContext = createContext();

export const VideoListingProvider = ({ children, videoId }) => {
	const initialPlayList = {
		_id: '60ab4f8ccf9d57458135a856',
		name: 'Demo Playlist',
		videos: [],
	};

	const [mobileMenu, setMobileMenu] = useState(false);

	const [state, dispatch] = useReducer(VideoListing, {
		videoListingData: [],
		videoPlay: {},
		likedVideos: [],
		playListName: '',
		playLists: [initialPlayList],
		playListModal: false,
	});

	return (
		<VideoListingContext.Provider
			value={{ state, dispatch, mobileMenu, setMobileMenu }}>
			{children}
		</VideoListingContext.Provider>
	);
};

export const useVideoListing = () => {
	return useContext(VideoListingContext);
};

const VideoListing = (state, actions) => {
	switch (actions.type) {
		case 'LISTING':
			console.log({ ...actions.payload });
			// break
			return {
				...state,
				videoListingData: state.videoListingData.concat(actions.payload),
			};
		case 'VIDEOPLAY':
			console.log('inside videoplay case', actions.videoList);
			const findVideo = state.videoListingData.find(
				(videoD) => videoD.videoId === actions.videoList.videoId,
			);
			console.log({ findVideo });
			return { ...state, videoPlay: actions.videoList };
		case 'LIKED':
			console.log('Liked:- ', actions.payload);
			let checkLikedVideos = state.likedVideos.findIndex(
				(likevideo) => likevideo.videoId === actions.payload.videoId,
			);

			if (checkLikedVideos === -1) {
				return {
					...state,
					likedVideos: state.likedVideos.concat(actions.payload),
				};
			}
			return {
				...state,
				likedVideos: state.likedVideos.filter(
					(remove) => remove.videoId !== actions.payload.videoId,
				),
			};
		case 'SAVE':
			return { ...state, playListModal: true };

		case 'PLAYLISTNAME':
			return { ...state, playListName: actions.payload };
		case 'PLAYLIST':
			return {
				...state,
				playLists: state.playLists.concat(actions.payload),
				playListName: '',
			};

		default:
			return { ...state };
	}
};

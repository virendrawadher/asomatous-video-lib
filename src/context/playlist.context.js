import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export const PlayListContext = createContext();

export const PlayListProvider = ({ children }) => {
	const [playlist, setPlayList] = useState([]);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		(async function () {
			try {
				setLoader(true);
				const { data } = await axios.get(
					'https://cryptic-anchorage-74362.herokuapp.com/playlist',
				);

				console.log('data of saveplaylist', { data });
				if (data.success) {
					setPlayList(data.playlist);
				}
				setLoader(false);
			} catch (error) {
				setLoader(false);
				console.log(error);
			}
		})();
	}, []);

	return (
		<PlayListContext.Provider value={{ playlist, setPlayList, loader }}>
			{children}
		</PlayListContext.Provider>
	);
};

export const usePlayList = () => {
	return useContext(PlayListContext);
};

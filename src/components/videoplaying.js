import { useVideoListing } from '../context/videocontextprovider';
import { FaThumbsUp } from 'react-icons/fa';
import { RiPlayList2Fill } from 'react-icons/ri';
import { SavePLayList } from './saveplaylist';
import styles from '../css/styles.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

export const VideoPlay = (props) => {
	const { state, dispatch } = useVideoListing();

	const { loader, setLoader, toast } = props;

	const vidId = useParams();

	const [videoPlaying, setVideoPlaying] = useState(state.videoPlay || {});

	const [showPlaylistModal, setShowPlayListModal] = useState(false);

	useEffect(() => {
		(async function () {
			try {
				setLoader(true);
				const { data } = await axios.get(
					`https://cryptic-anchorage-74362.herokuapp.com/videolisting/${vidId.videoId}`,
				);

				console.log({ data });
				if (data.success) {
					// dispatch({type: "VIDEOPLAY", videoList: data.video})
					setVideoPlaying(data.video);
				}
				setLoader(false);
			} catch (error) {
				setLoader(false);
				console.log(error);
			}
		})();
	}, []);

	const likeVideoHandler = async (videoplaying) => {
		if (!videoPlaying.liked) {
			try {
				const response = await axios.post(
					`https://cryptic-anchorage-74362.herokuapp.com/videolisting/${videoplaying.videoId}`,
					{
						liked: true,
					},
				);

				console.log({ response });

				const { data } = await axios.post(
					'https://cryptic-anchorage-74362.herokuapp.com/likevideos',
					{
						videoId: videoplaying.videoId,
						title: videoplaying.title,
						description: videoplaying.description,
						thumbnailurl: videoplaying.thumbnailurl,
						publishedAt: videoplaying.publishedAt,
						liked: true,
						viewcount: videoplaying.viewcount,
					},
				);

				console.log({ data });
				if (data.success && response.data.success) {
					dispatch({ type: 'LIKED', payload: data.likedVideo });
					setVideoPlaying(data.likedVideo);
				}
				toast(`${videoplaying.title} added to liked video`, {
					type: 'success',
					position: 'bottom-right',
					hideProgressBar: true,
					autoClose: 5000,
				});
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const response = await axios.post(
					`https://cryptic-anchorage-74362.herokuapp.com/videolisting/${videoplaying.videoId}`,
					{
						liked: false,
					},
				);

				console.log({ response });

				const { data } = await axios.delete(
					`https://cryptic-anchorage-74362.herokuapp.com/likevideos/${videoplaying.videoId}`,
				);

				console.log(data);
				if (data.success && response.data.success) {
					setVideoPlaying({ ...videoplaying, liked: false });
				}
				toast(`${videoplaying.title} removed from liked video`, {
					type: 'warning',
					position: 'bottom-right',
					hideProgressBar: true,
					autoClose: 5000,
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div>
			<div className={styles.framecontainer}>
				{loader ? (
					<Loader color='#3B82F6' height={100} width={100} type='Puff' />
				) : (
					<div>
						<div className={styles.videoframewrapper}>
							<iframe
								width='560'
								height='315'
								src={`https://www.youtube.com/embed/${vidId.videoId}?autoplay=1`}
								title='YouTube video player'
								frameborder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowfullscreen
								className={styles.videoiframe}></iframe>
						</div>
						<div className={styles.videoplayingcontainer}>
							<div className={styles.videoplayingtitlecontainer}>
								<span className={styles.videoplayingtitle}>
									{videoPlaying.title}
								</span>
							</div>
							<div style={{ position: 'relative' }}>
								<span className={styles.videoplayviews}>
									{videoPlaying.viewcount} Views
								</span>{' '}
								<div
									onClick={() => likeVideoHandler(videoPlaying)}
									className={
										videoPlaying.liked
											? styles.buttonwrappers
											: styles.videoplayingliked
									}>
									<i className={styles.videoplayingicon}>
										<FaThumbsUp />
									</i>
									<span className={styles.videoplayinglike}>
										{' '}
										{videoPlaying.liked ? 'Liked' : 'Like'}
									</span>
								</div>{' '}
								<div
									onClick={() => setShowPlayListModal(true)}
									className={styles.buttonwrapper}>
									<i className={styles.videoplayingicon}>
										<RiPlayList2Fill />
									</i>
									<span className={styles.videoplayingsave}> Save</span>
								</div>
							</div>
						</div>
						{showPlaylistModal && (
							<SavePLayList
								videoplay={videoPlaying}
								toast={toast}
								showPlaylistModal={showPlaylistModal}
								setShowPlayListModal={setShowPlayListModal}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export const VideoId = () => {
	const video = useParams();

	return { video };
};
//

import { NavLink } from 'react-router-dom';
import styles from '../css/styles.module.css';
import { useVideoListing } from '../context/videocontextprovider';
import Loader from 'react-loader-spinner';

const VideoListing = (props) => {
	const { loader } = props;

	const { state, dispatch } = useVideoListing();

	console.log('videolisting', loader);
	return (
		<div className={styles.videocontent}>
			{loader ? (
				<Loader color='#3B82F6' height={100} width={100} type='Puff' />
			) : (
				state.videoListingData.map((videoList) => {
					return (
						<div
							onClick={() => dispatch({ type: 'VIDEOPLAY', videoList })}
							className={styles.videolistingcontainer}>
							<NavLink
								to={`/play/${videoList.videoId}`}
								className={styles.videolink}>
								<div className={styles.videolisting}>
									<img
										src={videoList.thumbnailurl}
										alt={videoList.title}
										className={styles.videoimage}
									/>
									<div className={styles.videocontentcontainer}>
										<h4 className={styles.videotitle}>{videoList.title}</h4>
										<div className={styles.videodate}>
											{videoList.publishedAt.slice(0, 10)}
										</div>
									</div>
								</div>
							</NavLink>
						</div>
					);
				})
			)}
		</div>
	);
};

export default VideoListing;

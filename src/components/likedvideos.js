import styles from '../css/styles.module.css';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

export const LikedVideos = (props) => {
	const [likedVideo, setLikedVideo] = useState([]);

	const { loader, setLoader, toast } = props;

	useEffect(() => {
		(async function () {
			try {
				setLoader(true);
				const { data } = await axios.get(
					'https://cryptic-anchorage-74362.herokuapp.com/likevideos',
				);

				const checkLikeVideoIndex = likedVideo.findIndex(
					(liked) => liked.videoId === data.likedvideo.videoId,
				);

				if (data.success && checkLikeVideoIndex === -1) {
					setLikedVideo((likedVideo) => likedVideo.concat(data.likedvideo));
				}
				setLoader(false);
			} catch (error) {
				setLoader(false);

				console.log(error);
			}
		})();
	}, []);

	const removeFromLikedVideo = async (like) => {
		if (like.liked) {
			try {
				const response = await axios.post(
					`https://cryptic-anchorage-74362.herokuapp.com/videolisting/${like.videoId}`,
					{
						liked: false,
					},
				);

				console.log({ response });

				const { data } = await axios.delete(
					`https://cryptic-anchorage-74362.herokuapp.com/likevideos/${like.videoId}`,
				);

				console.log(data);

				if (data.success && response.data.success) {
					setLikedVideo((likedVideo) =>
						likedVideo.filter((liked) => liked.videoId !== like.videoId),
					);
				}
			} catch (error) {
				console.log(error);
			}
			toast(`${like.title} removed from liked video`, {
				type: 'warning',
				position: 'bottom-right',
				hideProgressBar: true,
				autoClose: 5000,
			});
		}
	};

	return (
		<div className={styles.videocontent}>
			{loader ? (
				<Loader height={100} width={100} type='Puff' color='#3b82f6' />
			) : (
				<div>
					<div className={styles.likeheading}>Liked Videos</div>
					{likedVideo.length > 0 ? (
						likedVideo.map((like) => {
							return (
								<div className={styles.videolistingcontainer}>
									<div style={{ position: 'relative', width: '75%' }}>
										<span
											className={styles.likeicon}
											onClick={() => removeFromLikedVideo(like)}>
											<CgClose />
										</span>
									</div>
									<Link
										to={`/play/${like.videoId}`}
										className={styles.videolink}>
										<div className={styles.videolisting}>
											<img
												src={like.thumbnailurl}
												alt={like.title}
												className={styles.videoimage}
											/>
											<div className={styles.videocontentcontainer}>
												<h4 className={styles.videotitle}>{like.title}</h4>
												<div className={styles.videodate}>
													{like.publishedAt.slice(0, 10)}
												</div>
												<div className={styles.videodesp}>
													{like.description.slice(0, 150)}
												</div>
											</div>
										</div>
									</Link>
								</div>
							);
						})
					) : (
						<div className={styles.noliked}>No Liked Videos :/</div>
					)}
				</div>
			)}
		</div>
	);
};

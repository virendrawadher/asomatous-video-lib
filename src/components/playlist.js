import styles from '../css/styles.module.css';
import { Link } from 'react-router-dom';
import { usePlayList } from '../context/playlist.context';
import Loader from 'react-loader-spinner';

export const PlayList = () => {
	const { playlist, loader } = usePlayList();

	return (
		<div className={styles.videocontent}>
			{loader ? (
				<Loader color='#3B82F6' height={100} width={100} type='Puff' />
			) : (
				<div>
					{playlist.map((playLis) => {
						return (
							<div className={styles.playlistcontainer}>
								<div className={styles.playlistname}>{playLis.name}</div>
								<div className={styles.playlistwrapper}>
									{playLis.videos.length > 0 ? (
										playLis.videos.map((vid) => {
											return (
												<Link
													to={`/play/${vid.id}`}
													className={styles.videolink}>
													<div className={styles.playlistlisting}>
														<img
															src={vid.thumbnailurl}
															alt={vid.title}
															className={styles.playlistimage}
														/>
														<h4
															className={styles.playlisttitle}
															style={{
																textAlign: 'left',
																marginLeft: '0.5rem',
															}}>
															{vid.title}
														</h4>
													</div>
												</Link>
											);
										})
									) : (
										<div style={{ marginTop: '1rem' }}>
											No videos added to playlist
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

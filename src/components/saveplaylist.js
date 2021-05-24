import axios from 'axios';
import { usePlayList } from '../context/playlist.context';
import { useVideoListing } from '../context/videocontextprovider';
import styles from '../css/styles.module.css';

export const SavePLayList = (props) => {
	const { videoplay, toast, setShowPlayListModal, showPlaylistModal } = props;

	const { state, dispatch } = useVideoListing();

	const { playlist, setPlayList } = usePlayList();

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const checkPlayListNameIndex = playlist.findIndex(
				(play) => play.name === state.playListName,
			);

			console.log({ checkPlayListNameIndex });

			if (checkPlayListNameIndex === -1) {
				const { data } = await axios.post(
					'https://cryptic-anchorage-74362.herokuapp.com/playlist',
					{
						name: state.playListName,
						videos: [],
					},
				);

				console.log({ data });
				if (data.success) {
					setPlayList((playlist) => playlist.concat(data.playlist));
					dispatch({ type: 'PLAYLISTNAME', payload: '' });
				}
				toast(`${data.playlists.name} playlist added`, {
					type: 'success',
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: true,
				});
			} else {
				toast(`${state.playListName} playlist already exist`, {
					type: 'error',
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: true,
				});
				dispatch({ type: 'PLAYLISTNAME', payload: '' });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const saveToPlayList = async (playL) => {
		let check = playL.videos.findIndex(
			(vid) => vid.videoId === videoplay.videoId,
		);
		if (check === -1) {
			try {
				console.log('inside save to  playlist ', { playL });
				const { data } = await axios.patch(
					`https://cryptic-anchorage-74362.herokuapp.com/playlist/${playL._id}`,
					{
						videoId: videoplay.videoId,
						title: videoplay.title,
						description: videoplay.description,
						publishedAt: videoplay.publishedAt,
						thumbnailurl: videoplay.thumbnailurl,
						viewcount: videoplay.viewcount,
						liked: videoplay.liked,
					},
				);
				if (data.success) {
					// dispatch({type: "ADDPLAYLIST", payload:{ playL, video: data.updatePlaylist}})

					let checkPlayList = playlist.find((play) => play._id === playL._id);
					console.log({ checkPlayList });
					console.log({ check });
					let playLis = playlist.map((pl) => {
						return pl._id === checkPlayList._id
							? {
									...pl,
									videos: pl.videos.concat({
										...videoplay,
										playlistId: checkPlayList._id,
									}),
							  }
							: pl;
					});

					console.log('inside ADDPLAYLIST case', { playLis });
					setPlayList(playLis);
				}
				toast(`${videoplay.title} added to ${playL.name} playlist `, {
					type: 'success',
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: true,
				});
			} catch (error) {
				console.log(error);
			}
		} else {
			toast(`${videoplay.title} already exist in this playlist`, {
				type: 'error',
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: true,
			});
		}
	};

	return (
		<div
			onClick={() => setShowPlayListModal(false)}
			className={styles.modal}
			style={{ display: showPlaylistModal ? 'flex' : 'none' }}>
			<div
				style={{ display: showPlaylistModal ? 'flex' : 'none' }}
				className={styles.saveplaylistmodal}
				onClick={(e) => e.stopPropagation()}>
				<div className={styles.saveplaylistcontainer}>
					<div className={styles.saveplaylistwrapper}>
						<form onSubmit={submitHandler}>
							<input
								type='text'
								value={state.playListName}
								placeholder='Enter the playlist name'
								onChange={(e) =>
									dispatch({ type: 'PLAYLISTNAME', payload: e.target.value })
								}
								className={styles.saveplaylistinput}
							/>
						</form>
						{playlist.map((playL) => {
							return (
								<p key={playL.id}>
									<table className={styles.saveplaylisttable}>
										<tr>
											<td>
												<input
													type='checkbox'
													onChange={() => saveToPlayList(playL)}
													className={styles.saveplaylistcheckbox}
												/>
											</td>
											<td className={styles.saveplaylistname}>{playL.name}</td>
										</tr>
									</table>
								</p>
							);
						})}
						<button
							onClick={() => setShowPlayListModal(false)}
							className={styles.closeplaylist}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

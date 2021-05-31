import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
	const history = useHistory();
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);

	const handleLogout = async () => {
		return await auth.signOut();
	};

	const getFile = async (url) => {
		const response = await fetch(url);
		const data = await response.blob();

		return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
	};

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();
		let isSubscribed = true;
		if (!user) {
			history.push('/');
			return;
		}
		if (isSubscribed === true) {
			console.log('axio run');
			axios
				.get('https://api.chatengine.io/users/me/', {
					cancelToken: source.token,
					headers: {
						'project-id': process.env.REACT_APP_CHAT_ENGINE_ID,
						'user-name': user.email,
						'user-secret': user.uid
					}
				})
				.then(() => {
					setLoading(false);
				})
				.catch(() => {
					let formdata = new FormData();
					formdata.append('email', user.email);
					formdata.append('username', user.email);
					formdata.append('secret', user.uid);

					getFile(user.photoURL).then((avatar) => {
						formdata.append('avatar', avatar, avatar.name);
						axios
							.post(
								'https://api.chatengine.io/users/',
								formdata,
								{
									headers: {
										'private-key':
											process.env
												.REACT_APP_CHAT_ENGINE_KEY
									}
								}
							)
							.then(() => setLoading(false))
							.catch((error) => console.log(error));
					});
				});
		}
		return () => {
			source.cancel();
			isSubscribed = false;
		};
	}, [user, history]);

	if (!user || loading) return 'Loading...';

	if (user && !loading) {
		return (
			<div className='chats-page'>
				<div className='nav-bar'>
					<div className='logo-tab'>InnerCircle</div>
					<div className='logout-tab' onClick={handleLogout}>
						Logout
					</div>
				</div>
				<ChatEngine
					height='calc(100vh - 66px)'
					projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
					userName={user.email}
					userSecret={user.uid}
				/>
			</div>
		);
	} else {
		console.log('This run');
		return <></>;
	}
};

export default Chats;

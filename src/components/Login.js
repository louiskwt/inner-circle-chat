import React from 'react';
import {
	GoogleOutlined,
	FacebookOutlined,
	CommentOutlined
} from '@ant-design/icons';
import firebase from 'firebase/app';
import { auth } from '../firebase';

const Login = () => {
	const handleDemo = () => {
		const email = 'demo@gmail.com';
		const password = 'demo123';
		firebase.auth().signInWithEmailAndPassword(email, password);
	};
	return (
		<div id='login-page'>
			<div id='login-card'>
				<h2>Welcom to Inner Circle!</h2>
				<div
					className='login-button google'
					onClick={() =>
						auth.signInWithRedirect(
							new firebase.auth.GoogleAuthProvider()
						)
					}
				>
					<GoogleOutlined /> Signed In with Google
				</div>
				<br />
				<br />
				<div
					className='login-button facebook'
					onClick={() =>
						auth.signInWithRedirect(
							new firebase.auth.FacebookAuthProvider()
						)
					}
				>
					<FacebookOutlined /> Signed In with Facebook
				</div>
				<br />
				<br />
				<div className='login-button demo' onClick={handleDemo}>
					<CommentOutlined /> Try it now
				</div>
			</div>
		</div>
	);
};

export default Login;

import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const history = useHistory();

	useEffect(() => {
		let isSub = true;
		if (isSub && user !== {}) {
			auth.onAuthStateChanged((user) => {
				console.log('firebase run');
				setUser(user);
				console.log(user);
				setLoading(false);
				if (user) {
					history.push('/chats');
				}
			});
		}

		return () => (isSub = false);
	}, [user, history]);

	const value = { user, setUser };

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

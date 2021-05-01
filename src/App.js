import React, { useState } from 'react';
import './App.scss';
import axios from 'axios';
import EmptyState from './components/EmptyState';
import Video from './components/Video';

function App() {
	const [videos, setVideos] = useState([]);
	const [search, setSearch] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const onChange = (e) => {
		setSearch(e.target.value);
	};

	const onSubmit = async (e) => {
		setVideos([]);
		if (!search) {
			setError('Please enter something to search!');
		}
		setSearch('');
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await axios.get(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&q=${search}`
			);
			setVideos(data.items);
		} catch (e) {
			console.log(e.response.data);
			setError('Application Not Working. \n Please Try again later!');
		}
	};

	return (
		<div className='App'>
			<div className='searchInput-container'>
				<h1 className='search-title'>Enter Search Term</h1>
				<form onSubmit={onSubmit}>
					<div className='search-cont'>
						<input
							value={search}
							onChange={onChange}
							name='search'
							placeholder='Search Youtube Videos'
							className='search-input'
						/>
						<input type='submit' className='submit'></input>
					</div>
				</form>
			</div>
			<div className='videos-container'>
				{videos.length > 0 ? (
					videos.map((video) => <Video video={video} />)
				) : videos.length === 0 || loading || error ? (
					<>
						<div className='empty-state'>
							<EmptyState />
						</div>
						<h3 className='search-title state'>
							{!loading
								? 'Welcome Back 👋🏻'
								: !error
								? 'Loading...'
								: error}
						</h3>
					</>
				) : undefined}
			</div>
		</div>
	);
}

export default App;

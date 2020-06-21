import React from "react";
import axios from "axios";
import { ThreadPost } from './components/ThreadPost';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subreddit: 'reddit.com',
			posts: [],
			error: false,
		}
	}

	async componentDidMount() {
		const { subreddit } = this.state;
		this.sendRequest(subreddit);
	}

	makeThreadList = (data) => {
		if (!data || this.state.error) return;
		return (
			<React.Fragment>
				<h1 id="subreddit-title">/r/{this.state.subreddit}</h1>
				<ul>
					{data.map(post => (
						<ThreadPost 
							key={post.id} 
							score={post.score}
							author={post.author}
							title={post.title}
							url={`https://reddit.com${post.permalink}`}
						/>
					))}
				</ul>
			</React.Fragment>
		);
	}

	errorMsg = () => {
		return (
			<React.Fragment>
				<h1 id='error-title'>
					Error
				</h1>
				<div className="error-msg">
					<h4>Error, no subreddit with this name exists.</h4>
				</div>
			</React.Fragment>
		);
	}
	
	sendRequest = (sub) => {
		if (!sub) return;
		axios.get(`https://www.reddit.com/r/${sub}.json`)
			.then(res => {
				const newPosts = res.data.data.children
					.map(obj => obj.data);

				this.setState({
					posts: newPosts, 
					error: false,
					subreddit: newPosts[0].subreddit
				});
			})
			.catch(err => {
				console.log(err);
				this.setState({error: true});
			});
	}
	
	handleClick = (e) => {
		e.preventDefault();
		const { value } = e.currentTarget.previousSibling;
		if (!value) return;
		this.setState({subreddit: value});
		this.sendRequest(value);
	}

	handleKeyPress = (e) => {
		if (!e.key.match(/[A-Za-z0-9. ]/)) {
			e.preventDefault();
			return false;
		}
	}

	render() {
		const { posts, error } = this.state;
		return (
			<div className='thread-list'>
				<form>
					<input 
						id='text' 
						type='text' 
						onKeyPress={this.handleKeyPress} 
						placeholder='Enter the name of subreddit' 
					/>
					<input 
						id='submit'
						type='submit' 
						onClick={this.handleClick} 
						value='Search' 
					/>
				</form>
				
				{error ? this.errorMsg() : this.makeThreadList(posts)}

			</div>
		);
	}
}

export default App;
import React from "react";
import PropTypes from 'prop-types'

const ThreadPost = (props) => {
	const { score, author, title, id, url } = props;
	return (
		<li key={id}>
			<div className='thread-card'>
				<div className='thread-info'>
					<div className='thread-score'><p>Score: <span>{score}</span></p></div>
					<div className='thread-author'><p>Author: <span>{author}</span></p></div>
				</div>
				<hr/>
				<div className='thread-title'>
					<a href={url}><h4>{title}</h4></a>
				</div>
			</div>
		</li>
	);
}

ThreadPost.propTypes = {
	score: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
}

export { ThreadPost };
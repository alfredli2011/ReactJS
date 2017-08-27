import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost, deletePost} from '../actions';

class PostsShow extends Component {
	componentDidMount() {
		if(!this.props.post){
			const {id} = this.props.match.params;
			this.props.fetchPost(id);
		}
	}

	onDeletePost() {
		const {id} = this.props.match.params;
		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const {post} = this.props;
		if(!post) {
			return <div>Loading</div>
		}

		return (
			<div>
				<Link to="/">Back to Index</Link>
				<button 
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeletePost.bind(this)}>Delete Post</button> 
				<h3>{post.title}</h3>
				<h5>Categories: {post.categories}</h5>
				<p>{post.content}</p>
			</div>
		);
	}
}

//{posts} = rootReducer, ownProps = this.props
function mapStateToProps({posts}, ownProps) {
	return {post:posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
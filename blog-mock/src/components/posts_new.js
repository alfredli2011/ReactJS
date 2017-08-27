import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';


class PostsNew extends Component {
	renderField(field) {
		const {meta:{touched, error}} = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input type="text" {...field.input} className="form-control" />
				<p className="text-help">{touched ? error : ''}</p>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/');		
		});
	}

	render() {
		const {handleSubmit} = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field label="Title" name="title" component={this.renderField} />
					<Field label="Categories" name="categories" component={this.renderField} />
					<Field label="Content" name="content" component={this.renderField} />
					<button type="submit" className="btn btn-primary">Save</button>
					<Link to="/" className="btn btn-danger">Cancel</Link>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};
	if(!values.title || values.title.length < 3) {
		errors.title = 'Enter a title more than 3 characters';
	}
	if(!values.categories) {
		errors.categories = 'Enter a categories';
	}
	if(!values.content) {
		errors.content = 'Enter some content please';
	}

	//If errors has *any* properties, redux-form assumes form is invalid
	return errors;
}

export default reduxForm({
	form:'PostsNewForm',
	validate
})(
	connect(null, {createPost})(PostsNew)
);

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions';
import { connect } from 'react-redux';

class PostsNew extends Component {
  renderField(field) {
    const { touched, error } = field.meta;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input type="text" className="form-control" {...field.input} />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Title" name="title" component={this.renderField} />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field label="Content" name="content" component={this.renderField} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link style={{ marginLeft: 10 }} className="btn btn-danger" to="/">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter a valid title (with at least 3 chars)';
  }
  if (!values.categories) {
    errors.categories = 'Enter at least a valid category';
  }
  if (!values.content) {
    errors.contenttitle = 'Enter a valid content';
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(connect(null, { createPost })(PostsNew));

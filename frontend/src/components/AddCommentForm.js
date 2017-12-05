import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'

import { addComment } from '../actions/comments'

class AddCommentForm extends Component {
  state = {
    author: '',
    body: ''
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { author, body } = this.state

    this.props.addComment({
      parentId: this.props.postId,
      author,
      body
    })

    this.setState({
      author: '',
      body: ''
    })
  }

  render () {
    const { author, body } = this.state

    return (
      <Form onSubmit={this.handleSubmit} reply>
        <Form.Input label="Author" placeholder="What's your name?" name="author" value={author} onChange={this.handleChange} required />
        <Form.TextArea label="Comment" placeholder="Write here your comment about the post..." name="body" value={body} onChange={this.handleChange} required />
        <Button primary>Add comment</Button>
      </Form>
    )
  }
}

AddCommentForm.propTypes = {
  postId: PropTypes.string,
  addComment: PropTypes.func
}

const mapDispatchToProps = {
  addComment
}

export default connect(null, mapDispatchToProps)(AddCommentForm)

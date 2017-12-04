import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, Form, Header, Icon, Item, Label, Modal } from 'semantic-ui-react'
import Timestamp from 'react-timestamp'

import { votePost, editPost, deletePost } from '../actions'

class PostItem extends Component {
  state = {
    body: '',
    openEditModal: false,
    openDeleteModal: false
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  showEditPost = () => {
    this.setState({
      title: this.props.post.title,
      body: this.props.post.body,
      openEditModal: true
    })
  }

  confirmEditPost = (id, title, body) => {
    this.props.editPost(id, title, body)
    this.setState({ openEditModal: false })
  }

  showDeletePost = () => {
    this.setState({ openDeleteModal: true })
  }

  confirmDeletePost = (id) => {
    this.props.deletePost(id).then(() => {
      if (this.props.afterDeleteRedirectTo) {
        this.props.history.push(this.props.afterDeleteRedirectTo)
      }
    })
  }

  render () {
    const { post } = this.props
    const { title, body, openEditModal, openDeleteModal } = this.state

    return (
      <Item>
        <Item.Content>
          <Item.Header as={Link} to={`/${post.category}/${post.id}`}>{post.title}</Item.Header>
          <Item.Extra>
            <strong>{post.author}</strong>
            <Label size="small">
              <Icon name="time" />
              <Timestamp time={post.timestamp / 1000} format="full" />
            </Label>
            <Label icon="check" content={post.voteScore} size="small" className="countVote" />
            <Label as="a" icon="thumbs up" color="green" size="small" className="upVote" onClick={() => this.props.votePost(post.id, 'upVote')} />
            <Label as="a" icon="thumbs down" color="red" size="small" className="downVote" onClick={() => this.props.votePost(post.id, 'downVote')} />
            <Label as={Link} to={`/${post.category}/${post.id}`} icon="comments" content={post.commentCount} size="small" />
            <Label as={Link} to={`/${post.category}`} icon="tag" content={post.category} size="small" />
          </Item.Extra>
          <Item.Description>{post.body}</Item.Description>
          <Item.Extra>
            <a className="action" onClick={this.showEditPost}>Edit</a>
            <a className="action" onClick={this.showDeletePost}>Delete</a>
          </Item.Extra>
        </Item.Content>

        <Modal open={openEditModal}>
          <Header icon="edit" content="Edit post" />
          <Modal.Content>
            <Form id="editForm" onSubmit={() => this.confirmEditPost(post.id, title, body)}>
              <Form.Input label="Title" placeholder="What's the post title?" name="title" value={title} onChange={this.handleChange} required />
              <Form.TextArea label="Text" placeholder="Write here your post text..." name="body" value={body} onChange={this.handleChange} required />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.setState({openEditModal: false})}>Cancel</Button>
            <Button positive type="submit" form="editForm">Save</Button>
          </Modal.Actions>
        </Modal>

        <Modal size="mini" open={openDeleteModal}>
          <Header icon="trash" content="Delete post" />
          <Modal.Content>
            Are you sure you want to delete this post?
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.setState({openDeleteModal: false})}>No</Button>
            <Button positive onClick={() => this.confirmDeletePost(post.id)}>Yes</Button>
          </Modal.Actions>
        </Modal>
      </Item>
    )
  }
}

PostItem.propTypes = {
  afterDeleteRedirectTo: PropTypes.string,
  post: PropTypes.object,
  votePost: PropTypes.func,
  editPost: PropTypes.func,
  deletePost: PropTypes.func,
  history: PropTypes.object
}

const mapDispatchToProps = {
  votePost,
  editPost,
  deletePost
}

export default withRouter(connect(null, mapDispatchToProps)(PostItem))

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, Form, Header, Icon, Item, Label, Modal } from 'semantic-ui-react'
import Timestamp from 'react-timestamp'

import { votePost, editPost, deletePost } from '../actions/posts'

class PostItem extends Component {
  state = {
    editTitle: '',
    editBody: '',
    openEditModal: false,
    openDeleteModal: false
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  showEditPost = () => {
    this.setState({
      editTitle: this.props.post.title,
      editBody: this.props.post.body,
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
    const { post, votePost } = this.props
    const { editTitle, editBody, openEditModal, openDeleteModal } = this.state
    const { id, category, title, author, timestamp, voteScore, commentCount, body } = post

    return (
      <Item>
        <Item.Content>
          <Item.Header as={Link} to={`/${category}/${id}`}>{title}</Item.Header>
          <Item.Extra>
            <strong>{author}</strong>
            <Label size="small">
              <Icon name="time" />
              <Timestamp time={timestamp / 1000} format="full" />
            </Label>
            <Label icon="check" content={voteScore} size="small" className="countVote" />
            <Label as="a" icon="thumbs up" color="green" size="small" className="upVote" onClick={() => votePost(id, 'upVote')} />
            <Label as="a" icon="thumbs down" color="red" size="small" className="downVote" onClick={() => votePost(id, 'downVote')} />
            <Label as={Link} to={`/${category}/${id}`} icon="comments" content={commentCount} size="small" />
            <Label as={Link} to={`/${category}`} icon="tag" content={category} size="small" />
          </Item.Extra>
          <Item.Description>{body}</Item.Description>
          <Item.Extra>
            <a className="action" onClick={this.showEditPost}>Edit</a>
            <a className="action" onClick={this.showDeletePost}>Delete</a>
          </Item.Extra>
        </Item.Content>

        <Modal open={openEditModal}>
          <Header icon="edit" content="Edit post" />
          <Modal.Content>
            <Form id="editForm" onSubmit={() => this.confirmEditPost(id, editTitle, editBody)}>
              <Form.Input label="Title" placeholder="What's the post title?" name="editTitle" value={editTitle} onChange={this.handleChange} required />
              <Form.TextArea label="Text" placeholder="Write here your post text..." name="editBody" value={editBody} onChange={this.handleChange} required />
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

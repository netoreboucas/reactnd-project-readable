import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Comment, Form, Header, Icon, Label, Modal } from 'semantic-ui-react'
import Timestamp from 'react-timestamp'

import { voteComment, editComment, deleteComment } from '../actions/comments'

class CommentItem extends Component {
  state = {
    editBody: '',
    openEditModal: false,
    openDeleteModal: false
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  showEditComment = () => {
    this.setState({
      editBody: this.props.comment.body,
      openEditModal: true
    })
  }

  confirmEditComment = (id, body) => {
    this.props.editComment(id, body)
    this.setState({ openEditModal: false })
  }

  showDeleteComment = () => {
    this.setState({ openDeleteModal: true })
  }

  render () {
    const { comment } = this.props
    const { editBody, openEditModal, openDeleteModal } = this.state
    const { id, author, timestamp, voteScore, body } = comment

    return (
      <Comment>
        <Comment.Content>
          <Comment.Author as="span">{author}</Comment.Author>
          <Comment.Metadata>
            <Label size="small">
              <Icon name="time" />
              <Timestamp time={timestamp / 1000} format="full" />
            </Label>
            <Label icon="check" content={voteScore} size="small" className="countVote" />
            <Label as="a" icon="thumbs up" color="green" size="small" className="upVote" onClick={() => this.props.voteComment(id, 'upVote')} />
            <Label as="a" icon="thumbs down" color="red" size="small" className="downVote" onClick={() => this.props.voteComment(id, 'downVote')} />
          </Comment.Metadata>
          <Comment.Text>{body}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={this.showEditComment}>Edit</Comment.Action>
            <Comment.Action onClick={this.showDeleteComment}>Delete</Comment.Action>
          </Comment.Actions>
        </Comment.Content>

        <Modal open={openEditModal}>
          <Header icon="edit" content="Edit comment" />
          <Modal.Content>
            <Form id="editForm" onSubmit={() => this.confirmEditComment(comment.id, editBody)}>
              <Form.TextArea placeholder="Write here your comment about the post..." name="editBody" value={editBody} onChange={this.handleChange} required />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.setState({openEditModal: false})}>Cancel</Button>
            <Button positive type="submit" form="editForm">Save</Button>
          </Modal.Actions>
        </Modal>

        <Modal size="mini" open={openDeleteModal}>
          <Header icon="trash" content="Delete comment" />
          <Modal.Content>
            Are you sure you want to delete this comment?
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.setState({openDeleteModal: false})}>No</Button>
            <Button positive onClick={() => this.props.deleteComment(comment.id)}>Yes</Button>
          </Modal.Actions>
        </Modal>
      </Comment>
    )
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  voteComment: PropTypes.func,
  editComment: PropTypes.func,
  deleteComment: PropTypes.func
}

const mapDispatchToProps = {
  voteComment,
  editComment,
  deleteComment
}

export default connect(null, mapDispatchToProps)(CommentItem)

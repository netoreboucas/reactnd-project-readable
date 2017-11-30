import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Comment, Icon, Label } from 'semantic-ui-react'
import Timestamp from 'react-timestamp'

import { voteComment } from '../actions'

class CommentItem extends Component {
  render () {
    const { comment } = this.props

    return (
      <Comment>
        <Comment.Content>
          <Comment.Author as="span">{comment.author}</Comment.Author>
          <Comment.Metadata>
            <Label size="small">
              <Icon name="time" />
              <Timestamp time={comment.timestamp / 1000} />
            </Label>
            <Label icon="check" content={comment.voteScore} size="small" className="countVote" />
            <Label as="a" icon="thumbs up" color="green" size="small" className="upVote" onClick={() => this.props.voteComment(comment.id, 'upVote')} />
            <Label as="a" icon="thumbs down" color="red" size="small" className="downVote" onClick={() => this.props.voteComment(comment.id, 'downVote')} />
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Edit</Comment.Action>
            <Comment.Action>Delete</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    )
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  voteComment: PropTypes.func
}

const mapDispatchToProps = {
  voteComment
}

export default connect(null, mapDispatchToProps)(CommentItem)

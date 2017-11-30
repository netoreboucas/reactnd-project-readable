import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Item, Label } from 'semantic-ui-react'
import Timestamp from 'react-timestamp'

import { votePost } from '../actions'

class PostItem extends Component {
  render () {
    const { post } = this.props

    return (
      <Item>
        <Item.Content>
          <Item.Header as={Link} to={`/${post.category}/${post.id}`}>{post.title}</Item.Header>
          <Item.Extra>
            <strong>{post.author}</strong>
            <Label size="small">
              <Icon name="time" />
              <Timestamp time={post.timestamp / 1000} />
            </Label>
            <Label icon="check" content={post.voteScore} size="small" className="countVote" />
            <Label as="a" icon="thumbs up" color="green" size="small" className="upVote" onClick={() => this.props.votePost(post.id, 'upVote')} />
            <Label as="a" icon="thumbs down" color="red" size="small" className="downVote" onClick={() => this.props.votePost(post.id, 'downVote')} />
            <Label as={Link} to={`/${post.category}/${post.id}`} icon="comments" content={post.commentCount} size="small" />
            <Label as={Link} to={`/${post.category}`} icon="tag" content={post.category} size="small" />
          </Item.Extra>
          <Item.Description>{post.body}</Item.Description>
        </Item.Content>
      </Item>
    )
  }
}

PostItem.propTypes = {
  post: PropTypes.object,
  votePost: PropTypes.func
}

const mapDispatchToProps = {
  votePost
}

export default connect(null, mapDispatchToProps)(PostItem)

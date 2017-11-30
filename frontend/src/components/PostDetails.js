import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Comment, Dimmer, Header, Icon, Item, Loader } from 'semantic-ui-react'

import PostItem from './PostItem'
import CommentItem from './CommentItem'
import AddCommentForm from './AddCommentForm'

import { getPost, loadComments } from '../actions'

class PostDetails extends Component {
  state = {
    post: null,
    comments: null
  }

  getRoutePostId (match) {
    return (match && match.params && match.params.post_id) || ''
  }

  componentWillMount () {
    const postId = this.getRoutePostId(this.props.match)
    this.props.getPost(postId)
    this.props.loadComments(postId)
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => ({
      post: nextProps.post,
      comments: nextProps.comments
    }))
  }

  render () {
    const { post, comments } = this.state

    return (
      <div>
        {post && comments &&
          <div>
            <Item.Group divided>
              <PostItem post={post} />
            </Item.Group>

            <Comment.Group>
              <Header as="h4" dividing>
                <Icon name="comments" />
                Comments
              </Header>

              {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}

              <AddCommentForm postId={post.id} />

            </Comment.Group>
          </div>
        }
        {(!post || !comments) &&
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        }
      </div>
    )
  }
}

PostDetails.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.array,
  getPost: PropTypes.func,
  loadComments: PropTypes.func,
  match: PropTypes.object
}

const mapStateToProps = ({posts, comments}) => ({
  post: posts && posts.selectedPostId && posts.values[posts.selectedPostId],
  comments: comments && comments.loaded
    ? comments.keys.reduce((array, id) => {
      array.push(comments.values[id])
      return array
    }, []).sort((a, b) => (a.voteScore - b.voteScore)).reverse()
    : null
})

const mapDispatchToProps = {
  getPost,
  loadComments
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)

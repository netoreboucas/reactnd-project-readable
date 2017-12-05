import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Comment, Dimmer, Header, Icon, Item, Loader } from 'semantic-ui-react'

import PostItem from './PostItem'
import CommentItem from './CommentItem'
import AddCommentForm from './AddCommentForm'

import { getPost } from '../actions/posts'
import { loadComments } from '../actions/comments'

class PostDetails extends Component {
  state = {
    post: null,
    comments: null
  }

  getRouteCategory (match) {
    return (match && match.params && match.params.category) || ''
  }

  getRoutePostId (match) {
    return (match && match.params && match.params.post_id) || ''
  }

  componentDidMount () {
    const postId = this.getRoutePostId(this.props.match)
    this.props.getPost(postId).then(() => {
      if (this.props.post) {
        this.props.loadComments(postId)
      } else { // IF invalid post redirect to category page
        this.props.history.replace(`/${this.getRouteCategory(this.props.match)}#invalidPost=${postId}`)
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => ({
      post: nextProps.post,
      comments: nextProps.comments
    }))

    const newPostId = this.getRoutePostId(nextProps.match)
    if (nextProps.post && newPostId !== nextProps.post.id) {
      this.props.getPost(newPostId)
      this.props.loadComments(newPostId)
    }
  }

  render () {
    const { post, comments } = this.state

    return (
      <div>
        {post && comments &&
          <div>
            <Item.Group divided>
              <PostItem post={post} afterDeleteRedirectTo={`/${post.category}`} />
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
  match: PropTypes.object,
  history: PropTypes.object
}

const mapStateToProps = ({posts, comments}) => ({
  post: posts && posts.selectedPostId && posts.values && posts.values[posts.selectedPostId],
  comments: comments && comments.loaded
    ? comments.keys.reduce((result, id) => {
      result.push(comments.values[id])
      return result
    }, []).sort((a, b) => (a.voteScore - b.voteScore)).reverse()
    : null
})

const mapDispatchToProps = {
  getPost,
  loadComments
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)

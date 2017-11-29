import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Icon, Item, Label, Loader } from 'semantic-ui-react'
import Timestamp from 'react-timestamp'

import { setSelectedCategory, loadPosts, votePost } from '../actions'

class Posts extends Component {
  state = {
    posts: null
  }

  getRouteCategory (match) {
    return (match && match.params && match.params.category) || ''
  }

  componentWillMount () {
    const category = this.getRouteCategory(this.props.match)
    this.props.setSelectedCategory(category)
    this.props.loadPosts(category)
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => ({
      posts: nextProps.posts
    }))

    const newCategory = this.getRouteCategory(nextProps.match)
    if (newCategory !== nextProps.selectedCategory) {
      this.props.setSelectedCategory(newCategory)
      this.props.loadPosts(newCategory)
    }
  }

  render () {
    const { posts } = this.state

    return (
      <div>
        {posts &&
          <Item.Group divided>
            {posts.map(post => (
              <Item key={post.id}>
                <Item.Content>
                  <Item.Header>{post.title}</Item.Header>
                  <Item.Extra>
                    by <strong>{post.author}</strong>
                  </Item.Extra>
                  <Item.Description>{post.body}</Item.Description>
                  <Item.Extra>
                    <Label size="small">
                      <Icon name="time" />
                      <Timestamp time={post.timestamp / 1000} />
                    </Label>
                    <Label icon="comments" content={post.commentCount} size="small" />
                    <Label icon="check" content={post.voteScore} size="small" className="aaa" />
                    <Label as="a" icon="thumbs up" color="green" size="small" className="bbb" onClick={() => this.props.votePost(post.id, 'upVote')} />
                    <Label as="a" icon="thumbs down" color="red" size="small" className="ccc" onClick={() => this.props.votePost(post.id, 'downVote')} />
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        }
        {!posts &&
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        }
      </div>
    )
  }
}

Posts.propTypes = {
  selectedCategory: PropTypes.string,
  posts: PropTypes.array,
  setSelectedCategory: PropTypes.func,
  loadPosts: PropTypes.func,
  votePost: PropTypes.func,
  match: PropTypes.object
}

const mapStateToProps = ({categories, posts}) => ({
  selectedCategory: categories.selectedCategory,
  posts: posts && posts.loaded
    ? posts.keys.reduce((array, id) => {
      array.push(posts.values[id])
      return array
    }, []).sort((a, b) => (a[posts.sortBy] - b[posts.sortBy])).reverse()
    : null
})

const mapDispatchToProps = {
  setSelectedCategory,
  loadPosts,
  votePost
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)

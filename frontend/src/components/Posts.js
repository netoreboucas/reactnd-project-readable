import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Item, Loader } from 'semantic-ui-react'

import PostItem from './PostItem'

import { setSelectedCategory, loadPosts } from '../actions'

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
              <PostItem key={post.id} post={post} />
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
  loadPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)

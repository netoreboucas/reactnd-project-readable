import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Item, Loader, Menu, Message } from 'semantic-ui-react'

import PostItem from './PostItem'

import { setSelectedCategory } from '../actions/categories'
import { loadPosts, setSortBy } from '../actions/posts'

class Posts extends Component {
  getRouteCategory (match) {
    return (match && match.params && match.params.category) || ''
  }

  getHashValue (key) {
    var matches = window.location.hash.match(new RegExp(key + '=([^&]*)'))
    return matches ? matches[1] : null
  }

  componentDidMount () {
    const category = this.getRouteCategory(this.props.match)
    this.props.setSelectedCategory(category)
    this.props.loadPosts(category)
  }

  componentWillReceiveProps (nextProps) {
    const newCategory = this.getRouteCategory(nextProps.match)
    if (newCategory !== nextProps.selectedCategory) {
      this.props.setSelectedCategory(newCategory)
      this.props.loadPosts(newCategory)
    }

    // IF invalid category redirect to home page
    if (newCategory !== '' && this.props.categories && this.props.categories.indexOf(newCategory) < 0) {
      this.props.history.replace(`/#invalidCategory=${newCategory}`)
    }
  }

  checkInvalidCategoryOrPost () {
    const invalidCategory = this.getHashValue('invalidCategory')

    if (invalidCategory) {
      return (
        <Message negative>
          <Message.Header>Invalid Category</Message.Header>
          <p>
            You are trying to access the category <i><strong>{invalidCategory}</strong></i>, but this category does not exist. <br />
            Please choose a valid category on the left side menu.
          </p>
        </Message>
      )
    }

    const invalidPost = this.getHashValue('invalidPost')

    if (invalidPost) {
      return (
        <Message negative>
          <Message.Header>Invalid Post</Message.Header>
          <p>
            You are trying to access the post <i><strong>{invalidPost}</strong></i>, but this post does not exist. <br />
            Please choose a valid post bellow.
          </p>
        </Message>
      )
    }

    return null
  }

  render () {
    const { posts, sortBy } = this.props

    return (
      <div>
        <Menu>
          <Menu.Item header>Sort by</Menu.Item>
          <Menu.Item active={sortBy === 'timestamp'} onClick={() => this.props.setSortBy('timestamp')}>
            Date
          </Menu.Item>
          <Menu.Item active={sortBy === 'voteScore'} onClick={() => this.props.setSortBy('voteScore')}>
            Votes
          </Menu.Item>
        </Menu>

        {this.checkInvalidCategoryOrPost()}

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
  categories: PropTypes.array,
  selectedCategory: PropTypes.string,
  posts: PropTypes.array,
  sortBy: PropTypes.string,
  setSelectedCategory: PropTypes.func,
  loadPosts: PropTypes.func,
  setSortBy: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object
}

const mapStateToProps = ({categories, posts}) => ({
  categories: categories && categories.loaded
    ? categories.keys.reduce((result, id) => {
      result.push(categories.values[id].path)
      return result
    }, [])
    : null,
  selectedCategory: categories && categories.loaded ? categories.selectedCategory : null,
  posts: posts && posts.loaded
    ? posts.keys.reduce((result, id) => {
      result.push(posts.values[id])
      return result
    }, []).sort((a, b) => (a[posts.sortBy] - b[posts.sortBy])).reverse()
    : null,
  sortBy: posts && posts.loaded ? posts.sortBy : null
})

const mapDispatchToProps = {
  setSelectedCategory,
  loadPosts,
  setSortBy
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)

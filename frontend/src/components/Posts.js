import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Item, Loader } from 'semantic-ui-react'

import { setSelectedCategory, loadPosts } from '../actions'

class Posts extends Component {
  state = {
    posts: {}
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
        {(posts && posts.loaded) &&
          <Item.Group divided>
            {posts.keys.map(key =>
              <Item key={key}>
                <Item.Content>
                  <Item.Header>{posts.values[key].title}</Item.Header>
                  <Item.Description>{posts.values[key].body}</Item.Description>
                </Item.Content>
              </Item>
            )}
          </Item.Group>
        }
        {(!posts || !posts.loaded) &&
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
  posts: PropTypes.object,
  setSelectedCategory: PropTypes.func,
  loadPosts: PropTypes.func,
  match: PropTypes.object
}

function mapStateToProps ({ categories, posts }) {
  return {
    selectedCategory: categories.selectedCategory,
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSelectedCategory: (category) => dispatch(setSelectedCategory(category)),
    loadPosts: (category) => dispatch(loadPosts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)

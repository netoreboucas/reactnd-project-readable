import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Item, Loader } from 'semantic-ui-react'

import { loadPosts } from '../actions'

class Posts extends Component {
  state = {
    selectedCategory: '',
    posts: {}
  }

  getRouteCategory (match) {
    return match && match.params && match.params.category
  }

  componentWillMount () {
    this.setState({
      selectedCategory: this.getRouteCategory(this.props.match)
    })
  }

  componentDidMount () {
    this.props.loadPosts(this.state.selectedCategory)
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => ({
      posts: nextProps.posts
    }))

    const newCategory = this.getRouteCategory(nextProps.match)
    if (newCategory !== this.state.selectedCategory) {
      this.setState({ selectedCategory: newCategory })
      this.props.loadPosts(this.state.selectedCategory)
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
  posts: PropTypes.object,
  loadPosts: PropTypes.func,
  match: PropTypes.object
}

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (category) => dispatch(loadPosts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)

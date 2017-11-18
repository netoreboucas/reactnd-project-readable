import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Icon, Item, Label, Loader } from 'semantic-ui-react'
import Timestamp from 'react-timestamp'

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
                  <Item.Extra>
                    by <strong>{posts.values[key].author}</strong>
                  </Item.Extra>
                  <Item.Description>{posts.values[key].body}</Item.Description>
                  <Item.Extra>
                    <Label size="small">
                      <Icon name="time" />
                      <Timestamp time={posts.values[key].timestamp / 1000} />
                    </Label>
                    <Label icon="comments" content={posts.values[key].commentCount} size="small" />
                    <Label icon="check" content={posts.values[key].voteScore} size="small" className="aaa" />
                    <Label icon="thumbs up" color="green" size="small" className="bbb" />
                    <Label icon="thumbs down" color="red" size="small" className="ccc" />
                  </Item.Extra>
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

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Loader, Menu } from 'semantic-ui-react'
import { capitalize } from '../utils/helpers'

import { loadCategories, setSortBy } from '../actions'

class AppMenu extends Component {
  state = {
    categories: {},
    posts: {}
  }

  componentDidMount () {
    this.props.loadCategories()
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => ({
      categories: nextProps.categories,
      posts: nextProps.posts
    }))
  }

  render () {
    const { categories, posts } = this.state

    return (
      <Menu vertical inverted fixed="left">
        {(categories && categories.loaded) &&
          <div>
            <Menu.Item>
              <Menu.Header>Categories</Menu.Header>
              <Menu.Menu>
                <Menu.Item as={Link} to="/" active={categories.selectedCategory === ''}>
                  All
                </Menu.Item>

                {categories.keys.map(key =>
                  <Menu.Item as={Link} key={key} to={`/${key}`} active={categories.selectedCategory === key}>
                    {capitalize(key)}
                  </Menu.Item>
                )}
              </Menu.Menu>
            </Menu.Item>
            {(posts && posts.loaded) &&
              <Menu.Item>
                <Menu.Header>Sort by</Menu.Header>
                <Menu.Menu>
                  <Menu.Item as="a" active={posts.sortBy === 'timestamp'} onClick={() => this.props.setSortBy('timestamp')}>
                    Date
                  </Menu.Item>
                  <Menu.Item as="a" active={posts.sortBy === 'voteScore'} onClick={() => this.props.setSortBy('voteScore')}>
                    Votes
                  </Menu.Item>
                </Menu.Menu>
              </Menu.Item>
            }
          </div>
        }
        {(!categories || !categories.loaded) &&
          <Dimmer active>
            <Loader />
          </Dimmer>
        }
      </Menu>
    )
  }
}

AppMenu.propTypes = {
  categories: PropTypes.object,
  posts: PropTypes.object,
  loadCategories: PropTypes.func,
  setSortBy: PropTypes.func
}

const mapStateToProps = ({ categories, posts }) => ({
  categories,
  posts
})

const mapDispatchToProps = {
  loadCategories,
  setSortBy
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu)

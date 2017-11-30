import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Loader, Menu } from 'semantic-ui-react'
import { capitalize } from '../utils/helpers'

import AddPostModal from './AddPostModal'

import { loadCategories } from '../actions'

class AppMenu extends Component {
  state = {
    categories: null,
    selectedCategory: null
  }

  componentDidMount () {
    this.props.loadCategories()
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => ({
      categories: nextProps.categories,
      selectedCategory: nextProps.selectedCategory
    }))
  }

  render () {
    const { categories, selectedCategory } = this.state

    return (
      <Menu vertical inverted fixed="left">
        {categories &&
          <div>
            <AddPostModal />
            <Menu.Item>
              <Menu.Header>Categories</Menu.Header>
              <Menu.Menu>
                <Menu.Item as={Link} to="/" active={selectedCategory === ''}>
                  All
                </Menu.Item>

                {categories.map(category =>
                  <Menu.Item as={Link} key={category.path} to={`/${category.path}`} active={selectedCategory === category.path}>
                    {capitalize(category.name)}
                  </Menu.Item>
                )}
              </Menu.Menu>
            </Menu.Item>
          </div>
        }
        {!categories &&
          <Dimmer active>
            <Loader />
          </Dimmer>
        }
      </Menu>
    )
  }
}

AppMenu.propTypes = {
  categories: PropTypes.array,
  selectedCategory: PropTypes.string,
  loadCategories: PropTypes.func
}

const mapStateToProps = ({ categories }) => ({
  categories: categories && categories.loaded
    ? categories.keys.reduce((result, id) => {
      result.push(categories.values[id])
      return result
    }, [])
    : null,
  selectedCategory: categories && categories.loaded ? categories.selectedCategory : null
})

const mapDispatchToProps = {
  loadCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu)

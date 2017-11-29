import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Loader, Menu } from 'semantic-ui-react'
import { capitalize } from '../utils/helpers'

import { loadCategories } from '../actions'

class AppMenu extends Component {
  state = {
    categories: {}
  }

  componentDidMount () {
    this.props.loadCategories()
  }

  componentWillReceiveProps (nextProps) {
    this.setState((prevState, props) => ({
      categories: nextProps.categories
    }))
  }

  render () {
    const { categories } = this.state

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
  loadCategories: PropTypes.func
}

const mapStateToProps = ({ categories }) => ({
  categories
})

const mapDispatchToProps = {
  loadCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu)

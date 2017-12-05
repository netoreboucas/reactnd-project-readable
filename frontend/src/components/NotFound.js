import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

const NotFound = ({ location }) => {
  return (
    <Message>
      <Message.Header>
        Page Not Found
      </Message.Header>
      <p>
        Sorry, the page <i><strong>{location.pathname}</strong></i> does not exist.
      </p>
    </Message>
  )
}

NotFound.propTypes = {
  location: PropTypes.object
}

export default NotFound

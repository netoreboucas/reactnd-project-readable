import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import AppMenu from './AppMenu'
import Posts from './Posts'
import PostDetails from './PostDetails'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className="app">
        <AppMenu />

        <Container fluid>
          <Route exact path="/" component={Posts} />
          <Route exact path="/:category" component={Posts} />
          <Route exact path="/:category/:post_id" component={PostDetails} />
        </Container>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import AppMenu from './AppMenu'
import Posts from './Posts'
import PostDetails from './PostDetails'
import NotFound from './NotFound'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className="app">
        <AppMenu />

        <Container fluid>
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route exact path="/:category" component={Posts} />
            <Route exact path="/:category/:post_id" component={PostDetails} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </div>
    )
  }
}

export default App

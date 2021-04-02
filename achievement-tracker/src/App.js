import React from 'react'

import { Route, Switch, BrowserRouter } from 'react-router-dom'
import './App.css'

import Home from './react-components/Home'
import ReviewForum from './react-components/ReviewForum'
import Admin from './react-components/Admin'
import Login from './react-components/Login'
import Signup from './react-components/Signup'
import DashBoard from './react-components/Dashboard'
import GameAchievements from './react-components/GameAchievements'
import AccountSettings from './react-components/AccountSettings'
import Analytics from './react-components/Analytics'

import { checkSession } from './actions/reactAuth'
import SteamInfo from './react-components/InfoPage'

class App extends React.Component {
  componentDidMount() {
    checkSession(this); // sees if a user is logged in
  }

  // global state passed down which indicates the current logged in user
  state = {
    currentUser: null
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* renders login and dashboard depending on if the user is logged in */}
            <Route
              exact path={["/Login", "/Dashboard"]}
              render={props => (
                <div className="App">
                  {!currentUser ? <Login {...props} app={this} /> : <DashBoard {...props} app={this} />}
                </div>
              )}
            />
            {/* renders home and dashboard depending on if the user is logged in */}
            <Route
              exact path="/"
              render={props => (
                <div className="App">
                  {!currentUser ? <Home /> : <DashBoard {...props} app={this} />}
                </div>
              )}
            />
            <Route exact path='/' render={() => (<Home />)} />
            <Route exact path='/ReviewForum' render={() => (<ReviewForum />)} />
            <Route exact path='/Admin' render={() => (<Admin />)} />
            <Route exact path='/Signup' render={() => (<Signup />)} />
            <Route exact path='/SteamInfo' render={() => (<SteamInfo />)} />
            <Route exact path='/GameAchievements' render={(props) => (<GameAchievements {...props} />)} />
            <Route exact path='/Analytics' render={() => (<Analytics />)} />
            <Route exact path='/AccountSettings' render={() => (<AccountSettings />)} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }

}

export default App;

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
    document.title = 'Steam Achievement Tracker'
  }

  // global state passed down which indicates the current logged in user
  state = {
    currentUser: null
  }

  render() {
    const { currentUser } = this.state;

    // if the current user is an admin, then any route takes them to the admin dashboard
    if (currentUser && currentUser.toLowerCase().startsWith('admin')) {
      return (
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path='/*' render={props => (<Admin {...props} app={this} />)} />
            </Switch>
          </BrowserRouter>
        </div>
      )
    }

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
            <Route
              exact path="/Signup"
              render={props => (
                <div className="App">
                  {!currentUser ? <Signup /> : <DashBoard {...props} app={this} />}
                </div>
              )}
            />
            {/* pages only available if a user is logged in */}
            <Route
              exact path="/GameAchievements"
              render={props => (
                <div className="App">
                  {!currentUser ? <Login /> : <GameAchievements {...props} app={this} />}
                </div>
              )}
            />
            <Route
              exact path="/Analytics"
              render={props => (
                <div className="App">
                  {!currentUser ? <Login /> : <Analytics {...props} app={this} />}
                </div>
              )}
            />
            <Route
              exact path="/AccountSettings"
              render={props => (
                <div className="App">
                  {!currentUser ? <Login /> : <AccountSettings {...props} app={this} />}
                </div>
              )}
            />
            {/* static routes available to public */}
            <Route exact path='/ReviewForum' render={props => (<ReviewForum {...props} app={this} />)} />
            <Route exact path='/SteamInfo' render={() => (<SteamInfo />)} />

            {/* any other route defaults to dashboard if logged in and homepage if not (404 route) */}
            <Route
              exact path="/*"
              render={props => (
                <div className="App">
                  {!currentUser ? <Home /> : <DashBoard {...props} app={this} />}
                </div>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => (<Home />)} />
          <Route exact path='/ReviewForum' render={() => (<ReviewForum />)} />
          <Route exact path='/Admin' render={() => (<Admin />)} />
          <Route exact path='/Login' render={() => (<Login />)} />
          <Route exact path='/Signup' render={() => (<Signup />)} />
          <Route exact path='/Dashboard' render={() => (<DashBoard />)} />
          <Route exact path='/GameAchievements' render={(props) => (<GameAchievements {...props} />)} />
          <Route exact path='/Analytics' render={() => (<Analytics />)} />
          <Route exact path='/AccountSettings' render={() => (<AccountSettings />)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

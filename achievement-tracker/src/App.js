import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import AccountSettings from './react-components/AccountSettings';

import Home from './react-components/Home'
import DashBoard from './react-components/Dashboard'
import ReviewForum from './react-components/ReviewForum'
import Login from './react-components/Login'
import Admin from './react-components/Admin'
import Signup from './react-components/Signup'
import GameAchievements from './react-components/GameAchievements'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => (<Home />)} />
          <Route exact path='/ReviewForum' render={() => (<ReviewForum />)} />
          <Route exact path='/AccountSettings' render={() => (<AccountSettings />)} />
          <Route exact path='/Login' render={() => (<Login />)} />
          <Route exact path='/Dashboard' render={() => (<DashBoard />)} />
          <Route exact path='/Admin' render={() => (<Admin />)} />
          <Route exact path='/Signup' render={() => (<Signup />)} />
          <Route exact path='/GameAchievements' render={() => (<GameAchievements />)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

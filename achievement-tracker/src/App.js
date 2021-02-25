import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import AccountSettings from './react-components/AccountSettings';

import Home from './react-components/Home'
import DashBoard from './react-components/Dashboard'
import ReviewForum from './react-components/ReviewForum'
import Login from './react-components/Login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => (<Home/>)}/>
          <Route exact path='/ReviewForum' render={() => (<ReviewForum/>)}/>
          <Route exact path='/AccountSettings' render={() => (<AccountSettings/>)}/>
          <Route exact path='/Login' render={() => (<Login />)} />
          <Route exact path='/dashboard' render={() => (<DashBoard/>)}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

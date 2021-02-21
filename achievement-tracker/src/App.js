import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './react-components/Home'
import ReviewForum from './react-components/ReviewForum'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => (<Home/>)}/>
          <Route exact path='/ReviewForum' render={() => (<ReviewForum/>)}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

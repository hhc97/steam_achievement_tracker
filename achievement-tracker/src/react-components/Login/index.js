import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

import { Redirect } from 'react-router-dom'

import './Login.css';

import UserKeys from '../UserKeys.js'

const log = console.log

class Login extends React.Component {

  state = {
    userName: '',
    passWord: '',
    captcha_solved: false
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleLogin = () => {

    const keys = UserKeys
    const username = this.state.userName.toLowerCase()
    const password = this.state.passWord

    if (this.state.captcha_solved) {
      if (username == '' || password == '') {
        alert("username or password cannot be empty")
        return
      }
      if ((username == 'admin' || username == 'user' || username == 'guest')
        && username == password) {

        localStorage.setItem(keys.user, username)
        if (username == 'admin') {
          localStorage.setItem(keys.isAdmin, true)
        } else {
          localStorage.setItem(keys.isAdmin, false)
        }

        this.setState({
          redirect: '/Dashboard'
        })
        return
      }
      localStorage.setItem(keys.user, null)
      alert('invalid login')
    }
    else {
      alert('please verify captcha before logging in')
    }
  }

  handleSignup = () => {
    this.setState({
      redirect: '/Signup'
    })
  }

  gameAchievements = () => {
    this.setState({
      redirect: '/gameAchievements'
    })
  }

  handleCaptchaSolve = () => {
    this.setState({
      captcha_solved: true
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div id='LoginPage'>
        <div id="LoginContainer">
          <p>Please enter your credentials:</p>
          <input className="LoginField"
            value={this.state.userName}
            onChange={this.handleInputChange}
            type='text'
            name='userName'
            placeholder='Username or email'
            autoFocus></input>

          <input className="LoginField"
            value={this.state.passWord}
            onChange={this.handleInputChange}
            type='password'
            name='passWord'
            placeholder='password'></input>

          <input className="LoginButton"
            type='submit'
            value='Sign in'
            onClick={this.handleLogin}></input>

          <br /><br />
          <div>Don't have an account?</div>

          <input className="SignUpButton"
            type='submit'
            value='Sign up'
            onClick={this.handleSignup}></input>

          <input className="SignUpButton"
            type='submit'
            value='game page'
            onClick={this.gameAchievements}></input>

          <ReCAPTCHA
            sitekey="6LckfXMaAAAAAFQXopzO5R-TmD-4VQlwcRIx7YWy"
            onChange={this.handleCaptchaSolve}
          />
        </div>
      </div>
    )
  }
}

export default Login;

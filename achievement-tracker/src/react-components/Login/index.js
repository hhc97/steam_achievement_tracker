import React from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import Button from 'react-bootstrap/Button'

import { Redirect } from 'react-router-dom'

import { HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'
import logo from './../../logo.svg'

import 'bootstrap/dist/css/bootstrap.min.css'
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

    // some temporary hardcoded values for phase 1
    if (this.state.captcha_solved) {
      if (username == '' || password == '') {
        alert("username or password cannot be empty")
        return
      }
      if ((username == 'admin' || username == 'user')
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
        <HeadContainer bgId={"dashboard"}>
          <HeaderNavBar>
            <HeaderImage to='/' src={logo} />
            <div className='group'>
              <HeaderButton path='/reviewforum'>Forum</HeaderButton>
            </div>
          </HeaderNavBar>
        </HeadContainer>
        <div id="LoginContainer">
          <div id="LoginCredentials">
            <p className='loginText'>Please enter your credentials:</p>

            <input className="LoginField"
              value={this.state.userName}
              onChange={this.handleInputChange}
              type='text'
              name='userName'
              placeholder='Username'
              autoFocus></input>

            <input className="LoginField"
              value={this.state.passWord}
              onChange={this.handleInputChange}
              type='password'
              name='passWord'
              placeholder='Password'></input>

            <Button className="LoginButton"
              variant="primary"
              disabled={!this.state.captcha_solved}
              onClick={this.handleLogin}>Log In</Button>
          </div>

          <div id="SignupRedirect">
            <p className='loginText'>Don't have an account?</p>

            <Button className="LoginButton"
              variant="secondary"
              onClick={this.handleSignup}>Sign Up</Button>

            <ReCAPTCHA
              className='loginCaptcha'
              sitekey="6LckfXMaAAAAAFQXopzO5R-TmD-4VQlwcRIx7YWy"
              onChange={this.handleCaptchaSolve} />

            <Button className='loginCaptcha'
              variant="warning"
              onClick={this.handleCaptchaSolve}>Bypass verify (for testing)</Button>
          </div>

        </div>
      </div>
    )
  }
}

export default Login;

import React from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import Button from 'react-bootstrap/Button'

import { Redirect } from 'react-router-dom'

import { CurrentHeaderButton, HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'
import logo from './../../steamIcon2.png'

import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css';

import { login } from '../../actions/reactAuth'


const log = console.log

class Login extends React.Component {

  state = {
    userName: '',
    passWord: '',
    captcha_solved: false
  }

  componentDidMount() {
    // enter key tries to sign in
    window.onkeydown = e => { if (this.state.captcha_solved && e.code === 'Enter') { this.handleLogin() } }
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
    const loginDetails = {
      username: this.state.userName,
      password: this.state.passWord
    }
    const { app } = this.props
    login(loginDetails, app)
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
              <CurrentHeaderButton>Login</CurrentHeaderButton>
              <span className="slash">/</span>
              <HeaderButton path="/Signup">Sign Up</HeaderButton>
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
          </div>
        </div>
      </div>
    )
  }
}

export default Login;

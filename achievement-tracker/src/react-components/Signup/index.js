import React from 'react'
import Button from 'react-bootstrap/Button'

import { Redirect } from 'react-router-dom'

import { HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'
import logo from './../../logo.svg'
import ENV from '../../config'

import 'bootstrap/dist/css/bootstrap.min.css'
import './Signup.css';

const log = console.log

class Signup extends React.Component {

  state = {
    userName: '',
    passWord: '',
    passWord2: '',
    steamName: '',
    valid_username: false,
    valid_steamID: false
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })

    // if the username changed, check if the new one is already in use
    // and disable the signup button if it is
    if (name === 'userName') {
      fetch(`/usernames/${value}`)
        .then(res => {
          if (res.status === 404) {
            this.setState({
              valid_username: true
            })
          } else if (res.status === 200) {
            this.setState({
              valid_username: false
            })
          }
        })
    }

    // check that a valid steam ID has been entered
    if (name === 'steamName') {
      fetch(`/steamapi/userinfo/?key=${ENV.steam_key}&steamids=${value}`)
        .then(res => { return res.json() })
        .then(json => {
          if (json.response.players.length > 0 && json.response.players[0].communityvisibilitystate === 3) {
            this.setState({
              valid_steamID: true
            })
          } else {
            this.setState({
              valid_steamID: false
            })
          }
        })
    }
  }

  handleSignup = () => {
    if (this.state.userName == '' ||
      this.state.passWord == '' ||
      this.state.steamName == '') {
      alert('some input fields are empty')
      return
    }
    if (this.state.passWord !== this.state.passWord2) {
      alert('Passwords do not match')
      return
    }
    if (this.state.passWord.length < 4) {
      alert('password must be at least 4 characters')
      return
    }
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.passWord,
        steamName: this.state.steamName
      })
    };

    fetch('/users', requestOptions)
      .then(res => {
        if (res.status === 400) {
          alert('server error: account not created')
        } else if (res.status === 200) {
          alert('account created, please proceed to log in')
          this.setState({
            redirect: '/Login'
          })
        }
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
              <HeaderButton path='/login'>Login</HeaderButton>
            </div>
          </HeaderNavBar>
        </HeadContainer>
        <div id="SignupContainer">
          <p className='loginText'>Please enter your details:</p>

          <input className="SignupField"
            value={this.state.userName}
            onChange={this.handleInputChange}
            type='text'
            name='userName'
            placeholder='Create a username'
            autoFocus></input>

          <input className="SignupField"
            value={this.state.passWord}
            onChange={this.handleInputChange}
            type='password'
            name='passWord'
            placeholder='Create a password'></input>

          <input className="SignupField"
            value={this.state.passWord2}
            onChange={this.handleInputChange}
            type='password'
            name='passWord2'
            placeholder='Confirm password'></input>

          <input className="SignupField"
            value={this.state.steamName}
            onChange={this.handleInputChange}
            type='text'
            name='steamName'
            placeholder='Enter Steam ID'></input>

          <Button className="SignUpButton"
            variant="secondary"
            disabled={!(this.state.valid_username && this.state.valid_steamID)}
            onClick={this.handleSignup}>Sign Up</Button>
        </div>
      </div>
    )
  }
}

export default Signup;

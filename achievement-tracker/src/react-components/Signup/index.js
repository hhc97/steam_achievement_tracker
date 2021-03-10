import React from 'react'
import Button from 'react-bootstrap/Button'

import { Redirect } from 'react-router-dom'

import { HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'
import logo from './../../logo.svg'

import 'bootstrap/dist/css/bootstrap.min.css'
import './Signup.css';

const log = console.log

class Signup extends React.Component {

  state = {
    userName: '',
    passWord: '',
    passWord2: '',
    steamName: ''
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
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
    // check username uniqueness in DB
    // check that steam username allows data retrieval
    alert('Account created (this is not functional yet as we need the backend)')
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
          <p>Please enter your details:</p>

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
            placeholder='Enter Steam username'></input>

          <Button className="SignUpButton"
            variant="secondary"
            onClick={this.handleSignup}>Sign Up</Button>
        </div>
      </div>
    )
  }
}

export default Signup;

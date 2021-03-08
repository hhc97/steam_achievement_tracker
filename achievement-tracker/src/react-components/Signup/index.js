import React from 'react';

import { Redirect } from 'react-router-dom'

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
    if (this.state.passWord !== this.state.passWord2) {
      alert('Passwords do not match')
      return
    }
    if (this.state.userName == '' ||
      this.state.passWord == '' ||
      this.state.steamName == '') {
      alert('some input fields are empty')
      return
    }
    // check username uniqueness in DB
    // check that steam username allows data retrieval
    log('Fake signup success')
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div id='LoginPage'>
        <div id="LoginContainer">
          <p>Please enter your details:</p>
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

          <input className="LoginField"
            value={this.state.passWord2}
            onChange={this.handleInputChange}
            type='password'
            name='passWord2'
            placeholder='confirm password'></input>

          <input className="LoginField"
            value={this.state.steamName}
            onChange={this.handleInputChange}
            type='text'
            name='steamName'
            placeholder='steam username'></input>

          <input className="SignUpButton"
            type='submit'
            value='Sign up'
            onClick={this.handleSignup}></input>
        </div>
      </div>
    )
  }
}

export default Signup;

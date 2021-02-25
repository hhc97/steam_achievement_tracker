import React from 'react';

import { Redirect } from 'react-router-dom'

import './Login.css';

const log = console.log

class Login extends React.Component {

  state = {
    userName: '',
    passWord: ''
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
    log(this.state.userName)
    log(this.state.passWord)
    if (this.state.userName == '' || this.state.passWord == '') {
      alert("username or password cannot be empty")
      return
    }
    this.setState({
      redirect: '/Dashboard'
    })
    // clear username and password if login successful
    // this.setState({
    //   userName: '',
    //   passWord: ''
    // })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className='Login'>
        <input
          value={this.state.userName}
          onChange={this.handleInputChange}
          type='text'
          name='userName'
          placeholder='Username or email'
          autoFocus></input>

        <input
          value={this.state.passWord}
          onChange={this.handleInputChange}
          type='password'
          name='passWord'
          placeholder='password'></input>

        <input
          type='submit'
          value='Sign in'
          onClick={this.handleLogin}></input>
      </div>
    )
  }
}

export default Login;

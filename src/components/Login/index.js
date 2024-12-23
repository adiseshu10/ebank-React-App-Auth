import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    userPin: '',
    invalidInputs: false,
    msg: '',
  }

  setUserId = event => {
    this.setState({userId: event.target.value})
  }

  setUserPin = event => {
    this.setState({userPin: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 600,
      path: '/',
    })
    history.replace('/')
  }

  onFailureLogin = msg => {
    this.setState({invalidInputs: true, msg})
  }

  bankLogin = async () => {
    const {userId, userPin} = this.state
    const userDetails = {user_id: userId, pin: userPin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.jwt_token)
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  render() {
    const {userId, userPin, invalidInputs, msg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-con">
        <div className="ct-con">
          <div className="im-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="ima"
            />
          </div>
          <form className="form-el" onSubmit={this.bankLogin}>
            <h1 className="header"> Welcome Back! </h1>
            <div className="inp-con">
              <label htmlFor="user" className="lab">
                User ID
              </label>
              <input
                id="user"
                placeholder="Enter User ID"
                className="inp"
                type="text"
                value={userId}
                onChange={this.setUserId}
              />
            </div>
            <div className="inp-con">
              <label htmlFor="pin" className="lab">
                PIN
              </label>
              <input
                placeholder="Enter Pin"
                id="pin"
                className="inp"
                type="password"
                value={userPin}
                onChange={this.setUserPin}
              />
            </div>
            <button className="but" type="submit">
              Login
            </button>
            <div className="ct">
              {invalidInputs === true && <p className="ep"> {msg} </p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login

import React, {Component} from 'react'

import axios from 'axios'
import {Link} from 'react-router-dom'

class LogIn extends Component {

    logInUser = () => {
        axios.get('/loginDummy').then(_=>{
            this.props.history.push('/home')
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.logInUser}>Log In</button>
            </div>
        )
    }
}

export default LogIn
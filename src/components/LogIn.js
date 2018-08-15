import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { LOGIN } from '../dux/reducer'

class LogIn extends Component {
    logInUser = () => {
        axios.get('/loginDummy').then(_=>{
            this.props.LOGIN()
            this.props.history.push('/home')
        })
    }

    render() {
        return (
            <div className="stepInner">
                <button onClick={this.logInUser}>Log In</button>
            </div>
        )
    }
}

export default connect(_=>{}, {LOGIN})(LogIn)
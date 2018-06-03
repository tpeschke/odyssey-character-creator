import React, {Component} from 'react'

import {connect} from 'react-redux'
import {RESETCHARACTER} from '../dux/reducer'

class Home extends Component {
    setCharacter = () => {
        this.props.RESETCHARACTER()
        this.props.history.push('/step1')
    }

    render(){
        return (
            <div>
                <button onClick={this.setCharacter}>New Character</button>    
            </div>
        )
    }
}

export default connect(function(){return{}}, {RESETCHARACTER})(Home)
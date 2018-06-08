import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {RESETCHARACTER} from '../dux/reducer'

class Home extends Component {
    setCharacter = () => {
        this.props.RESETCHARACTER()
        this.props.history.push('/step1')
    }

    render(){
        return (
            <div className="stepInner">
                <button onClick={this.setCharacter}>New Character</button>    
                <Link to="/adminDashboard"><button>Admin Dashboard</button></Link>    
                <Link to="/viewCharacters"><button>View Characters</button></Link>    
            </div>
        )
    }
}

export default connect(function(){return{}}, {RESETCHARACTER})(Home)
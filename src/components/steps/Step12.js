import React, {Component} from 'react'

import {connect} from 'react-redux'
import {SETRECORD} from '../../dux/reducer'

class Step12 extends Component {

    saveStuff = () => {
        this.props.SETRECORD()
        this.props.history.push('/step13')
    }

    render(){
        return(
            <div>
                <h1>Step 12</h1>
                <h2>Record Stuff</h2>

                <button onClick={this.saveStuff}>Save</button>
            </div>
        )
    }
}

export default connect(function(){return{}},{SETRECORD})(Step12)
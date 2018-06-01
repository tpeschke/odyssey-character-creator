import React, {Component} from 'react'

import {connect} from 'react-redux'
import {SETQFS} from '../../dux/reducer'

class Step9 extends Component {

    //DATABASE CALL

    saveQuirks = () => {
        this.props.SETQFS([])
        this.props.history.push('/step10')
    }

    render(){
        return(
            <div>
                <h1>Step 9</h1>
                <h2>Quirks & Flaws</h2>

                <button onClick={this.saveQuirks}>Save</button>                
            </div>
        )
    }
}

export default connect(function(){return {}}, {SETQFS})(Step9)
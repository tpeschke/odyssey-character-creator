import React, {Component} from 'react'

import {connect} from 'react-redux'
import {SETQFS, DEDUCTBP} from '../../../dux/reducer'

import RollQuirkTable from './RollQuirkTable'

class Step9 extends Component {

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

                <RollQuirkTable DEDUCTBP={this.props.DEDUCTBP}/>                
            </div>
        )
    }
}

export default connect(function(){return {}}, {SETQFS, DEDUCTBP})(Step9)
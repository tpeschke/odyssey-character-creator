import React, {Component} from 'react'

import {connect} from 'react-redux'
import {SETPRIORS} from '../../dux/reducer'

class Step8 extends Component {

    savePriors = () => {
        this.props.SETPRIORS([])
        this.props.history.push('/step9')
    }

    render(){
        return(
            <div>
                <h1>Step 8</h1>
                <h2>Priors & Particulars</h2>
                <button onClick={this.savePriors}>Save</button>
            </div>
        )
    }
}

export default connect(function(){return{}},{SETPRIORS})(Step8)
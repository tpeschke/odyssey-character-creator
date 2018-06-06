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
            <div className='StepOuter'>
                <div className='stepBody'>
                <div className="stepTitle">
                <h1>Step 8: Determine Priors & Particulars</h1>
                </div>

                <div className="stepInner">
                <button onClick={this.savePriors}>Save</button>
                </div>
                </div>
            </div>
        )
    }
}

export default connect(function(){return{}},{SETPRIORS})(Step8)
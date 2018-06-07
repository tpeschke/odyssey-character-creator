import React, {Component} from 'react'

import {connect} from 'react-redux'
import {SETEQUIPMENTS} from '../../dux/reducer'

class Step14 extends Component {

    saveStuff = () => {
        this.props.SETEQUIPMENTS([])
        this.props.history.push('/step15')
    }

    render(){
        return(
            <div className='StepOuter'>
                <div className='stepBody'>
                <div className="stepTitle">
                <h1>Step 14: Goods & Equipment</h1>
            </div>
            <div className="stepInner">
                <button onClick={this.saveStuff}>Save</button>
            </div>
            </div>
            </div>
        )
    }
}

export default connect(function(){return{}},{SETEQUIPMENTS})(Step14)
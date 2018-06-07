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
            <div className='StepOuter'>
                <div className='stepBody'>
                <div className="stepTitle">
                <h1>Step 12: Record Stuff</h1>
            </div>
                
                <div className="stepInner">
                <button onClick={this.saveStuff}>Save</button>
                </div>                
                </div>                
            </div>
        )
    }
}

export default connect(function(){return{}},{SETRECORD})(Step12)
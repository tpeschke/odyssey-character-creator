import React, {Component} from 'react'

import { connect } from 'react-redux'
import { SETBP } from '../../dux/reducer'

class Step1 extends Component {
    componentDidMount() {
        this.props.SETBP(40)
    }

    render() {
        return (
            <div className='StepOuter'>
                <div className='stepBody'>
                <div className="stepTitle">
                    <h1>Step 1: Recieve Building Points</h1>
                </div>
                <div className="stepInner">
                    <p className='stepDescription'>Each character gets 40 BPs</p>
                    <button onClick={_=> this.props.history.push('/step2')}>Step 2</button> 
                </div> 
                </div>
            </div>
        )
    }
}

export default connect(function(){return {}}, {SETBP})(Step1)
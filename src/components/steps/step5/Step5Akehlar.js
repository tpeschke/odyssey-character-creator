import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SETBACKGROUND } from '../../../dux/reducer'

class Step5Akehlar extends Component {

    setBackground = () => {
        this.props.SETBACKGROUND({id: "AKEH", price: 0, name: "NONE"})
        this.props.history.push('/step6')
    }

    render() {
        return (
                <div className='StepOuter'>

                    <div className='stepBody'>
                        <div className="stepTitle">
                            <h1>Step 4: Arrange Ability Scores</h1>
                        </div>

                        <div className="stepInner">
                            <h2>Akehlarians don't receive a Background</h2>

                            <button onClick={this.setBackground}>Okay, this one really hurt but that's okay</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default connect(_=>{{}},{SETBACKGROUND})(Step5Akehlar)
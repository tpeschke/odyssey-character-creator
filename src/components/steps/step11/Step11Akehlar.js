import React, { Component } from 'react'

export default class Step11Akehlar extends Component {

    render() {
        return (
            <div className='StepOuter'>

                <div className='stepBody'>
                    <div className="stepTitle">
                        <h1>Step 11: Akehlarians Spore Count</h1>
                    </div>

                    <div className="stepInner">
                        <h3>Spore Count</h3>
                        <p>6</p>
<br/>
                        <h3>Base Size</h3>
                        <p>5</p>

                        <button onClick={this.setBackground}>Thanks for doing that math</button>
                    </div>
                </div>
            </div>
        )
    }
}
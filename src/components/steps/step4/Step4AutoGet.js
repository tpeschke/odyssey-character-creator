import React, {Component} from 'react'

export default class Step4AutoGet extends Component {
    saveScores = () => {
        this.props.SETBP(90)
        this.props.pushHistory('/step5')
    }

    render() {
        return( <div className='StepOuter'>

        <div className='stepBody'>
        <div className="stepTitle">
            <h1>Step 4: Arrange Ability Scores</h1>
        </div>

        <div className="stepInner">
            <h2>{this.props.species}s automatically get 50 BPs</h2>
            
            <button onClick={this.saveScores}>That's Cool!</button>
        </div> 
        </div>   
    </div>)
    }
}
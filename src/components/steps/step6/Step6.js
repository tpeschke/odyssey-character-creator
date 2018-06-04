import React, {Component} from 'react'

import {connect} from 'react-redux'
import {SETSCORES} from '../../../dux/reducer'

import Step6Swap from './Step6Swap'
import Step6ExtraBP from './Step6ExtraBP'
import Step6SpendBP from './Step6SpendBP'

class Step6 extends Component {
    constructor() {
        super()

        this.state = {
            scores: [],
            choice: 3
        }
    }

    componentDidMount() {
        let tempArr = this.props.scores.map(val => {
            let tempSplit = val.score.split('.')
            return {id: val.id, title: val.title, fullScore: tempSplit[0], percent: tempSplit[1]}
        })
        this.setState({scores: tempArr})
    }

    saveScores = (newScores) => {
        let finalScores = newScores.map(val => {
            let {fullScore, percent, id, title} = val
            return {id, title, score: fullScore + '.' + percent}
        })
        this.props.SETSCORES(finalScores, 'finalize')
        this.props.history.push('/step7')
    }


    render() {
        return (
            <div className='StepOuter'>
                <div className='stepBody'>
                <div className="stepTitle">
                <h1>Step 6: Finalize Scores</h1>
                    </div>
                    <div className="stepInner">
                <button onClick={_=>this.setState({choice: 1})}>Generate Ability Points</button>
                <button onClick={_=>this.setState({choice: 2})}>Generate Extra BPs</button>
                <button onClick={_=>this.setState({choice: 3})}>Spend BPs On Increases</button>

                {this.state.choice === 1 ? <Step6Swap scores={this.state.scores} saveScores={this.saveScores}/> : <div></div>}               
                {this.state.choice === 2 ? <Step6ExtraBP scores={this.state.scores} saveScores={this.saveScores}/> : <div></div>}               
                {this.state.choice === 3 ? <Step6SpendBP scores={this.state.scores} bp={this.props.bp} saveScores={this.saveScores}/> : null}               
                </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {scores, bp} = state

    return {
        scores,
        bp
    }
}
export default connect(mapStateToProps, {SETSCORES})(Step6)
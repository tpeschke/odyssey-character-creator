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
        // [{id: 1, title: 'STR', score: '13.4'}, {id: 2, title: 'INT', score: '8.56'},{id: 3, title: 'WIS', score: '10.05'},{id: 4, title: 'DEX', score: '13.6'},{id: 5, title: 'CON', score: '6.75'},{id: 6, title: 'CHA', score: '6.76'}, {id: 7, title: 'LKS', score: '18.89'}]
        this.props.SETSCORES(finalScores)
        this.props.history.push('/step7')
    }


    render() {
        return (
            <div>
                <h1>Step 6</h1>

                <button onClick={_=>this.setState({choice: 1})}>Generate Ability Points</button>
                <button onClick={_=>this.setState({choice: 2})}>Generate Extra BPs</button>
                <button onClick={_=>this.setState({choice: 3})}>Spend BPs On Increases</button>

                {this.state.choice === 1 ? <Step6Swap scores={this.state.scores} saveScores={this.saveScores}/> : <div></div>}               
                {this.state.choice === 2 ? <Step6ExtraBP scores={this.state.scores} saveScores={this.saveScores}/> : <div></div>}               
                {this.state.choice === 3 ? <Step6SpendBP scores={this.state.scores} bp={this.props.bp} saveScores={this.saveScores}/> : null}               
                
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
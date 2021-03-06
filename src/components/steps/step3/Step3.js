import React, {Component} from 'react'

import { connect } from 'react-redux'
import { SETSCORES } from '../../../dux/reducer'

import {rollScore, rollPercent} from '../../recycle/roll'
import Step3Ghost from './step3Ghost'

class Step3 extends Component {
    constructor() {
        super()

        this.state = {
            scores: [],
            choice: null
        }
    }

//ALSO DO IF STATEMENT FOR xx.100
//SHOPKEEP

    componentDidMount() {
        this.setState({
            scores: [   {id: 1, title: 'STR', score: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent()}, 
                        {id: 2, title: 'INT', score: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent()},
                        {id: 3, title: 'WIS', score: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent()},
                        {id: 4, title: 'DEX', score: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent()},
                        {id: 5, title: 'CON', score: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent()},
                        {id: 6, title: 'CHA', score: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent()}, 
                        {id: 7, title: 'LKS', score: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent()}]
        })
    }
    
    saveScores = () => {
        if (this.state.choice && this.props.species === 'Ghost') {
            let tempScores = this.state.scores.map(val => {
                if (val.title === 'STR') {
                    let tempScore = val.score.split('.')
                    val.score = +tempScore[0] - 4 + '.' + +tempScore[1]
                } else if (val.title === 'CON') {
                    let tempScore = val.score.split('.')
                    val.score = +tempScore[0] - 6 + '.' + +tempScore[1]
                } else if (val.title === this.state.choice || val.title === 'CHA') {
                    let tempScore = val.score.split('.')
                    val.score = +tempScore[0] + 3 + '.' + +tempScore[1]
                }
                return val
            })
            this.props.SETSCORES(tempScores)
            this.props.history.push('/step4')
        } else if (this.props.species !== 'Ghost') {
            this.props.SETSCORES(this.state.scores)
            this.props.history.push('/step4')
        }
    }

    setChoice = (param) => {
        this.setState({choice: param})
    }

    render() {
        return (
            <div className='StepOuter'>

                <div className='stepBody'>
                <div className="stepTitle">
                    <h1>Step 3: Roll Ability Scores</h1>
                </div>

                <div className="stepInner">
                    <div className='scoreDisplay'>
                    {this.state.scores.map(val => {
                        return (
                            <div key={val.id} className="adjustment">
                                <h2>{val.title}</h2>
                                <div className="scoreUnderscore"/>
                                <p className="scoreScore">{val.score}</p>
                            </div>
                        )
                    })}
                    </div>

                    {this.props.species === 'Ghost' ? <Step3Ghost choice={this.state.choice} setChoice={this.setChoice}/> : <div></div>}

                    <button onClick={this.saveScores}>Save Scores</button>
                </div> 
                </div>   
            </div>
        )
    }
}

export default connect(function(state){return{species: state.species.species}},{SETSCORES})(Step3)
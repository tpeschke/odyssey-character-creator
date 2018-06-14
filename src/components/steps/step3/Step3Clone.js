import React, {Component} from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { SETSCORES } from '../../../dux/reducer'

import {rollScore, rollPercent} from './../../roll'
import SetDice from './cloneComp/SetDice'
import ShowRolls from './cloneComp/ShowRolls'

class Step3Clone extends Component {
    constructor() {
        super()

        this.state = {
            scores: null,
            dice: [ {id: 1, title: 'STR', num: 3, sides: 6}, 
                    {id: 2, title: 'INT', num: 3, sides: 6},
                    {id: 3, title: 'WIS', num: 3, sides: 6},
                    {id: 4, title: 'DEX', num: 3, sides: 6},
                    {id: 5, title: 'CON', num: 3, sides: 6},
                    {id: 6, title: 'CHA', num: 3, sides: 6}, 
                    {id: 7, title: 'LKS', num: 3, sides: 6}],
            increases: 0
        }
    }

    lowerStat = (id) => {
        let tempArr = _.cloneDeep(this.state.dice)
        let holdNum = this.state.increases

        tempArr.forEach(v => {
            if (id === v.id && v.sides !== 4) {
                if (v.sides === 20) {
                    v.sides = 12
                } else {
                    v.sides-=2
                }
                holdNum+=1
            }
        })

        this.setState({dice: tempArr, increases: holdNum})
    }

    raiseStat = (id) => {
        let tempArr = _.cloneDeep(this.state.dice)
        let holdNum = this.state.increases

        tempArr.forEach(v => {
            if (id === v.id && v.sides !== 20 && holdNum > 0) {
                if (v.sides < 12) {
                    v.sides+=2
                } else {
                    v.sides = 20
                }
                holdNum-=1
            }
        })

        this.setState({dice: tempArr, increases: holdNum})
    }

    rollScores = () => {
        let tempID = 0

        let tempArr = this.state.dice.map(v => {
            return {id: v.id, title: v.title, score: rollScore(v.num,v.sides).reduce((t,n)=> t+n) + '.' + rollPercent()}
        })

        this.setState({scores: tempArr})
    }

    saveScores = () => {
            this.props.SETSCORES(this.state.scores)
            this.props.history.push('/step4')
    }

    render() {
        return(
            <div className='StepOuter'>

                <div className='stepBody'>
                <div className="stepTitle">
                    <h1>Step 3: Roll Ability Scores</h1>
                </div>

                <div className="stepInner">
                    
                {this.state.scores ? <ShowRolls scores={this.state.scores}
                                                saveScores={this.saveScores}/> 
                                    : <SetDice 
                                                dice={this.state.dice}
                                                increases={this.state.increases}
                                                lowerStat={this.lowerStat}
                                                raiseStat={this.raiseStat}
                                                rollScores={this.rollScores}/>
                    }    
                </div>
            </div>   
            </div>
        )
    }
}

export default connect(function(){return{}}, {SETSCORES})(Step3Clone)
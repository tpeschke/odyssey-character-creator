import React, {Component} from 'react'

import { connect } from 'react-redux'
import { SETSCORES } from '../../../dux/reducer'

import {rollScore, rollPercent} from './../../roll'

class Step3 extends Component {
    constructor() {
        super()

        this.state = {
            scores: []
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

    componentWillUnmount() {
    }
    
    saveScores = () => {
        this.props.SETSCORES(this.state.scores)
        this.props.history.push('/step4')
    }

    render() {
        return (
            <div>
                <h1>Step3</h1>
                
                {this.state.scores.map(val => {
                    return (
                        <div key={val.id}>
                            <h2>{val.title}</h2>
                            <p>{val.score}</p>
                        </div>
                    )
                })}
    
                <button onClick={this.saveScores}>Save Score</button>    
            </div>
        )
    }
}

export default connect(function(){return{}},{SETSCORES})(Step3)
import React, {Component} from 'react'

export default class SetDice extends Component {
    render() {
        return (
            <div>
                    <h1>Increases: {this.props.increases}</h1>
    
                    <div className='scoreDisplay'>
                        {this.props.dice.map(val => {
                            return (
                                <div key={val.id} className="adjustment">
                                    <h2>{val.title}</h2>
                                    <button onClick={_=>this.props.raiseStat(val.id)}>+</button>
                                    <p>{val.num}</p><p>d</p><p>{val.sides}</p>
                                    <button onClick={_=>this.props.lowerStat(val.id)}>-</button>
                                </div>
                            )
                        })}
                        </div>
                <button onClick={this.props.rollScores}>Roll Scores</button>
            </div>
        )
    }
} 
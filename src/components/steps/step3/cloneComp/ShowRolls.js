import React, {Component} from 'react'

export default class ShowRolls extends Component {

    render(){
        return(
            <div>
                 <div className='scoreDisplay'>
                    {this.props.scores.map(val => {
                        return (
                            <div key={val.id} className="adjustment">
                                <h2>{val.title}</h2>
                                <div className="scoreUnderscore"/>
                                <p className="scoreScore">{val.score}</p>
                            </div>
                        )
                    })}
                    </div>

                <button onClick={this.props.saveScores}>Save Scores</button>
            </div>
        )
    }
}
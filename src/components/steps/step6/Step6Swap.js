import React, {Component} from 'react'

import _ from 'lodash'

//NEEDS TO HAVE A COST TO ADJUST TABLE
//NEED TO MAKE IT SO YOU CAN ONLY TAKE FROM ONE ABILITY AT A TIME

export default class Step6Swap extends Component {
    constructor() {
        super()

        this.state = {
            scores: [],
            spare: 0
        }
    }

    componentWillMount() {
        let tempArr = _.cloneDeep(this.props.scores)
        this.setState({scores: tempArr})
    }

    componentWillReceiveProps(next) {
        let tempArr = _.cloneDeep(next.scores)
        this.setState({scores: tempArr})
    }

    addToScore = (id) => {
        let {scores, spare} = this.state
        let tempArr = scores.slice()
        let i = scores.map(v => v.id).indexOf(id)
        
        if (scores[i].fullScore >= 17 && spare >= 5) {
            tempArr[i].fullScore = +tempArr[i].fullScore + 1
            if (scores[i].fullScore <= 20) {
                this.setState({scores: tempArr, spare: spare-=5})
            }
        } else if (scores[i].fullScore >= 14 && spare >= 4) {
            tempArr[i].fullScore = +tempArr[i].fullScore + 1
            this.setState({scores: tempArr, spare: spare-=4})
        } else if (scores[i].fullScore >= 11 && spare >= 3) {
            tempArr[i].fullScore = +tempArr[i].fullScore + 1
            this.setState({scores: tempArr, spare: spare-=3})
        } else if (scores[i].fullScore >= 8 && spare >= 2) {
            tempArr[i].fullScore = +tempArr[i].fullScore + 1
            this.setState({scores: tempArr, spare: spare-=2})
        } else if (scores[i].fullScore < 8 && spare >= 0) {
            tempArr[i].fullScore = +tempArr[i].fullScore + 1
            this.setState({scores: tempArr, spare: spare-=1})
        }
    }

    minusToScore = (id) => {
        let {scores, spare} = this.state
        let tempArr = scores.slice()
        let i = scores.map(v => v.id).indexOf(id)

        tempArr[i].fullScore = +tempArr[i].fullScore - 1

        if (scores[i].fullScore >= 3) {
            this.setState({scores: tempArr, spare: spare+=1})
        }
    }

    checkScore = (score, id) => {
        if (score !== 'LKS') {
            return (
                <div>
                        <button onClick={_=>this.addToScore(id)}>+</button>
                        <button onClick={_=>this.minusToScore(id)}>-</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <button onClick={_=>this.props.saveScores(this.state.scores)}>Save</button>
                <h2  className="finalizeScoreBP">Spare Increases Left</h2>
                <h2>{this.state.spare}</h2>
                <div className="scoreUnderscore step6Underscore"/>                

                <div className="statBasket">
            {this.state.scores.map(val => {
                return (
                    <div key={val.id} className='statCard'>
                        <h2 className="statTitle">{val.title}</h2>
                        <div className="scoreUnderscore"/>
                        
                        <div className="statScore">
                        <p>{val.fullScore}</p>
                        <p>.</p>
                        <p>{val.percent}</p>
                        </div>
                        
                        {this.checkScore(val.title, val.id)}
                    </div>
                )
            })}  
            </div>
           
            </div>
        )
    }
}
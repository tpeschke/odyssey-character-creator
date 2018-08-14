import React, { Component } from 'react'

import _ from 'lodash'

export default class Step6Swap extends Component {
    constructor() {
        super()

        this.state = {
            displayScores: [],
            bpSpent: 0,
            bpSave: [0, 0, 0, 0, 0, 0, 0]
        }
    }

    componentWillMount() {
        let tempArr = _.cloneDeep(this.props.scores)
        this.setState({ displayScores: tempArr })
    }

    componentWillReceiveProps(next) {
        let tempArr = _.cloneDeep(next.scores)
        this.setState({ displayScores: tempArr })
    }

    costToIncrease = (score) => {
        if (score < 10) {
            return 10
        } else if (score < 16) {
            return 5
        } else {
            return 3
        }
    }

    addToScore = (id, increase) => {
        let { displayScores, bpSpent } = this.state

        if (bpSpent < this.props.bp) {
            let tempArr = displayScores.slice()
            let i = displayScores.map(v => v.id).indexOf(id)

            tempArr[i].percent = +tempArr[i].percent + increase

            if (tempArr[i].percent >= 100) {
                tempArr[i].percent -= 100
                tempArr[i].fullScore = +tempArr[i].fullScore + 1
            }

            this.setState({ displayScore: tempArr, bpSpent: bpSpent + 1 })
        }
    }

    deductFromScore = (id, increase) => {
        let { displayScores, bpSpent } = this.state
        let { scores } = this.props
        let tempArr = displayScores.slice()
        let i = displayScores.map(v => v.id).indexOf(id)

        if (displayScores[i].percent != scores[i].percent || displayScores[i].fullScore != scores[i].fullScore) {

            tempArr[i].percent = +tempArr[i].percent - increase

            if (tempArr[i].percent <= 0) {
                tempArr[i].percent += 100
                tempArr[i].fullScore = +tempArr[i].fullScore - 1
            }

            this.setState({ displayScore: tempArr, bpSpent: --bpSpent })
        }
    }

    calculateCost = (id, score, num) => {
        let { displayScores, bpSpent } = this.state
        let tempClone = _.cloneDeep(displayScores)
        let tempArr = tempClone.map((v, i) => {
            if (v.id == id) {
                return { ...this.props.scores[i] }
            }
            return v
        })

        let index = tempArr.map(v => v.id).indexOf(id)

        for (var i = 0; i < num; i++) {
            if (bpSpent < this.props.bp) {

                tempArr[index].percent = +tempArr[index].percent + this.costToIncrease(score)

                if (tempArr[index].percent >= 100) {
                    tempArr[index].percent -= 100
                    tempArr[index].fullScore = +tempArr[index].fullScore + 1
                }
            }
        }

        if (num === 0) {
            this.setState({ displayScores: tempArr, bpSpent: bpSpent - this.state.bpSave[index] })
        } else {
            this.setState({ displayScores: tempArr, bpSpent: bpSpent + +num })
        }
        let tempSave = this.state.bpSave.slice().splice(index, 1, num)
    }


    render() {
        return (
            <div>
                <button onClick={_ => this.props.saveScores(this.state.displayScores)}>Save</button>

                <h2 className="finalizeScoreBP">BP Spent</h2>
                <h2>{this.state.bpSpent}</h2>
                <div className="scoreUnderscore step6Underscore" />

                <div className="statBasket">
                    {this.state.displayScores.map(val => {
                        return (
                            <div key={val.id} className='statCard'>
                                <h2 className="statTitle">{val.title}</h2>
                                <div className="scoreUnderscore" />

                                <div className="statScore">
                                    <p>{val.fullScore}</p>
                                    <p>.</p>
                                    <p>{val.percent}</p>
                                </div>

                                <p className="statIncrease">{`${this.costToIncrease(val.fullScore)} fractional/1 BP`}</p>
                                <button onClick={_ => this.addToScore(val.id, this.costToIncrease(val.fullScore))}>+</button>
                                <button onClick={_ => this.deductFromScore(val.id, this.costToIncrease(val.fullScore))}>-</button>

                                {/* <input onBlur={e=>this.calculateCost(val.id, val.fullScore, e.target.value)}/> */}
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
}
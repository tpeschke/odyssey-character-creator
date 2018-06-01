import React, {Component} from 'react'

import _ from 'lodash'

export default class Step6Swap extends Component {
    constructor() {
        super()

        this.state = {
            scores: [],
            bp: 0
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

    lowerScore = (id) => {
        let {scores} = this.state
        let tempArr = scores.slice()
        let i = scores.map(v => v.id).indexOf(id)

        tempArr[i].fullScore = +tempArr[i].fullScore - 1

        if (scores[i].fullScore >= 3) {
            this.setState({scores: tempArr, bp: this.state.bp + 20})
        }
    }

    render() {
        return (
            <div>
                <button onClick={_=>this.props.saveScores(this.state.scores)}>Save</button>
                <h2>Extra BP Gained</h2>
                <h2>{this.state.bp}</h2>
                
            {this.state.scores.map(val => {
                return (
                    <div key={val.id}>
                        <h2>{val.title}</h2>
                        <p>{val.fullScore}</p>
                        <p>.</p>
                        <p>{val.percent}</p>
                        <br/>
                        <button onClick={_=>this.lowerScore(val.id)}>-</button>
                    </div>
                )
            })}  

            </div>
        )
    }
}
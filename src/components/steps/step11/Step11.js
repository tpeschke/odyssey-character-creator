import React, { Component } from 'react'

import { connect } from 'react-redux'
import { SETHP } from '../../../dux/reducer'
import { rollScore } from './../../roll'

class Step11 extends Component {
    constructor() {
        super()

        this.state = {
            hp: null
        }
    }

    componentDidMount() {
        let { hp, species, scores } = this.props
        if (hp) {
            this.setState({ hp: hp })
        } else {
            let i = scores.map(val => val.title).indexOf('CON')
            let conScore = +scores[i].score.split('.')[0]

            switch (species.species) {
                case "Akhelarian":
                    this.props.history.push('/step11Akehlar')
                    break
                case "Clone":
                    this.setState({ hp: +rollScore(1, 6) + 10 + conScore })
                    break
                case "Droid":
                    this.setState({ hp: "I'll GET AROUND TO IT" })
                    break
                case "Ghost":
                    this.setState({ hp: +rollScore(1, 4) + 10 + conScore })
                    break
                case "Human":
                    this.setState({ hp: +rollScore(1, 6) + 10 + conScore })
                    break
                case "Hiven":
                    this.setState({ hp: "I'll GET AROUND TO IT" })
                    break
            }
        }
    }

    componentWillUnmount() {
        this.props.SETHP(this.state.hp)
    }

    render() {
        return (
            <div className='StepOuter'>
                <div className='stepBody'>
                    <div className="stepTitle">
                        <h1>Step 11: Roll Hit Points</h1>
                    </div>

                    <div className="stepInner">
                        <h2>Hit Points</h2>
                        <div className="scoreUnderscore step6Underscore" />
                        <p className="repStatDisplay">{this.state.hp}</p>
                        <div className="scoreUnderscore step6Underscore" />
                        <button onClick={_ => this.props.history.push('/step12')}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { species, scores, hp } = state

    return {
        species,
        scores,
        hp
    }
}

export default connect(mapStateToProps, { SETHP })(Step11)
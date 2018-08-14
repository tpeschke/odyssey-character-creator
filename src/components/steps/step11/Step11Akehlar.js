import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SETHP } from '../../../dux/reducer'

class Step11Akehlar extends Component {
    constructor() {
        super()

        this.state = {
            spores: null,
            size: null
        }
    }

    componentDidMount() {
        let { scores, profics, talents, special } = this.props

        let attrSpores = scores.reduce((t, v) => {
            if (v.title != "REP") {
                let score = v.score.split('.')
                score = score[0] + score[1]
                return t + Math.floor(+score / 10)
            }
                return t
        }, 0)
        let proficSpores = profics ? profics.reduce((t, v) => {
            return t + Math.floor(v.price / 2)
        }, 0) : 0
        let talentSpores = talents ? talents.reduce((t, v) => {
            return t + Math.floor(v.price / 2)
        }, 0) : 0
        let specialSpores = special ? special.reduce((total, val) => {
            let cost = val.atk.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0) + (val.def ? val.def.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0) : 0) + val.spd.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0) + val.dam.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0)
            return total + Math.floor(cost / 2)
        }, 0) : 0

        this.setState({ spores: attrSpores + proficSpores + talentSpores + specialSpores }, _ => {
            let x = this.state.spores
            switch (true) {
                case (x >= 1400000000000):
                    this.setState({ size: "Colossal" })
                    break
                case (x >= 1400000000):
                    this.setState({ size: "Enormous" })
                    break
                case (x >= 14400000):
                    this.setState({ size: "Giant" })
                    break
                case (x >= 144000):
                    this.setState({ size: "Huge" })
                    break
                case (x >= 28001):
                    this.setState({ size: "Huge" })
                    break
                case (x >= 7001):
                    this.setState({ size: "Large" })
                    break
                case (x >= 3001):
                    this.setState({ size: "Medium" })
                    break
                case (x >= 601):
                    this.setState({ size: "Small" })
                    break
                case (x >= 201):
                    this.setState({ size: "Tiny" })
                    break
                case (x >= 2):
                    this.setState({ size: "Diminutive" })
                    break
                case (x == 1):
                    this.setState({ size: "Fine" })
                    break
                default:
                    console.log('something')
            }
        })
    }

    componentWillUnmount () {
        this.props.SETHP(this.state.spores)
    }

    render() {
        return (
            <div className='StepOuter'>

                <div className='stepBody'>
                    <div className="stepTitle">
                        <h1>Step 11: Akehlarians Spore Count</h1>
                    </div>

                    <div className="stepInner">
                        <h3>Spore Count</h3>
                        <p>{this.state.spores}</p>
                        <br />
                        <h3>Base Size</h3>
                        <p>{this.state.size}</p>
                        <br />
                        <button onClick={_=>this.props.history.push('/step12')}>Thanks for doing that math</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { scores, skills, talents, profics, special } = state

    return {
        scores, skills, talents, profics, special
    }
}

export default connect(mapStateToProps, {SETHP})(Step11Akehlar)
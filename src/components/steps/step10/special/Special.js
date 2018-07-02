import React, { Component } from 'react'
import AddNew from './AddNew'
import WeaponDisplay from './WeaponDisplay'

import { connect } from 'react-redux'
import { SETSPECIALS, DEDUCTBP, ADDBP } from '../../../../dux/reducer'

import _ from 'lodash'

class Specializations extends Component {
    constructor() {
        super()

        this.state = {
            specials: []
        }
    }

    componentDidMount() {
        if (this.props.special) {
            this.setState({ specials: this.props.special })
        }
    }

    componentWillUnmount() {
        this.props.SETSPECIALS(this.state.specials)
    }

    createNewSpecial = (obj) => {
        let tempArr = _.cloneDeep(this.state.specials)
        this.setState({ specials: [...tempArr, obj] })
    }

    alterLevel = (weapon, level, thing) => {
        let tempArr = _.cloneDeep(this.state.specials)
        let stanBp = this.props.bp
        let ogBP = tempArr.reduce((total, val) => {
            return total = total + val.atk.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0) + (val.def ? val.def.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0) : 0) + val.spd.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0) + val.dam.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0)
        }, 0)

        this.props.ADDBP(ogBP)

        tempArr.forEach(v => {
            if (v.id === weapon) {
                v[thing][level] = !v[thing][level]
                if (v[thing][level] && !v[thing][level - 1]) {
                    for (let i = 0; i < level; i++) {
                        v[thing][i] = true
                    }
                }
                if (!v[thing][level] && v[thing][level + 1]) {
                    for (let i = level; i < 5; i++) {
                        v[thing][i] = false
                    }
                }
            }
        })

        let bpCost = tempArr.reduce((total, val) => {
            return total = total + val.atk.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0) + (val.def ? val.def.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0) : 0) + val.spd.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0) + val.dam.reduce((t, s, i) => s ? t += ((i + 1) * 8) : t, 0)
        }, 0)
        
        if (stanBp - bpCost >= 0) {
            this.props.DEDUCTBP(bpCost)
            this.setState({ specials: tempArr }, _ => this.props.SETSPECIALS(this.state.specials))
        } else {
            this.props.DEDUCTBP(ogBP)
        }
    }

    deleteSpecial = (id) => {
        let tempArr = _.cloneDeep(this.state.specials)

        tempArr.forEach((v, i) => {
            if (v.id === id) {
                tempArr.splice(i, 1)
            }
        })

        this.setState({ specials: tempArr }, _ => this.props.SETSPECIALS(this.state.specials))
    }

    changeName = (id, input) => {
        let tempArr = this.state.specials.map(v => {
            if (v.id === id) {
                v.name = input
            }
            return v
        })

        this.setState({ specials: tempArr }, _ => this.props.SETSPECIALS(this.state.specials))
    }

    render() {
        return (
            <div>

                {this.state.specials.map(val => <WeaponDisplay key={val.id}
                    val={val}
                    alterLevel={this.alterLevel}
                    deleteSpecial={this.deleteSpecial}
                    changeName={this.changeName} />)}

                <AddNew create={this.createNewSpecial} length={this.state.specials.length} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { special, bp } = state
    return {
        special,
        bp
    }
}

export default connect(mapStateToProps, { SETSPECIALS, DEDUCTBP, ADDBP })(Specializations)
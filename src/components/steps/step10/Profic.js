import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import { connect } from 'react-redux'
import { ADDBP, DEDUCTBP, SETPROFICS } from '../../../dux/reducer'


//MAKE SURE THINGS ARE DESELECTED WHEN THEIR PREREQS ARE

class Proficiencies extends Component {
    constructor() {
        super()

        this.state = {
            selected: [],
            list: null
        }
    }

    componentWillMount() {
        let tempArr = _.cloneDeep(this.props.proficList.proficiencies)
        if (this.props.profics && tempArr.length) {
            for (let i = tempArr.length - 1; i >= 0; i--) {
                this.props.profics.forEach(val => {
                    val.id === tempArr[i].id && val.name !== "Etiquette/Manners [Specific Culture]" ? tempArr.splice(i, 1) : null
                })
            }
            this.setState({ selected: this.props.profics, list: tempArr })
        } else {
            this.setState({ list: tempArr })
        }
    }

    componentWillReceiveProps(next) {
        if (!this.state.list) {
            let tempArr = _.cloneDeep(next.proficList.proficiencies)
            this.setState({ list: tempArr })
        }
    }

    componentWillUnmount() {
        this.props.SETPROFICS(this.state.selected)
    }

    selectProfic = (id) => {
        let { species } = this.props.species
        let tempArr = _.cloneDeep(this.state.list)
        let i = tempArr.map(v => v.id).indexOf(id)

        if (this.checkReq(tempArr, i) && this.props.bp - tempArr[i].price >= 0) {
            this.props.DEDUCTBP(species === 'Akehlarian' ? Math.floor(tempArr[i].price / 2) : tempArr[i].price)

            if (tempArr[i].multi === 'false') {
                let hold = tempArr.splice(i, 1)
                let tempSelected = _.cloneDeep(this.state.selected)
                tempSelected.push(...hold)
                tempSelected = _.sortBy(tempSelected, [p => p.name])
                this.setState({ selected: tempSelected, list: tempArr })
            } else {
                let tempSelected = _.cloneDeep(this.state.selected)
                tempSelected.push(this.state.list[i])
                tempSelected = _.sortBy(tempSelected, [p => p.name])
                this.setState({ selected: tempSelected, list: tempArr })
            }
        }
    }

    deselectProfic = (id) => {
        let { species } = this.props.species
        let tempArr = _.cloneDeep(this.state.selected)
        let i = tempArr.map(v => v.id).indexOf(id)

        this.props.ADDBP(species === 'Akehlarian' ? Math.floor(tempArr[i].price / 2) : tempArr[i].price)

        if (tempArr[i].multi === "false") {
            let hold = tempArr.splice(i, 1)
            let tempDeselected = _.cloneDeep(this.state.list)
            tempDeselected.push(...hold)
            tempDeselected = _.sortBy(tempDeselected, [p => p.name])
            this.setState({ list: tempDeselected, selected: tempArr })
        } else {
            tempArr.splice(i, 1)
            this.setState({ selected: tempArr })
        }

    }

    checkReq = (list, index) => {
        let pass = false
        if (list[index].preReq.length > 0) {
            list[index].preReq.forEach(v => {
                if (v.type === 'score') {
                    this.props.scores.forEach(s => {
                        v.name === s.title && v.score < s.score.split('.')[0] ? pass = true : null
                    })
                } else if (v.type === 'profic') {
                    this.state.selected.forEach(s => {
                        v.name === s.name.split(' ')[0] ? pass = true : null
                    })
                } else if (v.type === 'skill') {
                    pass = true
                }
            })
        } else {
            pass = true
        }

        return pass
    }

    render() {
        const { proficList, species } = this.props

        if (proficList && proficList.loading) {
            return (<div className="stepInner backgroundLoader" id="loading">
                <div className="loader">
                    <div className="part">
                        <div className="part">
                            <div className="part">
                                <div className="part">
                                    <div className="part"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        }

        if (proficList && proficList.error) {
            return (
                <div>
                    <p>Error</p>
                </div>
            )
        }

        if (this.state.list) {
            var renderedList = this.state.list.map((profic, i) => {
                return (<div key={`${profic.id + i}`}
                            className={profic.preReq.length > 0 ? "proficDisplayHolder bottomLine" : "proficDisplayHolder"} 
                            onClick={_ => this.selectProfic(profic.id)}>

                        <div className='proficInnerDisplayHolder'>
                            <p>{profic.name}</p>
                            <div className="stpCostDisplay">
                                <p>{species.species === 'Akehlarian' ? Math.floor(profic.price / 2) : profic.price}</p>
                                <p>BP</p>
                            </div>
                        </div>

                        <div>
                        </div>
                    </div>)
            })
        }

        return (
            <div>
                <h2 className="stpDisplaySectionHeader">Selected</h2>
                <div className="stpChoiceBasket">
                    {this.state.selected.map((profic, i) => {
                        return (<div key={`${profic.id + i}`}
                        className={profic.preReq.length > 0 ? "proficDisplayHolder bottomLine" : "proficDisplayHolder"} 
                        onClick={_ => this.deselectProfic(profic.id)}>

                    <div className='proficInnerDisplayHolder'>
                        <p>{profic.name}</p>
                        <div className="stpCostDisplay">
                            <p>{species.species === 'Akehlarian' ? Math.floor(profic.price / 2) : profic.price}</p>
                            <p>BP</p>
                        </div>
                    </div>
                        </div>
                        )
                    })}
                </div>

                <h2 className="stpDisplaySectionHeader">List</h2>
                <div className="stpChoiceBasket">
                    {renderedList}
                </div>
            </div>
        )
    }
}

const GET_PROFICIENCIES_QUERY = gql`
    query proficinciesQuery{
        proficiencies {
            id,
            name,
            price,
            multi,
            preReq {
                name,
                score,
                type
            }
        }
    }`

function mapStateToProps(state) {
    let { scores, profics, bp, species } = state

    return {
        scores,
        profics,
        bp,
        species
    }
}

const decoratedProficiencies = connect(mapStateToProps, { ADDBP, DEDUCTBP, SETPROFICS })(Proficiencies)

export default graphql(GET_PROFICIENCIES_QUERY, { name: 'proficList' })(decoratedProficiencies)
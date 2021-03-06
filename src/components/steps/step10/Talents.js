import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'
import Loading from '../../recycle/Loading'

import { connect } from 'react-redux'
import { ADDBP, DEDUCTBP, SETTALENTS } from '../../../dux/reducer'

class Talents extends Component {
    constructor() {
        super()

        this.state = {
            selected: [],
            list: null
        }
    }

    componentWillMount() {
        let tempArr = _.cloneDeep(this.props.talentList.talents)
        if (this.props.talents && tempArr.length) {
            for (let i = tempArr.length - 1; i >= 0; i--) {
                this.props.talents.forEach(val => {
                    val.id === tempArr[i].id ? tempArr.splice(i, 1) : null
                })
            }
            this.setState({ selected: this.props.talents, list: tempArr })
        } else {
            this.setState({ list: tempArr })
        }
    }

    componentWillReceiveProps(next) {
        if (!this.state.list) {
            let tempArr = _.cloneDeep(next.talentList.talents)
            this.setState({ list: tempArr })
        }
    }

    componentWillUnmount() {
        this.props.SETTALENTS(this.state.selected)
    }

    selectTalent = (id) => {
        let { species } = this.props.species
        let tempArr = _.cloneDeep(this.state.list)
        let i = tempArr.map(v => v.id).indexOf(id)


        if (this.props.bp - tempArr[i].price >= 0) {
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

    deselectTalent = (id) => {
        let { species } = this.props.species
        let tempArr = _.cloneDeep(this.state.selected)
        let i = tempArr.map(v => v.id).indexOf(id)

        this.props.ADDBP(species === 'Akehlarian' ? Math.floor(tempArr[i].price / 2) : tempArr[i].price)

        if (tempArr[i].multi === 'false') {
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

    render() {
        const { talentList, species } = this.props

        if (talentList && talentList.loading) {
            return (<div className="stepInner backgroundLoader" id="loading">
                <Loading />
            </div>)
        }

        if (talentList && talentList.error) {
            return (
                <div>
                    <p>Error</p>
                </div>
            )
        }

        if (this.state.list) {
            var renderedList = this.state.list.map(talent => {
                return (<div key={talent.id}
                    className='stpDisplayHolder'
                    onClick={_ => this.selectTalent(talent.id)}>
                    <p>{talent.name}</p>
                    <div className="stpCostDisplay">
                        <p>{species.species === 'Akehlarian' ? Math.floor(talent.price / 2) : talent.price}</p>
                        <p>BP</p>
                    </div>
                </div>
                )
            })
        }

        return (
            <div>

                <h2 className="stpDisplaySectionHeader">Selected</h2>

                <div className="stpChoiceBasket">
                    {this.state.selected.map((talent, i) => {
                        return (<div key={talent.id}
                            className='stpDisplayHolder'
                            onClick={_ => this.deselectTalent(talent.id)}>
                            <p>{talent.name}</p>
                            <div className="stpCostDisplay">
                                <p>{species.species === 'Akehlarian' ? Math.floor(talent.price / 2) : talent.price}</p>
                                <p>BP</p>
                            </div>
                        </div>)
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

const GET_TALENT_QUERY = gql`
    query TalentQuery{
        talents {
            id,
            name,
            price,
            multi
        }
    }`

function mapStateToProps(state) {
    var { talents, bp, species } = state
    return {
        talents,
        bp,
        species
    }
}

const decoratedTalents = connect(mapStateToProps, { ADDBP, DEDUCTBP, SETTALENTS })(Talents)

export default graphql(GET_TALENT_QUERY, { name: 'talentList' })(decoratedTalents)
import React, {Component} from 'react'

import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import {connect} from 'react-redux'
import {ADDBP, DEDUCTBP} from '../../../dux/reducer'

class Talents extends Component {
    constructor(){
        super()

        this.state = {
            selected: [],
            list: []
        }
    }

    componentWillMount() {
        let tempArr = _.cloneDeep(this.props.talentList.talents)
        if (this.props.talents) {
            for(let i = tempArr.length-1; i > 0; i--) {
                for (let x = 0; x < this.props.talents.length; x++) {
                        if (tempArr[i].id !== this.props.talents[x].id) {
                            tempArr.splice(i,1)
                        }
                }
            }
            this.setState({selected: this.props.talents, list: tempArr})
        } else {
            this.setState({list: tempArr})
        }
    }

    componentWillReceiveProps(next) {
        let tempArr = _.cloneDeep(next.talentList.talents)
        this.setState({list: tempArr})
    }

    componentWillUnmount() {
        this.props.setTalents(this.state.selected)
    }

    selectTalent = (id) => {
        let tempArr = _.cloneDeep(this.state.list)
        let i = tempArr.map(v => v.id).indexOf(id)

        if (tempArr[i].multi === 'false') {
            let hold = tempArr.splice(i,1)
            let tempSelected = _.cloneDeep(this.state.selected)
            tempSelected.push(...hold)
            tempSelected = _.sortBy(tempSelected, [p => p.name])
            this.setState({selected: tempSelected, list: tempArr})
        } else {
            console.log('hello')
        }
    }

    deselectTalent = (id) => {
        let tempArr = _.cloneDeep(this.state.selected)
        let i = tempArr.map(v => v.id).indexOf(id)

        if (tempArr[i].multi === 'false') {
            let hold = tempArr.splice(i,1)
            let tempDeselected = _.cloneDeep(this.state.list)
            tempDeselected.push(...hold)
            tempDeselected = _.sortBy(tempDeselected, [p => p.name])
            this.setState({list: tempDeselected, selected: tempArr})
        } else {
            console.log('hello')
        }
    }

    render() {
        const {talentList} = this.props

        if (talentList && talentList.loading) {
            return (<div>
                    <p>Loading</p>
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
                return (<div    key={talent.id}
                                className='dropDownBoxOutside'
                                onClick={_=>this.selectTalent(talent.id)}>
                            <h2>{talent.name}</h2>
                            <p>{talent.price}</p>
                        </div>
                )
            })
        }

        return(
            <div>
                <h2>Talents</h2>
                <h3>Selected</h3>
                {this.state.selected.map(talent => {
                    return (<div   key={talent.id}
                                    className='dropDownBoxOutside'
                                    onClick={_=>this.deselectTalent(talent.id)}>
                                <h2>{talent.name}</h2>
                                <p>{talent.price}</p>
                            </div>
                    )
                })}

                <br />

                <h3>List</h3>
                {renderedList}
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

const decoratedTalents = connect(function(){}, {ADDBP, DEDUCTBP})(Talents)

export default graphql(GET_TALENT_QUERY, {name: 'talentList'})(decoratedTalents)
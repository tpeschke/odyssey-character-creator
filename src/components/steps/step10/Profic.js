import React, {Component} from 'react'

import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import {connect} from 'react-redux'
import {ADDBP, DEDUCTBP, SETPROFICS} from '../../../dux/reducer'


//MAKE SURE THINGS ARE DESELECTED WHEN THEIR PREREQS ARE

class Proficiencies extends Component {
    constructor(){
        super()

        this.state = {
            selected: [],
            list: null
        }
    }

    componentWillMount() {
        let tempArr = _.cloneDeep(this.props.proficList.proficiencies)
        if (this.props.profics && tempArr.length) {
            for(let i = tempArr.length-1; i >= 0; i--) {
                this.props.profics.forEach(val => {
                    val.id === tempArr[i].id && val.name !== "Etiquette/Manners [Specific Culture]" ? tempArr.splice(i,1) : null
                })
            }
            this.setState({selected: this.props.profics, list: tempArr})
        } else {
            this.setState({list: tempArr})
        }
    }

    componentWillReceiveProps(next) {
        if (!this.state.list){ 
            let tempArr = _.cloneDeep(next.proficList.proficiencies)
            this.setState({list: tempArr})
        }
    }

    componentWillUnmount() {
        this.props.SETPROFICS(this.state.selected)
    }

    selectProfic = (id) => {
        let tempArr = _.cloneDeep(this.state.list)
        let i = tempArr.map(v => v.id).indexOf(id)
        
        if (this.checkReq(tempArr, i) && this.props.bp - tempArr[i].price >= 0) {
            this.props.DEDUCTBP(tempArr[i].price)

            if (tempArr[i].multi === 'false') {
                let hold = tempArr.splice(i,1)
                let tempSelected = _.cloneDeep(this.state.selected)
                tempSelected.push(...hold)
                tempSelected = _.sortBy(tempSelected, [p => p.name])
                this.setState({selected: tempSelected, list: tempArr})
            } else {
                let tempSelected = _.cloneDeep(this.state.selected)
                tempSelected.push(this.state.list[i])
                tempSelected = _.sortBy(tempSelected, [p => p.name])
                this.setState({selected: tempSelected, list: tempArr})
            }
        }
    }

    deselectProfic = (id) => {
        let tempArr = _.cloneDeep(this.state.selected)
        let i = tempArr.map(v => v.id).indexOf(id)

        this.props.ADDBP(tempArr[i].price)
  
        if (tempArr[i].name !== 'Etiquette/Manners [Specific Culture]') {
            let hold = tempArr.splice(i,1)
            let tempDeselected = _.cloneDeep(this.state.list)
            tempDeselected.push(...hold)
            tempDeselected = _.sortBy(tempDeselected, [p => p.name])
            this.setState({list: tempDeselected, selected: tempArr})
        } else {
            tempArr.splice(i,1)
            this.setState({selected: tempArr})
        }

    }

    checkReq = (list, index) => {
        let pass = false
        if(list[index].preReq.length > 0){ 
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
        const {proficList} = this.props
        console.log(this.state)
        if (proficList && proficList.loading) {
            return (<div>
                    <p>Loading</p>
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
                return (<div    key={profic.id + i}
                                className='dropDownBoxOutside'
                                onClick={_=>this.selectProfic(profic.id)}>
                            <h2>{profic.name}</h2>
                            <p>{profic.price}</p>
                            <br/>
                            {profic.preReq.map((req, i) => {
                                return (<div key={`${req.id} + ${i}`}>
                                            <p>{req.name}</p>
                                            <p>{req.score > 0 ? req.score : null}</p>
                                        </div>)
                            })}
                        </div>
                )
            })
        }

        return(
            <div>
                <h2>Proficiencies</h2>
                <h3>Selected</h3>
                {this.state.selected.map((profic, i) => {
                    return (<div   key={profic.id + i}
                                    className='dropDownBoxOutside'
                                    onClick={_=>this.deselectProfic(profic.id)}>
                                <h2>{profic.name}</h2>
                                <p>{profic.price}</p>
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

function mapStateToProps (state) {
    let {scores, profics, bp} = state

    return {
        scores,
        profics,
        bp
    }
}

const decoratedProficiencies = connect(mapStateToProps, {ADDBP, DEDUCTBP, SETPROFICS})(Proficiencies)

export default graphql(GET_PROFICIENCIES_QUERY, {name: 'proficList'})(decoratedProficiencies)
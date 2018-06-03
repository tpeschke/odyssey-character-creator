import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import {rollScore} from './../../roll'
import RollQuirk from './RollQuirk'

class RollQuirks extends Component {
    constructor() {
        super()

        this.state = {
            roll: 0,
            table: null,
            show: false,
            quirkRoll: 0
        }
    }
    
    componentDidMount() {
        this.setState({roll: rollScore(1,20)[0]})
    }

    componentWillReceiveProps(next) {
        this.showWhichTable(next.QFTable.quirksNFlaws)
    }

    showWhichTable = (param) => {
        let { roll } = this.state
        if (param) {
            param.forEach(v => {
                if (roll > v.rangestart && roll < v.rangeend) {
                    this.setState({table: v})
                }
            })
        }
    }

    rerollTable = () => {
        this.props.DEDUCTBP(1)
        this.setState({roll: rollScore(1,20)[0]}, _=> {
            this.showWhichTable(this.props.QFTable.quirksNFlaws)
        })
    }

    rollForQuirk = () => {
        this.setState({quirkRoll: rollScore(1,1000)[0], show: true})
    }

    hideQuirk = () => {
        this.setState({show: false, roll: rollScore(1,20)[0]})
    }

    render() {
        let {QFTable} = this.props
        if (QFTable && QFTable.loading) {
            return (<div>
                        <p>Loading</p>
                    </div>)
        }

        if (QFTable && QFTable.error) {
            return (<div>
                        <p>Error</p>
                    </div>)
        }

        const showButton = !this.state.show ? ( <div><button onClick={this.rerollTable}>Reroll</button>
                                                    <button onClick={this.rollForQuirk}>Roll on Table</button></div>
                                                    ) : <div></div>

        return (
            <div>
                {this.state.roll}
                <br/>
                {QFTable.quirksNFlaws.map(v => {
                    if (this.state.roll > v.rangestart && this.state.roll < v.rangeend) {
                        return v.name
                    }
                })}
                <br/>        
                {showButton}
                <br/>

                {this.state.show ? <RollQuirk 
                                        roll={this.state.quirkRoll}
                                        table={this.state.table}
                                        rollForQuirk={this.rollForQuirk}
                                        DEDUCTBP={this.props.DEDUCTBP}
                                        ADDQUIRK={this.props.ADDQUIRK}
                                        hideQuirk={this.hideQuirk}/> : <div></div>}
            
            </div>
        )
    }
}

const GET_QF_TABLE_QUERY = gql`
    query GFTableQuery{
        quirksNFlaws {
            id,
            name,
            rangestart,
            rangeend
        }
    }`
    
export default graphql(GET_QF_TABLE_QUERY, {name: 'QFTable'})(RollQuirks)
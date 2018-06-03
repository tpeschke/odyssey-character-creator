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
            table: null
        }
    }
    
    componentDidMount() {
        this.setState({roll: rollScore(1,20)[0]}, this.showWhichTable)
    }

    componentWillReceiveProps(next) {
        this.showWhichTable()
    }

    showWhichTable = () => {
        let { roll } = this.state
        let { QuirksNFlaws: tables } = this.props.QFTable

        if (tables) {
            tables.forEach(v => {
                if (roll > v.rangestart && roll < v.rangeend) {
                    this.setState({table: v})
                }
            })
        }
    }

    rerollTable = () => {
        this.props.DEDUCTBP(1)
        this.setState({roll: rollScore(1,20)[0]}, this.showWhichTable)
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

        return (
            <div>
                {this.state.roll}
                <br/>
                {this.state.table ? this.state.table.name : <div></div>}
                <br/>                
                <button onClick={this.rerollTable}>Reroll</button>
                <button>Roll on Table</button>
                <br/> 
                <br/> 
                <RollQuirk />
            </div>
        )
    }
}

const GET_QF_TABLE_QUERY = gql`
    query GFTableQuery{
        QuirksNFlaws {
            id,
            name,
            rangestart,
            rangeend
        }
    }`
    
export default graphql(GET_QF_TABLE_QUERY, {name: 'QFTable'})(RollQuirks)
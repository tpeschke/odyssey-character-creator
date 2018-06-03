import React, {Component} from 'react'
import {rollScore} from './../../roll'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

//this.props.QUERY.refetch

class RollQuirk extends Component {
    rerollQuirk = () => {
        this.props.DEDUCTBP(1)
        this.props.rollForQuirk()
    }

    keepQuirk = (quirk) => {
        this.props.hideQuirk()
        this.props.ADDQUIRK(quirk)
    }

    render() {
        this.props.QF.getQuirk ? console.log(this.props.QF.getQuirk[0]) : null
        return(
            <div>
                {this.props.roll}
                <br/>
                {this.props.QF.getQuirk ? this.props.QF.getQuirk[0].name : <div></div>}
                <br/>
                {this.props.QF.getQuirk ? this.props.QF.getQuirk[0].bp : <div></div>}
                <br/>
                <button onClick={_=>this.keepQuirk(this.props.QF.getQuirk[0])}>Keep Quirk</button>
                <button onClick={this.rerollQuirk}>Reroll</button>
            </div>
        )
    }
}

const GET_QUIRK = gql`
    query QFQuery ($roll: String!, $table: String!) {
        getQuirk (roll: $roll, table: $table) {
            id,
            name,
            bp
        }
    }`

export default graphql(GET_QUIRK, {
    name: 'QF', options: props => {
        return { 
            variables: { roll: `${props.roll}`, table: `${props.table.id}` } }
    }
}
)(RollQuirk)
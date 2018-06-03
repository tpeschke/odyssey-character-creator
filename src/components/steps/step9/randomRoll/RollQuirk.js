import React, {Component} from 'react'
import {rollScore} from './../../../roll'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class RollQuirk extends Component {
    rerollQuirk = () => {
        if(this.props.bp > 0){
        this.props.DEDUCTBP(1)
        this.props.rollForQuirk()
        }
    }

    keepQuirk = (quirk) => {
        this.props.hideQuirk()
        this.props.ADDQUIRK(quirk)
    }

    render() {
        let {QF, roll} = this.props

        if (QF && QF.loading) {
            return (<div>
                        <p>Loading</p>
                    </div>)
        }

        if (QF && QF.error) {
            return (<div>
                        <p>Error</p>
                    </div>)
        }
        return(
            <div>
                {roll}
                <br/>
                {QF.getQuirk ? QF.getQuirk[0].name : <div></div>}
                <br/>
                {QF.getQuirk ? QF.getQuirk[0].bp : <div></div>}
                <br/>
                <button onClick={_=>this.keepQuirk(QF.getQuirk[0])}>Keep Quirk</button>
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
            variables: { roll: `${props.roll}`, table: `${props.id}` } }
    }
}
)(RollQuirk)
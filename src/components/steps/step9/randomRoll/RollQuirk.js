import React, { Component } from 'react'
import { rollScore } from './../../../roll'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

//0 BP INDICATES A ROLL or RANGE FOR AMOUNT

class RollQuirk extends Component {
    rerollQuirk = () => {
        if (this.props.bp > 0) {
            this.props.DEDUCTBP(1)
            this.props.rollForQuirk()
        }
    }

    keepQuirk = (quirk) => {
        this.props.hideQuirk()
        this.props.ADDQUIRK(Object.assign({}, quirk, { table: this.props.table }))
    }

    render() {
        let { QF, roll } = this.props
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
        return (
            <div>

                <div className="quirkDisplay">
                    <div className="quirkTitleCard">
                        <p className="quirkItem">Roll</p>
                        <p className="quirkItem">Quirk</p>
                        <p className="quirkItem">BP Bonus</p>
                    </div>
                    <div className="quirkTitleBottom">
                        <p className="quirkItem">{roll}</p>
                        <p className="quirkItem">{QF.getQuirk ? QF.getQuirk[0].name : <div></div>}</p>
                        <p className="quirkItem">{QF.getQuirk ? QF.getQuirk[0].bp : <div></div>}</p>
                    </div>
                </div>

                <button onClick={_ => this.keepQuirk(QF.getQuirk[0])}>Keep Quirk</button>
                <button onClick={this.rerollQuirk}>Reroll</button>
            </div>
        )
    }
}

const GET_QUIRK = gql`
    query QFQuery ($roll: Int!, $table: Int!) {
        getQuirk (roll: $roll, table: $table) {
            id,
            name,
            bp
        }
    }`

export default graphql(GET_QUIRK, {
    name: 'QF', options: props => {
        return {
            variables: { roll: props.roll, table: props.table }
        }
    }
}
)(RollQuirk)
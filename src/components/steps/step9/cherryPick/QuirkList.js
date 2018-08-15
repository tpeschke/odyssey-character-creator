import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../../recycle/Loading'

class QuirkList extends Component {
    componentDidUpdate(next) {
        if (next.QF.variables.table !== this.props.QF.variables.table) {
            this.props.QF.refetch()
        }
    }

    selectQuirk = (quirk) => {
        let {ADDQUIRK} = this.props
        ADDQUIRK(quirk)
    }

    render() {
        let { QF, deduction } = this.props

        if (QF && QF.loading) {
            return (<div className="stepInner backgroundLoader" id="loading">
                <Loading />
            </div>
            )
        }

        if (QF && QF.error) {
            return (
                <div>Error</div>
            )
        }

        if (QF && !this.props.filter) {
            return (
                <div>
                    {QF.getAllQuirks.map(v => {
                        return (
                            <div key={v.id} onClick={_=>this.selectQuirk(v)}>
                                <p>{v.name}</p>
                                <p>{v.bp - (5 * (deduction + 1)) > 0 ? v.bp - (5 * (deduction + 1)) : 0}</p>
                            </div>
                        )
                    })}
                </div>
            )
        }

        return (
            <div>
                {QF.getAllQuirks.filter(v => v.bp - (5 * (deduction + 1)) > 0).map(v => {
                    return (
                        <div key={v.id} onClick={_=>this.selectQuirk(v)}>
                            <p>{v.name}</p>
                            <p>{v.bp - (5 * (deduction + 1)) > 0 ? v.bp - (5 * (deduction + 1)) : 0}</p>
                        </div>
                    )
                })}
            </div>
        )

    }
}

const GET_QUIRK = gql`
    query AllQuery ($table: Int!) {
        getAllQuirks (table: $table) {
            id,
            name,
            bp
        }
    }`

export default graphql(GET_QUIRK, {
    name: 'QF', options: props => {
        return {
            variables: { table: props.table }
        }
    }
}
)(QuirkList)
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class QuirkList extends Component {

    render() {
        let { QF } = this.props
        console.log(QF)

        if (QF && QF.loading) {
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
            </div>
            )
        }

        if (QF && QF.error) {
            return (
                <div>Error</div>
            )
        }

        return (
            <div>
                {QF.getAllQuirks.map(v => {
                    return (
                        <div key={v.id}>
                            <p>{v.name}</p>
                            <p>{v.bp}</p>
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
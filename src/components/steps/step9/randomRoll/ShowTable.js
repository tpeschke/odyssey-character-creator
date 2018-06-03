import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ShowTable extends Component {
    componentDidUpdate(next) {
        if (next.QFTables){
            this.props.setTable(next.QFTable.quirksNFlaws[0].id)
        }
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

        return(
            <div>
                {QFTable.quirksNFlaws[0].name}
            </div>
        )
    }
}

const GET_QF_TABLE_QUERY = gql`
    query GFTableQuery ($roll: String!){
        quirksNFlaws (roll: $roll) {
            id,
            name
        }
    }`

export default graphql(GET_QF_TABLE_QUERY, {
    name: 'QFTable', options: props => {
        return { 
            variables: { roll: `${props.roll}` } }
    }
}
)(ShowTable)
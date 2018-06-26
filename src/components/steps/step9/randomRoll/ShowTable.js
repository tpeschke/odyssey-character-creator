import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ShowTable extends Component {
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

        if (QFTable.quirkTables[0].id !== this.props.table) {
            this.props.setTable(QFTable.quirkTables[0].id)
        }
        return(
            <div className="titleTableDisplay">
                {QFTable.quirkTables[0].name}
            </div>
        )
    }
}

const GET_QF_TABLE_QUERY = gql`
    query GFTableQuery ($roll: Int!){
        quirkTables (roll: $roll) {
            id,
            name
        }
    }`

export default graphql(GET_QF_TABLE_QUERY, {
    name: 'QFTable', options: props => {
        return { 
            variables: { roll: props.roll } }
    }
}
)(ShowTable)
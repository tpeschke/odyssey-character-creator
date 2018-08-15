import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../recycle/Loading'

class VaultBase extends Component {
    render() {
        const { charList } = this.props
        if (charList && charList.loading) {
            return (<div className="stepInner backgroundLoader" id="loading">
                <Loading />
            </div>)
        }

        if (charList && charList.error) {
            return (
                <div>
                    <p>Error</p>
                </div>
            )
        }

        return (
            <div>
                <div className="characterDisplay characterTitle">
                    <p>Name</p>
                    <p>Species</p>
                    <p>Background</p>
                </div>

                {charList.getAllCharacters.map(v => {
                    return (<div key={v.id}
                        onClick={_ => this.props.changePage(`/viewSingle/${v.id}`)}
                        className="characterDisplay">
                        <p>{v.name}</p>
                        <p>{v.species}</p>
                        <p>{v.background}</p>
                    </div>)
                })}
            </div>
        )
    }
}

const MY_CHARACTERS_QUERY = gql`
    query CharacterQuery {
        getAllCharacters {
            id,
            name,
            species,
            background
        }
    }`

export default graphql(MY_CHARACTERS_QUERY, { name: 'charList' })(VaultBase)
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import axios from 'axios'

class MyCharacters extends Component {
    deleteCharacter = (id,e) => {
        e.stopPropagation()
        axios.delete('/deleteCharacter/' + id).then(_ => {
            this.props.charList.refetch()
        })
    }

    render() {
        const { charList } = this.props
        if (charList && charList.loading) {
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
                    <p>Delete</p>
                </div>

                {charList.getMyCharacters.map(v => {
                    return (<div key={v.id} 
                                onClick={_=>this.props.changePage(`/viewSingle/${v.id}`)}  
                                className="characterDisplay">
                                <p>{v.name}</p>
                                <p>{v.species}</p>
                                <p>{v.background}</p>
                                <button onClick={e=>this.deleteCharacter(v.id,e)}>x</button>
                            </div>)
                })}

            </div>
        )
    }
}

const MY_CHARACTERS_QUERY = gql`
    query CharacterQuery {
        getMyCharacters {
            id,
            name,
            species,
            background
        }
    }`

export default graphql(MY_CHARACTERS_QUERY, { name: 'charList' })(MyCharacters)
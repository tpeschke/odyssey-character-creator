import React, { Component } from 'react'
import DisplayChar from '../../recycle/DisplayChar'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class SingleCharacter extends Component {

    render() {
        // let { species, scores, background, qf, talents, profics, special, credits, hp } = this.props
        console.log(this.props.character)
        return (
            <div className='StepOuter'>
                <div className='stepBody'>
                    <div className="stepTitle">
                        <h1>Character:</h1>
                    </div>

                    <div className="stepInner">
                        {/* <DisplayChar
                            species={species}
                            scores={scores}
                            background={background}
                            qf={qf}
                            talents={talents}
                            profics={profics}
                            special={special}
                            credits={credits}
                            hp={hp} /> */}
                    </div>
                </div>
            </div>
        )
    }
}

const GET_SINGLE_CHARACTER_QUERY = gql`
    query characterQuery ($id: Int!){
        getSingleCharacter (id: $id) {
            id,
            name,
            bp,
            species,
            scores,
            background,
            # talents,
            # profics,
            # special,
            hp,
            credits,
            # qf
        }
    }`

export default graphql(GET_SINGLE_CHARACTER_QUERY, {
    name: 'character', options: props => {
        return {
            variables: {id: +props.match.params.id }
        }
    }
})(SingleCharacter)
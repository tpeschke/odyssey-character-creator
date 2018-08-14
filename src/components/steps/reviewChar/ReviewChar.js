import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import DisplayChar from '../../recycle/DisplayChar'
import { FINISHCHARACTER } from '../../../dux/reducer'

class ReviewChar extends Component {
    constructor() {
        super()

        this.state = {
            name: null
        }
    }

    sendCharacterOff = () => {
        let { AddCharacter, species, background, special, credits, bp, hp } = this.props

        let scores = {}
        this.props.scores.forEach(v => scores = Object.assign({}, scores, { [v.title]: v.score }))
        scores = JSON.stringify(scores)

        let qf = []
        this.props.qf.forEach(v => qf.push({ id: v.id, table: v.table }))
        qf = JSON.stringify(qf)

        let talents = []
        this.props.talents ? this.props.talents.forEach(v => talents.push(v.id)) : null
        talents = JSON.stringify(talents)

        let profics = []
        this.props.profics ? this.props.profics.forEach(v => profics.push(v.id)) : null
        profics = JSON.stringify(profics)

        special = JSON.stringify(special)

        AddCharacter({
            variables: {
                bp,
                species: +species.id,
                background: +background.id,
                hp,
                credits,
                scores,
                qf,
                talents,
                special,
                name: this.state.name,
                profics
            }
        })
        this.props.FINISHCHARACTER()
        this.props.history.push('/home')
    }

    render() {
        let { species, scores, background, qf, talents, profics, special, credits, hp } = this.props

        return (
            <div className='StepOuter'>
                <div className='stepBody'>
                    <div className="stepTitle">
                        <h1>Review Character</h1>
                    </div>

                    <div className="stepInner">

                        <input placeholder="Character Name"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })} />

                        <button onClick={_ => this.state.name ? this.sendCharacterOff() : alert('Please enter character name')}>Looks Good to Me!</button>

                        <DisplayChar 
                            species = {species} 
                            scores = {scores} 
                            background = {background} 
                            qf = {qf}
                            talents = {talents}
                            profics = {profics} 
                            special = {special} 
                            credits = {credits} 
                            hp = {hp}/>

                    </div>
                </div>
            </div>
        )
    }
}



const CREATE_CHARACTER = gql`
    mutation AddCharacter($bp: Int!, $species: Int!, $background: Int!, $hp: Int!, $credits: Int!, $scores: String!, $qf: String!, $talents: String!, $special: String!, $name: String!, $profics: String!){
        addCharacter(bp: $bp, species: $species, background: $background, hp: $hp, credits: $credits, scores: $scores, qf: $qf, talents: $talents, special: $special, name: $name, profics: $profics) {
            bp,
            species,
            background,
            hp,
            credits,
            scores,
            qf,
            talents,
            special,
            name,
            profics
        }
    }`

function mapStateToProps(state) {
    return state
}

let decoratedReviewChar = connect(mapStateToProps, { FINISHCHARACTER })(ReviewChar)

export default graphql(CREATE_CHARACTER, { name: "AddCharacter" })(decoratedReviewChar)
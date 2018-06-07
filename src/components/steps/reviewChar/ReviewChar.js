import React, {Component} from 'react'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import WeaponReview from './WeaponReview'

class ReviewChar extends Component {
    sendCharacterOff = () => {
        let {AddCharacter, species, scores, background, qf, talents, profics, special, credits, bp, hp} = this.props

        AddCharacter({
            variables: {
                bp,
                species: +species.id,
                background: +background.id,
                hp,
                credits
            }
        })
    }

    render() {
        let {species, scores, background, qf, talents, profics, special, credits, hp} = this.props

        if (!species) {
            return (<div className='StepOuter'>
            <div className="stepInner backgroundLoader" id="loading">
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
        </div>)
        }

        return(
            <div className='StepOuter'>
                <div className='stepBody'>
                <div className="stepTitle">
                <h1>Review Character</h1>
            </div>
            <div className="stepInner">

                <button onClick={this.sendCharacterOff}>Looks Good to Me!</button>

                <h2>Species:</h2><p>{species.species}</p>
                <h2>Stats</h2>
                {scores ? scores.map(val => {
                        return (
                            <div key={val.id} className="adjustment">
                                <h2>{val.title}</h2>
                                <div className="scoreUnderscore"/>
                                <p className="scoreScore">{val.score}</p>
                            </div>
                        )
                    }) : <div></div>} 
                <h2>Background</h2><p>{background.name}</p>
                <h2>HP</h2><p>{hp}</p>
                <h2>Quirks & Flaws</h2> 
                {qf ? qf.map((v, i)=> {
                    return (<div    key={v.id} 
                                    className="quirkTitleBottom selectedQuirks">
                                <p className="quirkItem quirkName">{v.name}</p>
                            </div>
                            )
                        }) : <div></div>}
                <h2>Skills</h2>
                <h2>Talents</h2>
                {talents ? talents.map((talent, i) => {
                    return (<div   key={talent.id + i}
                                    className='stpDisplayHolder'
                                    onClick={_=>this.deselectTalent(talent.id)}>
                                <p className="stpChoiceHeader">{talent.name}</p>     
                            </div>
                    )
                }) : <div></div>}
                <h2>Proficienies</h2>
                {profics ? profics.map((profic, i) => {
                    return (<div   key={profic.id + i}
                                    className='stpDisplayHolder'
                                    onClick={_=>this.deselectProfic(profic.id)}>
                                <p  className="stpChoiceHeader">{profic.name}</p>
                            </div>
                    )
                }) : <div></div>}
                <h2>Specializations</h2>
                {special ? special.map(val => <WeaponReview key={val.id} val={val}/>) : <div></div>}
                <h2>Credits</h2><p>{credits}</p>
            </div>
            </div>
            </div>
        )
    }
}

const CREATE_CHARACTER = gql`
    mutation AddCharacter($bp: Int!, $species: Int!, $background: Int!, $hp: Int!, $credits: Int!){
        addCharacter(bp: $bp, species: $species, background: $background, hp: $hp, credits: $credits) {
            bp,
            species,
            background,
            hp,
            credits
        }
    }`

function mapStateToProps (state) {
    return state
}

let decoratedReviewChar = connect(mapStateToProps)(ReviewChar) 

export default graphql(CREATE_CHARACTER, {name: "AddCharacter"})(decoratedReviewChar)
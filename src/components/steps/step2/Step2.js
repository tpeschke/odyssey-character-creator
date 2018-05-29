import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import { connect } from 'react-redux'
import { SETSPECIES } from '../../../dux/reducer'

class Step2 extends Component {

    selectSpecies = (obj) => {
        this.props.SETSPECIES(obj)
        this.props.history.push('/step3')
    }

    render() {
        const {alienList} = this.props

        if (alienList && alienList.loading) {
            return (<div>
                        <h1>Step 2</h1>
                        <p>Loading</p>
                    </div>)
        }

        if (alienList && alienList.error) {
            return (<div>
                        <h1>Step 2</h1>
                        <p>Error</p>
                    </div>)
        }
        
        return (
            <div>
                <h1>Step 2</h1> 
                {alienList.aliens.map(alien => {
                    let paragraph = alien.description.split('/').map(para => <p>{para}</p>)
                    return      <div    key={alien.id} 
                                        className='dropDownBoxOutside'
                                        onClick={_=>this.selectSpecies({id: alien.id, species: alien.species})}>
                                    <h2>{alien.species}</h2>
                                    {paragraph}
                                </div>})}  
            </div>
        )
    }
}

const GET_ALIENS_QUERY = gql`
    query AlienQuery {
        aliens {
            id,
            species,
            description
        }
    }`

const decoratedStep2 = connect(function(){},{SETSPECIES})(Step2)

export default graphql(GET_ALIENS_QUERY, {name: 'alienList'})(decoratedStep2)
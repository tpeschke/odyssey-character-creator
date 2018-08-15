import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { connect } from 'react-redux'
import { SETSPECIES } from '../../../dux/reducer'
import Loading from '../../recycle/Loading'

class Step2 extends Component {
    constructor() {
        super()

        this.state = {
            description: ''
        }
    }

    selectSpecies = (obj) => {
        this.props.SETSPECIES(obj)
        if (obj.species === 'Clone') {
            this.props.history.push('/step3clone')
        } else {
            this.props.history.push('/step3')
        }
    }

    render() {
        const { alienList } = this.props

        if (alienList && alienList.loading) {
            return (<div className='StepOuter'>
                <div className='stepBody'>
                    <div className="stepTitle">
                        <h1>Step 2: Choose Species</h1>
                    </div>
                    <div className="stepInner" id="loading">
                        <Loading />
                    </div>
                </div>
            </div>)
        }

        if (alienList && alienList.error) {
            return (<div className='StepOuter'>
                <div className='stepBody'>
                    <div className="stepTitle">
                        <h1>Step 2: Choose Species</h1>
                    </div>
                    <p>Error</p>
                </div>
            </div>)
        }

        return (
            <div className='StepOuter'>
                <div className='stepBody'>
                    <div className="stepTitle">
                        <h1>Step 2: Choose Species</h1>
                    </div>

                    <div className="stepInner bodySpecies">
                        <div className="speciesCard">
                            {alienList.aliens.map(alien => {
                                return <div key={alien.id}
                                    className='speciesDropBox'
                                    onClick={_ => this.selectSpecies({ id: alien.id, species: alien.species })}
                                    onMouseEnter={_ => this.setState({ description: alien.description })}>

                                    <button className="speciesTitle">{alien.species}</button>

                                </div>
                            })}
                        </div>
                        <div className='speciesDesc'>
                            {this.state.description.split('/').map((para, i) => <p key={i} className="para">{para}</p>)}
                        </div>
                    </div>
                </div>
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

const decoratedStep2 = connect(function () { return {} }, { SETSPECIES })(Step2)

export default graphql(GET_ALIENS_QUERY, { name: 'alienList' })(decoratedStep2)
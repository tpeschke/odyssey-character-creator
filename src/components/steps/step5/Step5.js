import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { connect } from 'react-redux'
import { SETBACKGROUND, DEDUCTBP, ADDBP } from '../../../dux/reducer'

import _ from 'lodash'

class Step5 extends Component {

    saveBackground = (obj) => {
        let {selected, DEDUCTBP, SETBACKGROUND, ADDBP, history} = this.props
        if (selected) ADDBP(selected.price)
    
        DEDUCTBP(obj.price)
        SETBACKGROUND(obj)
        history.push('/step6')
    }

    render() {
        const { backgroundList, search, filter, price } = this.props
        let list = [];

        if (backgroundList && backgroundList.loading) {
            return (<div>
                <p>Loading</p>
            </div>)
        }

        if (backgroundList && backgroundList.error) {
            return (<div>
                <p>Error</p>
            </div>)
        }


        if (filter && price) {
            list = _.cloneDeep(backgroundList.backgrounds.filter(val => val.category === filter))
            list.sort((a,b)=>a.price-b.price)
        } else if (filter) {
            list = backgroundList.backgrounds.filter(val => val.category === filter)
        } else if (price){
            list = _.cloneDeep(backgroundList.backgrounds)
            list.sort((a,b)=>a.price-b.price)
        } else {
            list = backgroundList.backgrounds
        }

        return (
            <div>
                {list.map(val => {
                    let paragraph = val.description.split('/').map((para, i) => <p key={i}>{para}</p>)
                    return (<div key={val.id}
                        className='dropDownBoxOutside'
                        onClick={_ => this.saveBackground({id: val.id, price: val.price, name: val.name})}>
                        <h2>{val.name}</h2>
                        <p>{val.price}</p>
                        {paragraph}
                    </div>)
                })}
            </div>
        )
    }
}

const GET_BACKGROUNDS_QUERY = gql`
    query BackgroundQuery ($search: String!) {
        backgrounds (search: $search) {
            id,
            name,
            price,
            category,
            description
        }
    }`

function mapStateToMap(state) {
    return {
        selected: state.background,
        species: state.species
    }
}

const decoratedStep5 = connect(mapStateToMap, {SETBACKGROUND, DEDUCTBP, ADDBP})(Step5)

export default graphql(GET_BACKGROUNDS_QUERY, {
    name: 'backgroundList', options: props => {
        return {
            variables: { search: props.search }
        }
    }
}
)(decoratedStep5)
import React, { Component } from 'react'
import { graphql, Subscription } from 'react-apollo'
import gql from 'graphql-tag'
import { Bar } from 'react-chartjs-2'
import Loading from '../recycle/Loading'

class BackgroundBreakdown extends Component {
    constructor() {
        super()

        this.state = {
            backgrounds: {},
            rejects: []
        }
    }

    componentWillMount() {
        let { subscribeToMore } = this.props.backgroundList

        subscribeToMore({
            document: BACKGROUND_BREAK_SUB,
            updateQuery: _ => {
                this.props.backgroundList.refetch()
                this.formatList()
            }
        })
    }

    componentDidMount() {
        let { backgrounds } = this.props.backgroundList

        if (backgrounds) {
            this.formatList()
        }
    }

    componentWillReceiveProps(next) {
        let tempArr = []
        let tempData = {
            labels: [],
            datasets: [{
                label: 'Backgrounds',
                data: [],
                backgroundColor: '#a62020'
            }]
        }

        for (let i = 0; i < next.backgroundList.backgrounds.length; i++) {
            if (next.backgroundList.backgrounds[i].selected > 0) {
                tempData.labels.push(next.backgroundList.backgrounds[i].name)
                tempData.datasets[0].data.push(next.backgroundList.backgrounds[i].selected)
            } else {
                tempArr.push(next.backgroundList.backgrounds[i])
            }
        }

        this.setState({ backgrounds: tempData, rejects: tempArr })
    }

    formatList = () => {
        let { backgrounds } = this.props.backgroundList
        let tempArr = []
            , tempData = {
                labels: [],
                datasets: [{
                    label: 'Backgrounds',
                    data: [],
                    backgroundColor: '#a62020'
                }]
            }

        for (let i = 0; i < backgrounds.length; i++) {
            if (backgrounds[i].selected > 0) {
                tempData.labels.push(backgrounds[i].name)
                tempData.datasets[0].data.push(backgrounds[i].selected)
            } else {
                tempArr.push(backgrounds[i])
            }
        }

        this.setState({ backgrounds: tempData, rejects: tempArr })
    }

    render() {
        const { backgroundList } = this.props

        if (backgroundList && backgroundList.loading) {
            return (<div className='StepOuter'>
                <div className="stepInner backgroundLoader" id="loading">
                    <Loading />
                </div>
            </div>)
        }

        if (backgroundList && backgroundList.error) {
            return <p>Error</p>
        }

        return (
            <div>
                <Bar data={this.state.backgrounds} />

                <h1>Unchosen:</h1>
                {this.state.rejects.map(val => {
                    return (<div key={val.id}>
                        <p>{val.name}</p>
                    </div>)
                })}
            </div>
        )
    }
}

const BACKGROUND_BREAK_QUERY = gql`
    query BackgroundQuery ($search: String!) {
        backgrounds (search: $search) {
            id,
            category,
            name,
            selected
        }
    }`

const BACKGROUND_BREAK_SUB = gql`
    subscription {
        backgroundUpdate {
            id
        }
    }`

export default graphql(BACKGROUND_BREAK_QUERY, {
    name: 'backgroundList', options: { variables: { search: '' } }
})(BackgroundBreakdown)
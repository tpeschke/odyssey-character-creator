import React, { Component } from 'react'
import { graphql} from 'react-apollo'
import gql from 'graphql-tag'
import { Bar } from 'react-chartjs-2'

class AlienBreakdown extends Component {
    constructor() {
        super()

        this.state = {
            aliens: {},
            rejects: []
        }
    }

    componentWillMount() {
        // console.log(this.props.alienList)
        this.props.alienList.subscribeToMore({
            document: ALIEN_BREAK_SUB,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.newCharacter) {
                    console.log('none')
                    return prev
                } 
                console.log(prev, subscriptionData)
            }
        })
    }


    componentDidMount() {
        let { aliens } = this.props.alienList

        if (aliens) {
            let tempArr = []
            let tempData = {
                labels: [],
                datasets: [{
                    label: 'Aliens',
                    data: [],
                    backgroundColor: '#a62020'
                }]
            }

            for (let i = 0; i < aliens.length; i++) {
                if (aliens[i].selected > 0) {
                    tempData.labels.push(aliens[i].species)
                    tempData.datasets[0].data.push(aliens[i].selected)
                } else {
                    tempArr.push(aliens[i])
                }
            }

            this.setState({ aliens: tempData, rejects: tempArr })
        }
    }

    componentWillReceiveProps(next) {
        let tempArr = []
        let tempData = {
            labels: [],
            datasets: [{
                label: 'Aliens',
                data: [],
                backgroundColor: '#a62020'
            }]
        }

        if (next.alienList.aliens) {
            for (let i = 0; i < next.alienList.aliens.length; i++) {
                if (next.alienList.aliens[i].selected > 0) {
                    tempData.labels.push(next.alienList.aliens[i].species)
                    tempData.datasets[0].data.push(next.alienList.aliens[i].selected)
                } else {
                    tempArr.push(next.alienList.aliens[i])
                }
            }
        }

        this.setState({ aliens: tempData, rejects: tempArr })
    }

    render() {
        const { alienList } = this.props

        if (alienList && alienList.loading) {
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

        if (alienList && alienList.error) {
            return <p>Error</p>
        }

        return (
            <div>
                <Bar data={this.state.aliens} />

                <h1>Unchosen:</h1>
                {this.state.rejects.map(val => {
                    return (<div key={val.id}>
                        <p>{val.species}</p>
                    </div>)
                })}
            </div>
        )
    }
}

const ALIEN_BREAK_QUERY = gql`
    query AlienQuery {
        aliens {
            id,
            species,
            selected
        }
    }`

const ALIEN_BREAK_SUB = gql`
    subscription newCharacter{
        id
    }`

export default graphql(ALIEN_BREAK_QUERY, { name: 'alienList' })(AlienBreakdown)
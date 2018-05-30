import React, { Component } from 'react'
import Step5 from './Step5'

export default class Step5State extends Component {
    constructor() {
        super()

        this.state = {
            filter: null,
            search: '',
            price: false
        }
    }

    setFilter = (filter) => {
        this.setState({ filter })
    }

    setSearch = (search) => {
        this.setState({ search })
    }

    setPrice = () => {
        this.setState({price: !this.state.price})
    }

    render() {
        return (
            <div>
                <h1>Step 5</h1>

                <button onClick={_ => this.setFilter(null)}>All</button>
                <button onClick={_ => this.setFilter('Warrior')}>Warriors</button>
                <button onClick={_ => this.setFilter('Technician')}>Technicians</button>
                <button onClick={_ => this.setFilter('Diplomat')}>Diplomats</button>

                <input placeholder="search" onChange={e => this.setSearch(e.target.value)} value={this.state.search} />

                <button onClick={this.setPrice}>Sort by Price</button>

                <Step5
                    filter={this.state.filter}
                    search={this.state.search} 
                    price={this.state.price}
                    history={this.props.history}/>
            </div>
        )
    }
}
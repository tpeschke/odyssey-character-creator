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
            <div className='StepOuter'>
                <div className='stepBody'>
                <div className="stepTitle">
                <h1>Step 5: Choose Background</h1>
                </div>

                <div className="stepInner backgroundInner" >
                <div>
                <button onClick={_ => this.setFilter(null)}>All</button>
                <button onClick={_ => this.setFilter('Warrior')}>Warriors</button>
                <button onClick={_ => this.setFilter('Technician')}>Technicians</button>
                <button onClick={_ => this.setFilter('Diplomat')}>Diplomats</button>

                <div className="inputRow">
                <input placeholder="Search" onChange={e => this.setSearch(e.target.value)} value={this.state.search} />

                <button onClick={this.setPrice}>Sort by Price</button>
                </div>
                </div>
                <Step5
                    filter={this.state.filter}
                    search={this.state.search} 
                    price={this.state.price}
                    history={this.props.history}/>
            </div>
            </div>
            </div>
        )
    }
}
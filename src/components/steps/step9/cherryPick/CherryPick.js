import React, { Component } from 'react'
import QuirkList from './QuirkList'

class CherryPick extends Component {
    constructor() {
        super()

        this.state = {
            table: null,
            filter: false
        }
    }

    render() {
        let list = <div></div>

        if (this.state.table) {
            list = <QuirkList
                table={this.state.table}
                DEDUCTBP={this.props.DEDUCTBP}
                ADDQUIRK={this.props.ADDQUIRK}
                deduction={this.props.deduction}
                filter={this.state.filter} />
        }

        return (
            <div>
                {this.state.filter ? <button onClick={_ => this.setState({ filter: !this.state.filter })}>Bring 'Em Back</button> : <button onClick={_ => this.setState({ filter: !this.state.filter })}>Filter Out Zeros</button>}
                
                {this.state.table !== 1 ? <button onClick={_ => this.setState({ table: 1 })}>Mental Quirks</button> : <div className="buttonLocked">Skills</div>}
                {this.state.table !== 2 ? <button onClick={_ => this.setState({ table: 2 })}>Behavioral Quirks</button> : <div className="buttonLocked">Talents</div>}
                {this.state.table !== 3 ? <button onClick={_ => this.setState({ table: 3 })}>Physical Flaws</button> : <div className="buttonLocked">Proficiencies</div>}
                
                {list}
            </div>
        )
    }
}

export default CherryPick
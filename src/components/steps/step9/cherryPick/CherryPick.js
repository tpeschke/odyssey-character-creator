import React, {Component} from 'react'
import QuirkList from './QuirkList'

class CherryPick extends Component {
    constructor() {
        super()

        this.state= {
            table: null
        }
    }

    render() {
        let list = <div></div>

        if (this.state.table) {
            list = <QuirkList 
                        table={this.state.table}/>
        }

        return (
            <div>
                <button onClick={_=>this.setState({table: 3})}>Physical Flaws</button>
                <button onClick={_=>this.setState({table: 2})}>Behavioral Quirks</button>
                <button onClick={_=>this.setState({table: 1})}>Mental Quirks</button>

                {list}
            </div>
        )
    }
}

export default CherryPick
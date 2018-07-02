import React, {Component} from 'react'

import AlienBreakdown from './AlienBreakdown'
import BackgroundBreakdown from './BackgroundBreakdown'

class AdminHome extends Component {
    constructor() {
        super()

        this.state = {
            route: 2
        }
    }

    render() {
        let { route } = this.state
        return (
            <div className="stepInner">
                <button onClick={_=>this.setState({route: 1})}>Admin Home</button>
                <button onClick={_=>this.setState({route: 2})}>Aliens</button>
                <button onClick={_=>this.setState({route: 3})}>Backgrounds</button>

                {route === 1 ? <div></div> : <div></div>}
                {route === 2 ? <AlienBreakdown /> : <div></div>}
                {route === 3 ? <BackgroundBreakdown /> : <div></div>}
                
            </div>
        )
    }
}

export default AdminHome
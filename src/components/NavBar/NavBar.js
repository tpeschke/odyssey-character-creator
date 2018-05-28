import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import BpTracker from './BpTracker'

class NavBar extends Component {
    constructor() {
        super()

        this.state = {
            show: false
        }
    }

    render() {
        return(
            <div>
                <nav className="App-header">
                    <div id="menu" onClick={_=>this.setState({show: !this.state.show})}/>
                    <h1 className="App-title">Nav Bar</h1>
                    <BpTracker />
                </nav>

                <div className={this.state.show ? 'navBarDrawer navBarDrawerReveal' : 'navBarDrawer'}>
                    <list>
                        <Link to="/"><ul onClick={_=>this.setState({show: !this.state.show})}>Home</ul></Link>
                        <Link to="/step1"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 1</ul></Link>
                        <Link to="/step2"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 2</ul></Link>                        
                        <Link to="/step3"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 3</ul></Link>
                        <Link to="/step4"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 4</ul></Link>
                        <Link to="/step5"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 5</ul></Link>
                        <Link to="/step6"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 6</ul></Link>
                        <Link to="/step7"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 7</ul></Link>                        
                    </list>
                </div>
            </div>
        )
    }
}

export default withRouter(NavBar)
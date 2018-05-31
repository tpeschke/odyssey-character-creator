import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {connect} from 'react-redux'

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
                    <BpTracker bp={this.props.bp}/>
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
                        <Link to="/step8"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 8</ul></Link>                        
                        <Link to="/step9"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 9</ul></Link>                        
                        <Link to="/step10"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 10</ul></Link>                        
                        <Link to="/step11"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 11</ul></Link>                        
                        <Link to="/step12"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 12</ul></Link>                        
                        <Link to="/step13"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 13</ul></Link>                        
                        <Link to="/step14"><ul onClick={_=>this.setState({show: !this.state.show})}>Step 14</ul></Link>                        
                    </list>
                </div>
            </div>
        )
    }
}

const decoratedNavBar = withRouter(NavBar)

function mapStateToProps(state) {
    var { bp } = state

    return {
        bp
    }
}


export default connect(mapStateToProps)(decoratedNavBar)
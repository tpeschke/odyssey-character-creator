import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {connect} from 'react-redux'

import BpTracker from './BpTracker'

class NavBar extends Component {
    constructor() {
        super()

        this.state = {
            show: false,
            links: [{title: 'Species', props: 'bp'},{title: 'Ability Scores', props: 'species'},{title: 'Arrange Scores', props: 'scores'},{title: 'Background', props: 'scores'},{title: 'Finalize Scores', props: 'background'},{title: 'Reputation', props: 'background'},{title: 'Priors & Particulars', props: 'rep'},{title: 'Quirks & Flaws', props: 'priors'},{title: 'STPs', props: 'qf'},{title: 'HPs', props: 'skills'},{title: 'Record', props: 'hp'},{title: 'Receive Credit', props: 'record'},{title: 'Goods & Equipment', props: 'credits'}],
            height: 0,
            width: 0
        }
    }

    componentDidMount() {
        this.setState({width: document.getElementById('root').clientWidth, height: document.getElementById('root').clientHeight})
    }

    render() {
        let navBarRender;

        if (!this.props.bp) {
            navBarRender = (<div className={this.state.show ? 'navBarDrawer navBarDrawerReveal' : 'navBarDrawer'}>
                                <ul>
                                    <Link to="/"><li id="navFirstItem" onClick={_=>this.setState({show: !this.state.show})}>Home</li></Link>
                                    <Link to="/step1"><li onClick={_=>this.setState({show: !this.state.show})}>New Character</li></Link>
                                </ul>
                            </div>)
        } else {

            navBarRender = (<div className={this.state.show ? 'navBarDrawer navBarDrawerReveal' : 'navBarDrawer'}>
                <ul>
                    <Link to="/"><li id="navFirstItem" onClick={_=>this.setState({show: !this.state.show})}>Home</li></Link>
                    <Link to="/step1"><li onClick={_=>this.setState({show: !this.state.show})}>Step 1: Recieve BP</li></Link>
                    {this.state.links.map((v, i)=> {
                        if ( this.props[v.props]){ 
                           return <Link to={`/step${i+2}`}><li onClick={_=>this.setState({show: !this.state.show})}>{`Step ${i+2}: ${v.title}`}</li></Link> 
                        } else {
                           return <div className="navLocked">{`Step ${i+2}: ${v.title}`}</div>
                        } 
                    })}
            </ul>
        </div>)
        }

        return(
            <div>
                <nav className="App-header">
                    <div id="menu" onClick={_=>this.setState({show: !this.state.show})}/>
                    <h1 className="App-title">Nav Bar</h1>
                    <BpTracker bp={this.props.bp}/>
                </nav>
                <div id='navOverlay' style={this.state.show ? {width: this.state.width} : {width: 0}} onClick={_=>this.setState({show: !this.state.show})}></div>
                {navBarRender}                
            </div>
        )
    }
}

const decoratedNavBar = withRouter(NavBar)

function mapStateToProps(state) {

    return state
}


export default connect(mapStateToProps)(decoratedNavBar)
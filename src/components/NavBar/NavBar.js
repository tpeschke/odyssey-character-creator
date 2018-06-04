import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './navBarStyle.css'
import BpTracker from './BpTracker'

class NavBar extends Component {
    constructor() {
        super()

        this.state = {
            show: false,
            links: [{title: 'Species', props: 'bp'},{title: 'Ability Scores', props: 'species'},{title: 'Arrange Scores', props: 'species'},{title: 'Background', props: 'scores'},{title: 'Finalize Scores', props: 'background'},{title: 'Reputation', props: 'finalize'},{title: 'Priors & Particulars', props: 'rep'},{title: 'Quirks & Flaws', props: 'priors'},{title: 'STPs', props: 'qf'},{title: 'HPs', props: 'talents'},{title: 'Record', props: 'hp'},{title: 'Receive Credit', props: 'record'},{title: 'Goods & Equipment', props: 'credits'},{title: 'Review', props: 'equipment'}],
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
                    <Link to="/"><li id='navFirstItem' onClick={_=>this.setState({show: !this.state.show})}>Home</li></Link>
                    <Link to="/step1"><li onClick={_=>this.setState({show: !this.state.show})}>Step 1: Recieve BP</li></Link>
                    {this.state.links.map((v, i)=> {
                        if ( this.props[v.props]){ 
                           return <Link key={`${v.title}${i}`} to={`/step${i+2}`}><li id={this.props.location.pathname === `/step${i+2}` ? 'active' : ''} onClick={_=>this.setState({show: !this.state.show})}>{`Step ${i+2}: ${v.title}`}</li></Link> 
                        } else {
                           return <div key={`${v.title}${i}`} className="navLocked">{`Step ${i+2}: ${v.title}`}</div>
                        } 
                    })}
            </ul>
        </div>)
        }

        return(
            <div>
                <nav className="App-header">
                    <div id="menu" onClick={_=>this.setState({show: !this.state.show})}>
                        <div id="menuFirst"/>
                        <div id="menuSecond"/>
                        <div id="menuThird"/>
                    </div>
                    <div className="navBanner"/>
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
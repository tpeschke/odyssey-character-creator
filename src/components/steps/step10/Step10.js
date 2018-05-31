import React, {Component} from 'react'

import Skills from './Skills'
import Talents from './Talents'
import Proficiencies from './Profic'
import Specializations from './Special'

export default class Step10 extends Component {
    constructor() {
        super()

        this.state = {
            page: 2,
            skills: [],
            talents: null,
            special: [],
            profic: []
        }
    }

    saveQuirks = () => {
        //REDUCER CALL
        this.props.history.push('/step10')
    }

    setTalents = (select) => {
        this.setState({talents: select})
    }

    render(){
        return(
            <div>
                <h1>Step 10</h1>
                <h2>Skills, Talents, & Proficiencies</h2>
                <button>Save</button>
                <br/>                

                <button onClick={_=>this.setState({page: 1})}>Skills</button>
                <button onClick={_=>this.setState({page: 2})}>Talents</button>
                <button onClick={_=>this.setState({page: 3})}>Proficiencies</button>
                <button onClick={_=>this.setState({page: 4})}>Specializations</button>

                <br/>
                <br/>

                {this.state.page === 1 ? <Skills /> : <div></div>}
                {this.state.page === 2 ? <Talents setTalents={this.setTalents} talents={this.state.talents}/> : <div></div>}
                {this.state.page === 3 ? <Proficiencies /> : <div></div>}
                {this.state.page === 4 ? <Specializations /> : <div></div>}       
            </div>
        )
    }
}
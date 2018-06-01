import React, {Component} from 'react'

import Skills from './Skills'
import Talents from './Talents'
import Proficiencies from './Profic'
import Specializations from './Special'

class Step10 extends Component {
    constructor() {
        super()

        this.state = {
            page: 2
        }
    }

    saveBuys = () => {
        this.props.history.push('/step11')
    }

    render(){
        return(
            <div>
                <h1>Step 10</h1>
                <h2>Skills, Talents, & Proficiencies</h2>
                <button onClick={this.saveBuys}>Save</button>
                <br/>                

                <button onClick={_=>this.setState({page: 1})}>Skills</button>
                <button onClick={_=>this.setState({page: 2})}>Talents</button>
                <button onClick={_=>this.setState({page: 3})}>Proficiencies</button>
                <button onClick={_=>this.setState({page: 4})}>Specializations</button>

                <br/>
                <br/>

                {this.state.page === 1 ? <Skills /> : <div></div>}
                {this.state.page === 2 ? <Talents /> : <div></div>}
                {this.state.page === 3 ? <Proficiencies /> : <div></div>}
                {this.state.page === 4 ? <Specializations /> : <div></div>}       
            </div>
        )
    }
}

export default Step10
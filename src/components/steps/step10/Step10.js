import React, {Component} from 'react'

import Skills from './Skills'
import Talents from './Talents'
import Proficiencies from './Profic'
import Specializations from './special/Special'

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
            <div className='StepOuter'>
                <div className='stepBody'>
                <div className="stepTitle">
                <h1>Step 10: Skills, Talents, & Proficiencies</h1>
                </div>

                <div className="stepInner">
                <div>
                <button onClick={this.saveBuys}>Save</button>             
                <div className="stpButtonDisplay">
                {this.state.page !== 1 ? <button onClick={_=>this.setState({page: 1})}>Skills</button> : <div className="buttonLocked">Skills</div>}   
                {this.state.page !== 2 ? <button onClick={_=>this.setState({page: 2})}>Talents</button> : <div className="buttonLocked">Talents</div>}   
                {this.state.page !== 3 ? <button onClick={_=>this.setState({page: 3})}>Proficiencies</button> : <div className="buttonLocked">Proficiencies</div>}   
                {this.state.page !== 4 ? <button onClick={_=>this.setState({page: 4})}>Specializations</button> : <div className="buttonLocked">Specializations</div>}   
                </div>
                </div>  

                {this.state.page === 1 ? <Skills /> : <div></div>}
                {this.state.page === 2 ? <Talents /> : <div></div>}
                {this.state.page === 3 ? <Proficiencies /> : <div></div>}
                {this.state.page === 4 ? <Specializations /> : <div></div>}   
                </div>
                </div>    
            </div>
        )
    }
}

export default Step10
import React, {Component} from 'react'

export default class Step9 extends Component {

    //DATABASE CALL

    saveQuirks = () => {
        //REDUCER CALL
        this.props.history.push('/step10')
    }

    render(){
        return(
            <div>
                <h1>Step 9</h1>
                <h2>Quirks & Flaws</h2>

                <button onClick={this.saveQuirks}>Save</button>                
            </div>
        )
    }
}
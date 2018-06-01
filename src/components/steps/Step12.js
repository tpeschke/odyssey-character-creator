import React, {Component} from 'react'

export default class Step12 extends Component {

    render(){
        return(
            <div>
                <h1>Step 12</h1>
                <h2>Record Stuff</h2>

                <button onClick={_=>this.props.history.push('/step13')}>Save</button>
            </div>
        )
    }
}
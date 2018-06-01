import React, {Component} from 'react'

export default class Step14 extends Component {

    render(){
        return(
            <div>
                <h1>Step 14</h1>
                <button onClick={_=>this.props.history.push('/review')}>Save</button>
            </div>
        )
    }
}
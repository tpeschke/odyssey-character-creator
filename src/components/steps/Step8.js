import React, {Component} from 'react'

export default class Step8 extends Component {

    savePriors = () => {
        //REDUCER CALL
        this.props.history.push('/step9')
    }

    render(){
        return(
            <div>
                <h1>Step 8</h1>
                <h2>Priors & Particulars</h2>
                <button onClick={this.savePriors}>Save</button>
            </div>
        )
    }
}

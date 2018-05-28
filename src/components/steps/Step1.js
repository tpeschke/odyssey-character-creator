import React, {Component} from 'react'

export default class Step1 extends Component {
    componentDidMount(){
        this.props.setBP()
    }

    render() {
        return (
            <div>
                <h1>Step 1: Recieve Building Points</h1>
                <p>Each character gets 40 BPs</p>  
            </div>
        )
    }
}
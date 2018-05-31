import React, {Component} from 'react'

import {connect} from 'react-redux'

class Step6 extends Component {
    constructor() {
        super()

        this.state = {
            strScore: null,
            strPercent: null,
            intScore: null,
            intPercent: null,
            wisScore: null,
            wisPercent: null,
            dexScore: null,
            dexPercent: null,
            conScore: null,
            conPercent: null,
            chaScore: null,
            chaPercent: null,
            lksScore: null,
            lksPercent: null,
        }
    }

    componentDidMount() {
        console.log(this.props.scores)
    }

    render() {
        return (
            <div>
                <h1>Step 6</h1>    
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {scores} = state

    return {
        scores
    }
}
export default connect(mapStateToProps)(Step6)
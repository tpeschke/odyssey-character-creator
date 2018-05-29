import React, {Component} from 'react'

import { connect } from 'react-redux'
import { SETSCORES } from '../../dux/reducer'

class Step4 extends Component{

    render() {
        return (
            <div>
                <h1>Step 4</h1>    
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

export default connect(mapStateToProps,{SETSCORES})(Step4)
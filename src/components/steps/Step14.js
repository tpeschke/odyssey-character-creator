import React, {Component} from 'react'

import {connect} from 'react-redux'
import {SETEQUIPMENTS} from '../../dux/reducer'

class Step14 extends Component {

    saveStuff = () => {
        this.props.SETEQUIPMENTS([])
        this.props.history.push('/step15')
    }

    render(){
        return(
            <div>
                <h1>Step 14</h1>
                <button onClick={this.saveStuff}>Save</button>
            </div>
        )
    }
}

export default connect(function(){return{}},{SETEQUIPMENTS})(Step14)
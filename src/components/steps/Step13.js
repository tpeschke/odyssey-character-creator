import React, {Component} from 'react'

import {connect} from 'react-redux'
import {SETCREDIT} from '../../dux/reducer'

import {rollScore} from '../recycle/roll'

class Step13 extends Component {
    constructor() {
        super()

        this.state = {
            credits: 0
        }
    }

    componentDidMount() {
        if(this.props.credits){
            this.setState({credits: this.props.credits})
        }else {
            this.setState({credits: (rollScore(2,12).reduce((t,n)=> t+n) + 70) * 100})
        }
    }

    componentWillUnmount() {
        this.props.SETCREDIT(this.state.credits)
    }

    render(){
        return(
            <div className='StepOuter'>
                <div className='stepBody'>
                <div className="stepTitle">
                <h1>Step 13: Receive Credits</h1>
                </div>

                <div className="stepInner">
                <p className="finalizeScoreBP">{this.state.credits} credits</p>
                <div className="scoreUnderscore step6Underscore"/>

                <button onClick={_=>this.props.history.push('/step14')}>Save</button>
            </div>
            </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    let {credits} = state

    return {credits}
}

export default connect(mapStateToProps, {SETCREDIT})(Step13)
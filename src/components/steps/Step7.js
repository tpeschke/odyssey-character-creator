import React, {Component} from 'react'

import {connect} from 'react-redux'
import { SETSCORES } from '../../dux/reducer'
import _ from 'lodash'

class Step7 extends Component {
    constructor() {
        super()

        this.state = {
            total: 0
        }
    }

    componentDidMount() {
        let cha, lks;
        let tempArr = _.cloneDeep(this.props.scores)
        let tempNum = (tempArr.reduce((total, v)=> {
            if (v.title === 'CHA') { cha = +v.score.split(".")[0] }
            if (v.title === 'LKS') { lks = +v.score.split(".")[0] } 
            return total + +v.score
        }, 0)/7)
       
        tempNum = this.modifyRep(lks, this.modifyRep(cha, tempNum))

        this.setState({total: Math.floor(tempNum)})
    }

    modifyRep = (param, num) => {
        switch(param) {
            case 1:
                return num-6
            case 2:
                return num-5
            case 3:
                return num-4
            case 4:
            case 5:
                return num-3
            case 6:
            case 7:
                return num-2
            case 8:
            case 9:
                return num-1
            case 10:
            case 11:
            case 12:
                return num-0
            case 13:
            case 14:
                return num+1 
            case 15:
            case 16:
                return num+2
            case 17:
                return num+3    
            case 18:
            case 19:
                return num+4
            case 20:
                return num+5     
        }
    }

    saveRep = () => {
        this.props.SETSCORES([...this.props.scores, {id: 8, title: 'REP', score: this.state.total}])
        this.props.history.push('/step7')
    }


    render() {
        return(
            <div>
                <h1>Step 7</h1>
                <p>REPUTATION</p>
                <p>{this.state.total}</p>

                <button onClick={this.saveRep}>Save</button>
            </div>
        )
    }
}

function mapStateToProps (state) {
    let {scores} = state
    return {
        scores
    }
}

export default connect(mapStateToProps, {SETSCORES})(Step7)
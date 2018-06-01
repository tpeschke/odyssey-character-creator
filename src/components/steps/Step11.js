import React, {Component} from 'react'

import {connect} from 'react-redux'
import {SETHP} from '../../dux/reducer'
import {rollScore} from './step3/roll'

class Step11 extends Component {
    constructor() {
        super()

        this.state = {
            hp: null
        }
    }

    componentDidMount() {
        let i = this.props.scores.map(val => val.title).indexOf('CON')
        let conScore = +this.props.scores[i].score.split('.')[0]

        switch(this.props.species.species) {
            case "Akhelarian":
                this.setState({hp: "I'll GET AROUND TO IT"})
                break
            case "Clone":
                this.setState({hp: rollScore(1,6) + 10 + conScore})
                break
            case "Droid":
                this.setState({hp: "I'll GET AROUND TO IT"})
                break
            case "Ghost":
                this.setState({hp: rollScore(1,4) + 10 + conScore})
                break
            case "Human":
                this.setState({hp: +rollScore(1,6) + 10 + conScore})
                break
            case "Hiven":
                this.setState({hp: "I'll GET AROUND TO IT"})
                break
        }
    }

    componentWillUnMount() {
        this.props.SETHP(this.state.hp)
    }

    render(){
        return(
            <div>
                <h1>Step 11</h1>
                <p>{this.props.species.species}</p>
                <p>{this.state.hp}</p>

                <button onClick={_=>this.props.history.push('/step12')}>Save</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {species, scores} = state

    return {
        species,
        scores
    }
}

export default connect(mapStateToProps, {SETHP})(Step11)
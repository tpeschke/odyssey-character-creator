import React, {Component} from 'react'

import { connect } from 'react-redux'
import { SETBP, SETSCORES } from '../../../dux/reducer'

import Step4Arrange from './Step4Arrange'
import Step4AutoGet from './Step4AutoGet'

class Step4 extends Component{
    
    render() {
        let {species} = this.props.species

        if (species === 'Clone' || species === 'Hiven') {
            return <Step4AutoGet    SETBP={this.props.SETBP}
                                    pushHistory={this.props.history.push}
                                    species={species}/>
        } else if (species === 'Akehlarian' || species === 'Droid') {
            return <div>Under Construction</div>
        } else {
            return <Step4Arrange    scores={this.props.scores}
                                    SETBP={this.props.SETBP}
                                    SETSCORES={this.props.SETSCORES}
                                    pushHistory={this.props.history.push}/>
        }
    }
}


function mapStateToProps(state) {
    let {scores, species} = state

    return {
        scores,
        species
    }
}


export default connect(mapStateToProps,{SETBP, SETSCORES})(Step4)
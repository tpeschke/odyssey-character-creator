import React, {Component} from 'react'

import { connect } from 'react-redux'
import { SETSCORES } from '../../../dux/reducer'

import {rollScore, rollPercent} from './roll'

class Step3 extends Component {
    constructor() {
        super()

        this.state = {
            str: null,
            int: null,
            wis: null,
            dex: null,
            con: null,
            cha: null,
            lks: null
        }
    }

//ALSO DO IF STATEMENT FOR xx.100
//SHOPKEEP
//AND 

    componentDidMount() {
        this.setState({ str: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent(),
                        int: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent(),
                        wis: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent(),
                        dex: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent(),
                        con: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent(),
                        cha: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent(),
                        lks: rollScore(3,6).reduce((t,n)=> t+n) + '.' + rollPercent()
                    })
        
    }

    saveScores = () => {
        this.props.SETSCORES(this.state)
        this.props.history.push('/step4')
    }

    render() {
        let {str, int, wis, dex, con, cha, lks} = this.state
        return (
            <div>
                <h1>Step3</h1>
                <p>STR</p>    
                <p>{str}</p>    
                <p>INT</p>    
                <p>{int}</p>    
                <p>WIS</p>    
                <p>{wis}</p>    
                <p>DEX</p>    
                <p>{dex}</p>    
                <p>CON</p>    
                <p>{con}</p>    
                <p>CHA</p>    
                <p>{cha}</p>    
                <p>LKS</p>    
                <p>{lks}</p>
    
                <button onClick={this.saveScores}>Save Score</button>    
            </div>
        )
    }
}

export default connect(function(){},{SETSCORES})(Step3)
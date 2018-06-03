import React, { Component } from 'react'
import _ from 'lodash'

import {rollScore} from './../../../roll'
import RollQuirk from './RollQuirk'
import ShowTable from './ShowTable'

class RollQuirks extends Component {
    constructor() {
        super()

        this.state = {
            roll: 0,
            show: false,
            quirkRoll: 0,
            table: 0
        }
    }
    
    componentDidMount() {
        this.setState({roll: rollScore(1,20)[0]})
    }

    rerollTable = () => {
        if(this.props.bp > 0){
        this.props.DEDUCTBP(1)
        this.setState({roll: rollScore(1,20)[0]})
        }
    }

    rollForQuirk = () => {
        this.setState({quirkRoll: rollScore(1,1000)[0], show: true})
    }

    hideQuirk = () => {
        this.setState({show: false, roll: rollScore(1,20)[0]})
    }

    setTable = (id) => {
        this.setState({table: id})
    }

    render() {
        const showButton = !this.state.show ? ( <div><button onClick={this.rerollTable}>Reroll</button>
                                                    <button onClick={this.rollForQuirk}>Roll on Table</button></div>
                                                    ) : <div></div>
        
        return (
            <div>
                {this.state.roll}
                <br/>
                <ShowTable 
                    roll={this.state.roll}
                    setTable={this.setTable}/>
                <br/>        
                {showButton}
                <br/>

                {this.state.show ? <RollQuirk 
                                        roll={this.state.quirkRoll}
                                        table={this.state.table}
                                        rollForQuirk={this.rollForQuirk}
                                        DEDUCTBP={this.props.DEDUCTBP}
                                        ADDQUIRK={this.props.ADDQUIRK}
                                        hideQuirk={this.hideQuirk}
                                        bp={this.props.bp}/> : <div></div>}
            
            </div>
        )
    }
}

export default RollQuirks
import React, {Component} from 'react'

import {connect} from 'react-redux'
import {DEDUCTBP, ADDQUIRK, SETQF} from '../../../dux/reducer'

import RollQuirkTable from './RollQuirkTable'

class Step9 extends Component {
    componentDidMount() {
        this.props.SETQF()
    }

    saveQuirks = () => {
        this.props.history.push('/step10')
    }

    render(){
        let renderQf = <div></div>;

        if (this.props.qf){
            renderQf = this.props.qf.map((v, i)=> {
                return (
                    <div key={v.id}>
                        <p>{v.name}</p>
                        <p>{v.bp - (i * 5)}</p>
                    </div>
            )
        })}

        return(
            <div>
                <h1>Step 9</h1>
                <h2>Quirks & Flaws</h2>

                <button onClick={this.saveQuirks}>Continue</button>

                {renderQf}

                <RollQuirkTable 
                    DEDUCTBP={this.props.DEDUCTBP}
                    ADDQUIRK={this.props.ADDQUIRK}/>                
            </div>
        )
    }
}

function mapStateToProps (state){
    let {qf} = state
    return {
        qf
    }
}
export default connect(mapStateToProps, {DEDUCTBP, ADDQUIRK, SETQF})(Step9)
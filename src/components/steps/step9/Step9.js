import React, { Component } from 'react'

import { connect } from 'react-redux'
import { DEDUCTBP, ADDQUIRK, SETQF, ADDBP, SETSELECTION } from '../../../dux/reducer'

import RollQuirkTable from './randomRoll/RollQuirkTable'
import CherryPick from './cherryPick/CherryPick'
import { buildSchemaFromTypeDefinitions } from 'graphql-tools';

class Step9 extends Component {
    componentDidMount() {
        this.props.SETQF()
    }

    saveQuirks = () => {
        this.props.qf.forEach((v, i) => {
            if (this.props.select === 'roll') {
                this.props.ADDBP(v.bp - (i * 5) >= 0 ? v.bp - (i * 5) : 0)
            } else {
                this.props.ADDBP(v.bp - ((i + 1) * 5) >= 0 ? v.bp - ((i + 1) * 5) : 0)
            }
        })
        this.props.history.push('/step10')
    }

    render() {
        let renderQf = <div>No Quirks & Flaws</div>;
        let choice = (<div>
            <button onClick={_ => this.props.SETSELECTION('roll')}>Randomly Roll</button>
            <button onClick={_ => this.props.SETSELECTION('pick')}>Cherry Pick</button>
        </div>)

        let selection = () => (
            <div>
                <div className="quirkTitleCard selectedQuirks">
                    <p className="quirkItem quirkName">Name</p>
                    <p className="quirkItem">BP</p>
                </div>

                <div className="selectQuirkStriping">
                    {renderQf}
                </div>
            </div>)

        if (this.props.qf && this.props.qf.length > 0) {
            renderQf = this.props.qf.map((v, i) => {
                let bonus = v.bp - (i * 5)
                if (v.bp - (i * 5) <= 0 && this.props.select === 'roll') {
                    bonus = 0
                } else if (v.bp - (5 * (i + 1)) < 1 && this.props.select === 'pick') {
                    bonus = 0
                }

                return (
                    <div key={v.id} className="quirkTitleBottom selectedQuirks">
                        <p className="quirkItem quirkName">{v.name}</p>
                        <p className="quirkItem">{bonus}</p>
                    </div>
                )
            })
        }

        if (this.props.select && this.props.select === 'roll') {
            choice = (
                <div>
                    {selection()}
                    <RollQuirkTable
                        DEDUCTBP={this.props.DEDUCTBP}
                        ADDQUIRK={this.props.ADDQUIRK}
                        bp={this.props.bp} />
                </div>)
        } else if (this.props.select && this.props.select === 'pick') {
            let num = this.props.qf ? this.props.qf.length : 0
            choice = (
                <div>
                    {selection()}
                    <CherryPick
                        DEDUCTBP={this.props.DEDUCTBP}
                        ADDQUIRK={this.props.ADDQUIRK}
                        deduction={num} />
                </div>)
        }

        return (
            <div className='StepOuter'>
                <div className='stepBody'>
                    <div className="stepTitle">
                        <h1>Step 9: Quirks & Flaws</h1>
                    </div>

                    <div className="stepInner">
                        <button onClick={this.saveQuirks}>Save & Continue</button>

                        <div className="scoreUnderscore step6MainUnderscore" />

                        {choice}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { qf, bp, select } = state
    return {
        qf,
        bp,
        select
    }
}
export default connect(mapStateToProps, { DEDUCTBP, ADDQUIRK, SETQF, ADDBP, SETSELECTION })(Step9)
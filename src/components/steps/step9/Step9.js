import React, { Component } from 'react'

import { connect } from 'react-redux'
import { DEDUCTBP, ADDQUIRK, SETQF, ADDBP } from '../../../dux/reducer'

import RollQuirkTable from './randomRoll/RollQuirkTable'
import CherryPick from './cherryPick/CherryPick'

class Step9 extends Component {
    constructor() {
        super()

        this.state = {
            selected: 'pick'
        }
    }

    componentDidMount() {
        this.props.SETQF()
    }

    saveQuirks = () => {
        this.props.qf.forEach((v, i) => {
            this.props.ADDBP(v.bp - (i * 5) >= 0 ? v.bp - (i * 5) : 0)
        })
        this.props.history.push('/step10')
    }

    render() {
        let renderQf = <div></div>;
        let choice = (  <div>
            <button onClick={_ => this.setState({ selected: 'roll' })}>Randomly Roll</button>
            <button onClick={_ => this.setState({ selected: 'pick' })}>Cherry Pick</button>
                        </div>)

        let selection = (
            <div>
                <div className="quirkTitleCard selectedQuirks">
                    <p className="quirkItem quirkName">Name</p>
                    <p className="quirkItem">BP</p>
                </div>

                <div className="selectQuirkStriping">
                    {renderQf}
                </div>
            </div>)

        if (this.props.qf) {
            renderQf = this.props.qf.map((v, i) => {
                return (
                    <div key={v.id} className="quirkTitleBottom selectedQuirks">
                        <p className="quirkItem quirkName">{v.name}</p>
                        <p className="quirkItem">{v.bp - (i * 5) >= 0 ? v.bp - (i * 5) : 0}</p>
                    </div>
                )
            })
        }

        if (this.state.selected && this.state.selected === 'roll') {
            choice = (
                <div>
                    {selection}
                    <RollQuirkTable
                        DEDUCTBP={this.props.DEDUCTBP}
                        ADDQUIRK={this.props.ADDQUIRK}
                        bp={this.props.bp} />
                </div>)
        } else if (this.state.selected && this.state.selected === 'pick') {
            choice = (
                <div>
                    {selection}
                    <CherryPick
                        DEDUCTBP={this.props.DEDUCTBP}
                        ADDQUIRK={this.props.ADDQUIRK}
                        bp={this.props.bp} />
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
    let { qf, bp } = state
    return {
        qf,
        bp
    }
}
export default connect(mapStateToProps, { DEDUCTBP, ADDQUIRK, SETQF, ADDBP })(Step9)
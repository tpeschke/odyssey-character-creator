import React from 'react'

function Step3Ghost (props) {
    return (
        <div>
            <h2 className="adjustmentTitle">Stat Adjustments</h2>
        <div className='scoreDisplay adjustmentDisplay'>
            <p className="scoreScore adjustment">-4</p>
            <p className="scoreScore adjustment">{props.choice === "INT" ? "+3" : !props.choice ? <p className="statChoice" onClick={_=>props.setChoice('INT')}>Choose One</p> : ''}</p>
            <p className="scoreScore adjustment">{props.choice === "WIS" ? "+3" : !props.choice ? <p className="statChoice" onClick={_=>props.setChoice('WIS')}>Choose One</p> : ''}</p>
            <p className="scoreScore adjustment"></p>
            <p className="scoreScore adjustment">-6</p>
            <p className="scoreScore adjustment">+3</p>
            <p className="scoreScore adjustment"></p>
        </div>
        </div>
    )
}

export default Step3Ghost
import React from 'react'

function BpTracker (props) {
    return (
        <div className="BPTracker">
            <div className="BPBucket">
                <p className="BPTitle">BP:</p> {props.bp}
            </div>
            <div className="BPBottomLine"/>
            
        </div>
    )
}

export default BpTracker
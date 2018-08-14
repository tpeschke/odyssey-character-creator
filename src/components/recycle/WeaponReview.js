import React from 'react'

export default function WeaponReview(props) {
    let { val } = props

    if (val.type === 'm') {
        return (<div className="reviewSpecialBox">
            <h2 className='reviewNameTitle'>{val.name}</h2>

            <div>
                <div className="reviewSpecialRow">
                    <p className="specialItem specialTitle">Attack</p>
                    <p>{`+${val.atk.filter((v, i) => { if (v) { return i + 1 } }).length}`}</p>
                </div>
                <div className="reviewSpecialRow">
                    <p className="specialItem specialTitle">Defence</p>
                    <p>{`+${val.def.filter((v, i) => { if (v) { return i + 1 } }).length}`}</p>
                </div>
                <div className="reviewSpecialRow">
                    <p className="specialItem specialTitle">Speed</p>
                    <p>{`+${val.spd.filter((v, i) => { if (v) { return i + 1 } }).length}`}</p>
                </div>
                <div className="reviewSpecialRow">
                    <p className="specialItem specialTitle">Damage</p>
                    <p>{`+${val.dam.filter((v, i) => { if (v) { return i + 1 } }).length}`}</p>
                </div>
            </div>
        </div>)
    } else if (val.type === 'r') {
        return (<div className="reviewSpecialBox">
            <h2 className='reviewNameTitle'>{val.name}</h2>

            <div>
                <div className="reviewSpecialRow">
                    <p className="specialItem specialTitle">Attack</p>
                    <p>{`+${val.atk.filter((v, i) => { if (v) { return i + 1 } }).length}`}</p>
                </div>
                <div className="reviewSpecialRow">
                    <p className="specialItem specialTitle">Speed</p>
                    <p>{`+${val.spd.filter((v, i) => { if (v) { return i + 1 } }).length}`}</p>
                </div>
                <div className="reviewSpecialRow">
                    <p className="specialItem specialTitle">Damage</p>
                    <p>{`+${val.dam.filter((v, i) => { if (v) { return i + 1 } }).length}`}</p>
                </div>
            </div>
        </div>)
    }
}
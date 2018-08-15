import React, {Component} from 'react'

//THERES'S A BUG HERE THAT"S THE BEST I CAN SAY FOR NOW BECAUSE I"M WORKING ON SOMETHING ELSE

export default class WeaponDisplay extends Component {
    render() {
        let {val, alterLevel} = this.props

        let bpCost = val.atk.reduce((t,s,i) => s ? t+=((i + 1) * 8) : t , 0) + (val.def ? val.def.reduce((t,s,i) => s ? t+=((i + 1) * 8) : t , 0) : 0) + val.spd.reduce((t,s,i) => s ? t+=((i + 1) * 8) : t , 0) + val.dam.reduce((t,s,i) => s ? t+=((i + 1) * 8) : t , 0)

        if (val.type === 'm'){
        return (<div>
                <div className="scoreUnderscore step6MainUnderscore step10Undescore"/>            
                    <div className="weaponDisplayTitle">
                        <div className="weaponDisplayTitle inputandbp">
                            <input placeholder="Enter Weapon Name" value={val.name} className="weaponNameInput" onChange={e=>this.props.changeName(val.id, e.target.value)}/> 
                            <p>BP Cost: {bpCost}</p>
                        </div>
                        <button onClick={_=>this.props.deleteSpecial(val.id)}>X</button>
                    </div>
                    <div className="specialMod">
                        <p className="specialItem specialTitle"></p>
                        <p className="specialItem">+1</p>
                        <p className="specialItem">+2</p>
                        <p className="specialItem">+3</p>
                        <p className="specialItem">+4</p>
                        <p className="specialItem">+5</p>
                    </div>
                    <div className="specialColumn">
                        <div className="specialRow">
                            <p className="specialItem specialTitle">Attack</p> {val.atk.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"} onClick={_=>{alterLevel(val.id,i,'atk')}}/>)}
                        </div>
                        <div className="specialRow">                                
                            <p className="specialItem specialTitle">Defence</p>  {val.def.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"} onClick={_=>{alterLevel(val.id,i,'def')}}/>)}
                        </div>
                        <div className="specialRow">                                
                            <p className="specialItem specialTitle">Speed</p>  {val.spd.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"} onClick={_=>{alterLevel(val.id,i,'spd')}}/>)}
                        </div>
                        <div className="specialRow">                                
                            <p className="specialItem specialTitle">Damage</p>  {val.dam.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"} onClick={_=>{alterLevel(val.id,i,'dam')}}/>)}
                        </div>
                   </div>
                </div>
        )}
        if (val.type === 'r') {
            return (<div>
                <div className="scoreUnderscore step6MainUnderscore step10Undescore"/>            
                    <div className="weaponDisplayTitle">
                        <div className="weaponDisplayTitle inputandbp">
                            <input placeholder="Enter Weapon Name" value={val.name} className="weaponNameInput" onChange={e=>this.props.changeName(val.id, e.target.value)}/> 
                            <p>BP Cost: {bpCost}</p>
                        </div>
                        <button onClick={_=>this.props.deleteSpecial(val.id)}>X</button>
                    </div>
                    <div className="specialMod">
                        <p className="specialItem specialTitle"></p>
                        <p className="specialItem">+1</p>
                        <p className="specialItem">+2</p>
                        <p className="specialItem">+3</p>
                        <p className="specialItem">+4</p>
                        <p className="specialItem">+5</p>
                    </div>
                    <div className="specialColumn">
                        <div className="specialRow">
                            <p className="specialItem specialTitle">Attack</p> {val.atk.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"} onClick={_=>{alterLevel(val.id,i,'atk')}}/>)}
                        </div>
                        <div className="specialRow">                                
                            <p className="specialItem specialTitle">Speed</p>  {val.spd.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"} onClick={_=>{alterLevel(val.id,i,'spd')}}/>)}
                        </div>
                        <div className="specialRow">                                
                            <p className="specialItem specialTitle">Damage</p>  {val.dam.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"} onClick={_=>{alterLevel(val.id,i,'dam')}}/>)}
                        </div>
                   </div>
                </div>) 
        }
    }
}
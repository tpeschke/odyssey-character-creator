import React, {Component} from 'react'

export default class WeaponDisplay extends Component {
    render() {
        let {val, alterLevel} = this.props

        let bpCost = val.atk.reduce((t,s) => console.log(s))

        if (val.type === 'm'){
        return (<div>
                    <div className="weaponDisplayTitle">
                        <input placeholder="Enter Weapon" value={val.name}/> 
                        <p>BP Cost: {bpCost}</p>
                        <button>X</button>
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
                            <p className="specialItem specialTitle">Atk</p> {val.atk.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"} onClick={_=>{alterLevel(val.id,i,'atk')}}/>)}
                        </div>
                        <div className="specialRow">                                
                            <p className="specialItem specialTitle">Def</p>  {val.def.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"} onClick={_=>{alterLevel(val.id,i,'def')}}/>)}
                        </div>
                        <div className="specialRow">                                
                            <p className="specialItem specialTitle">Spd</p>  {val.spd.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"} onClick={_=>{alterLevel(val.id,i,'spd')}}/>)}
                        </div>
                        <div className="specialRow">                                
                            <p className="specialItem specialTitle">Dam</p>  {val.dam.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"} onClick={_=>{alterLevel(val.id,i,'dam')}}/>)}
                        </div>
                   </div>
                </div>
        )}
        if (val.type === 'r') {
            return (<div>
               
            </div>
    ) 
        }
    }
}
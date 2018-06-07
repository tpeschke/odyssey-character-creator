import React, {Component} from 'react'

export default class WeaponReview extends Component {
    render() {
        let {val, alterLevel} = this.props

        if (val.type === 'm'){
        return (<div>
                <div className="scoreUnderscore step6MainUnderscore step10Undescore"/>            
                    <div className="weaponDisplayTitle">
                        <div className="weaponDisplayTitle inputandbp">
                            <h2>{val.name}</h2>
                        </div>
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
                        <h2>{val.name}</h2>                            
                        </div>
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
                            <p className="specialItem specialTitle">Attack</p> {val.atk.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"}/>)}
                        </div>
                        <div className="specialRow">                                
                            <p className="specialItem specialTitle">Speed</p>  {val.spd.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"}/>)}
                        </div>
                        <div className="specialRow">                                
                            <p className="specialItem specialTitle">Damage</p>  {val.dam.map((v, i)=> <div key={i} className={v ? "specialItem specialBonus specialBonusOn" : "specialItem specialBonus"}/>)}
                        </div>
                   </div>
                </div>) 
        }
    }
}
import React, {Component} from 'react'

export default class AddNew extends Component {

    createSpecialization = (type) => {
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let text = ''
            for (var i = 0; i < 5; i++){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

        let obj = {id: text}
        if (type === 'm') {
            obj.type = 'm'
            obj.atk = [false,false,false,false,false],
            obj.def = [false,false,false,false,false],
            obj.spd = [false,false,false,false,false],
            obj.dam = [false,false,false,false,false],
            obj.name = ''
        } else if (type === 'r') {
            obj.type = 'r'
            obj.atk = [false,false,false,false,false],
            obj.spd = [false,false,false,false,false],
            obj.dam = [false,false,false,false,false],
            obj.name = ''
        }
        this.props.create(obj)
    }

    render() {
        return(
            <div>
                <div className="scoreUnderscore step6MainUnderscore step10Undescore"/>
                
                <button onClick={_=>this.createSpecialization('m')}>Weapon (Melee)</button>
                <button onClick={_=>this.createSpecialization('r')}>Weapon (Ranged)</button>
                <button onClick={_=>this.createSpecialization('s')}>System</button>
            </div>
        )
    }
}
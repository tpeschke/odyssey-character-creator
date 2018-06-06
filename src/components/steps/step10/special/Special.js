import React, {Component} from 'react'
import AddNew from './AddNew'
import WeaponDisplay from './WeaponDisplay'

import _ from 'lodash'

export default class Specializations extends Component {
    constructor() {
        super()

        this.state = {
            specials: [{id: 1, 
                type :'m',
                atk : [false,false,false,false,false],
                def : [false,false,false,false,false],
                spd : [false,false,false,false,false],
                dam : [false,false,false,false,false],
                name: ''}]
        }
    }

    createNewSpecial = (obj) => {
        let tempArr = _.cloneDeep(this.state.specials)
        this.setState({specials: [...tempArr, obj]})
    }

    alterLevel = (weapon, level, thing) => {
        let tempArr = _.cloneDeep(this.state.specials)

        tempArr.map(v => {
            if (v.id === weapon) {
                v[thing][level] = !v[thing][level]
            }
        })
        this.setState({specials: tempArr})
    }

    render() {
        return(
            <div>

                {this.state.specials.map(val => <WeaponDisplay key={val.id} val={val} alterLevel={this.alterLevel}/>)}

                <AddNew create={this.createNewSpecial} length={this.state.specials.length}/>
            </div>
        )
    }
}
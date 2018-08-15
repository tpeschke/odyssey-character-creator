import React, {Component} from 'react'
import MyCharacters from './MyCharacters'
import VaultBase from './VaultBase'

class ViewCharacters extends Component {
    constructor() {
        super()

        this.state = {
            view: 'my'
        }
    }

    render() {
        let showView = <MyCharacters 
                            changePage={this.props.history.push}/>

        if (this.state.view === 'vault') {
            showView = <VaultBase 
                            changePage={this.props.history.push}/>
        }

        return (
            <div className="stepInner">
                <button onClick={_=>this.setState({view: 'my'})}>My Characters</button>
                <button onClick={_=>this.setState({view: 'vault'})}>Character Vault</button>
                
                {showView}
            </div>
        )
    }
}

export default ViewCharacters
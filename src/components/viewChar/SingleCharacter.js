import React, {Component} from 'react'

class SingleCharacter extends Component {
    render() {
        return (
            <div className="stepInner">
                <button onClick={_=>this.props.history.push('/viewCharacters')}>Back</button>
                SINGLECHARACTER
            </div>
        )
    }
}

export default SingleCharacter
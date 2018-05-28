import React from 'react'

export default function Home (props) {
    return (
        <div>
            <button onClick={_=>props.history.push('/step1')}>New Character</button>    
        </div>
    )
}
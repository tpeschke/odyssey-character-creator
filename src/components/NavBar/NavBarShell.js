import React from 'react'
import NavBar from './NavBar'

export default function NavBarShell (Page, bp) {
    return props => 
        <div>
            <NavBar bp={props.bp}/>
            <Page {...props}/>    
        </div>
}
import React from 'react'
import NavBar from './NavBar'

export default function NavBarShell (Page) {
    return props => 
        <div>
            <NavBar />
            <Page {...props}/>    
        </div>
}
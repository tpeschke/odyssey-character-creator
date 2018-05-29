import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from './components/Home'
import LogIn from './components/LogIn'
import Step1 from './components/steps/Step1'
import Step2 from './components/steps/step2/Step2'
import Step3 from './components/steps/Step3'
import Step4 from './components/steps/Step4'
import Step5 from './components/steps/Step5'
import Step6 from './components/steps/Step6'
import Step7 from './components/steps/Step7'

export default class Routes extends Component {
    
    render() {
        return (
            <div>
                <Switch>
                    <Route component = {LogIn} exact path='/' />
                    <Route component = {Home}  path='/Home' />
                    <Route component = {Step1} path='/step1' />
                    <Route component = {Step2} path='/step2' />
                    <Route component = {Step3} path='/step3' />
                    <Route component = {Step4} path='/step4' />
                    <Route component = {Step5} path='/step5' />
                    <Route component = {Step6} path='/step6' />
                    <Route component = {Step7} path='/step7' />
    
                    <Redirect to='/' />
                </Switch>
            </div>
        )
    }
}
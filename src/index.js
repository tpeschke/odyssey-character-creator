import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter as Router} from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './dux/store'

import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

const httpLink = new HttpLink({uri: 'http://localhost:4141/graphql'})
const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache()
    })

ReactDOM.render(
    <ApolloProvider client={client} >
        <Provider store={store} >
            <Router>
                <App />
            </Router>
        </Provider>
    </ApolloProvider>, document.getElementById('root'));
// registerServiceWorker();

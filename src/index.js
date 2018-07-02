import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter as Router} from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './dux/store'

import { split } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({ uri: 'http://localhost:4141/graphql' })
const wsLink = new WebSocketLink({
    uri: "ws://localhost:4141/subscriptions",
    options: {
        reconnect: true
    }
})

const link = split(
    ({query}) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
)

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client} >
        <Provider store={store} >
            <Router>
                <App />
            </Router>
        </Provider>
    </ApolloProvider>
    , document.getElementById('root'));
// registerServiceWorker();

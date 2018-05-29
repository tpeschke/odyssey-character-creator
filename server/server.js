const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , dotenv = require('dotenv').config()
    , massive = require('massive')
    , gqlHTTP = require('express-graphql')
    , { GraphQLServer } = require('graphql-yoga')
    , graphql = require('graphql')

    const { GraphQLObjectType : GObject, GraphQLString : GString, GraphQLSchema : GSchema, GraphQLID : GID, GraphQLInt : GInt, GraphQLList : GList, GraphQLNonNull: GNonNull } = graphql
    const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

    const app = new express()

    app.use(bodyParser.json())
    app.use(cors())
    app.use( express.static( __dirname + `/../build` ) );
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }))

//==============NO AUTH REQUIRED ENPOINTS=========\\\



///////////////////////////////////
////TESTING TOPLEVEL MIDDLEWARE////
///COMMENET OUT WHEN AUTH0 READY///
///////////////////////////////////
app.use((req, res, next) =>{
    if(!req.session.user){
        req.session.user = {
            id: 1,
            user_name: "harrison ford", 
            email: "adventureBuilder2049@gmail.com", 
            name: "adventure", 
            profile_picture : "http://www.placekitten.com/200/250",
            auth_id: "adsgfhaoibjmoi5wrhgiuaosfngiuasdhg;ioarhdgv;ou"
        }
    }
    next();
})

// ===========AUTHENTICATION===========\\

app.get('/loginDummy', (req, res)=>res.send('hello'))

// ===========AUTH END POINTS===========\\


//============GRAPH QL SCHEMA============\\
const AlienType = new GObject({
    name: "Alien",
    fields: ()=> ({
        id: {type: GID},
        species: {type: GString}
    })
})

const RootQuery = new GObject({
    name: 'RootQueryType',
    fields: {
        aliens: {
            type: new GList(AlienType),
            resolve(parent, args) {
                return db().aliens.find()
            }
        }
    }
}) 

// ===========CONECTION THINGS============\\

const db = function() {
    return app.get('db')
}

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    
    app.use('/graphql', gqlHTTP({
        schema: new GSchema({query: RootQuery}),
        graphiql: true
    }))
    
    app.listen(SERVER_PORT, _=> console.log(`Sing the song of your heart and read the mourning engraved there ${SERVER_PORT}`))
})
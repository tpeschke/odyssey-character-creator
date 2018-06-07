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
        species: {type: GString},
        description: {type: GString}
    })
})

const BackgroundType = new GObject({
    name: "Background",
    fields: () => ({
        id: {type: GID},
        category: {type: GString},
        name: {type: GString},
        price: {type: GInt},
        description: {type: GString}
    })
})

const TalentType = new GObject({
    name: 'Talent',
    fields: () => ({
        id: {type: GID},
        name: {type: GString},
        price: {type: GInt},
        description: {type: GString},
        multi: {type: GString}
    })
})

const ProficType = new GObject({
    name: "Proficiencies",
    fields: () => ({
        id: {type: GID},
        name: {type: GString},
        price: {type: GInt},
        multi: {type: GString},
        description: {type: GString},
        preReq: {
            type: new GList(ProficReq),
            resolve(parent, args) {
                return db().getProficPreReqs([parent.id]) 
            }
        }
    })
})

const ProficReq = new GObject({
    name: "ProficReq",
    fields: () => ({
        id: {type: GID},
        name: {type: GString},
        score: {type: GInt},
        type: {type: GString}
    })
})

const QfTypes = new GObject({
    name: "quirksNFlaws",
    fields: () => ({
        id: {type: GID},
        name: {type: GString},
        rangestart: {type: GInt},
        rangeend: {type: GInt}
    })
})

const QuirkType = new GObject({
    name: 'getQuirk',
    fields: () => ({
        id: {type: GID},
        name: {type: GString},
        bp: {type: GInt}
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
        },
        backgrounds: {
            type: new GList(BackgroundType),
            args: { search: { type: GString} },
            resolve(parent, args) {
                return db().searchBackgrounds([args.search.toUpperCase()])
            }
        },
        talents: {
            type: new GList(TalentType),
            resolve(parent, args) {
                return db().talents.find()
            }
        },
        proficiencies: {
            type: new GList(ProficType),
            resolve(parent, args) {
                return db().proficiencies.find()
            }
        },
        quirksNFlaws: {
            type: new GList(QfTypes),
            args: { roll: {type: GString} },
            resolve(parents, args) {
                return db().getQuirkTable([+args.roll])
            }
        },
        getQuirk: {
            type: new GList(QuirkType),
            args: { roll: {type: GString}, table: {type: GString} },
            resolve(parents, args) {
                if (+args.table === 1) {
                    return db().getMentalQuirk([+args.roll])
                } else if (+args.table === 3) {
                    return db().getPhysicalFlaws([+args.roll])
                }
            }
        }
    }
}) 

const Mutation = new GObject({
    name: "Mutation",
    fields : {
        addCharacter: {
            args: {
                bp: {type: new GNonNull(GInt)},
                species: {type: new GNonNull(GInt)},
                scores: {type: new GNonNull(GObject)},
                background: {type: new GNonNull(GInt)},
                talents: {type: new GNonNull(GObject)},
                profics: {type: new GNonNull(GObject)},
                special: {type: new GNonNull(GObject)},
                hp: {type: new GNonNull(GInt)},
                credits: {type: new GNonNull(GInt)},
                qf: {type: new GNonNull(GObject)}
            },
            resolve(parent, args) {
                console.log(args)
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
        schema: new GSchema({query: RootQuery, mutation: Mutation}),
        graphiql: true
    }))
    
    app.listen(SERVER_PORT, _=> console.log(`Sing the song of your heart and read the mourning engraved there ${SERVER_PORT}`))
})
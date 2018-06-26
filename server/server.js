const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , dotenv = require('dotenv').config()
    , massive = require('massive')
    , { GraphQLServer } = require('graphql-yoga')
    , { typeDefs } = require('./schema')
    , { makeExecutableSchema } = require('graphql-tools')
    , { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express()

app.use(bodyParser.json())
app.use(cors())
// app.use( express.static( __dirname + `/../build` ) );
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
app.use((req, res, next) => {
    if (!req.session.user) {
        req.session.user = {
            id: 1,
            user_name: "harrison ford",
            email: "adventureBuilder2049@gmail.com",
            name: "adventure",
            profile_picture: "http://www.placekitten.com/200/250",
            auth_id: "adsgfhaoibjmoi5wrhgiuaosfngiuasdhg;ioarhdgv;ou"
        }
    }
    next();
})

// ===========AUTHENTICATION===========\\

app.get('/loginDummy', (req, res) => {
    req.app.set('user', req.session.user.id)
    res.send('hello')
})

// ===========AUTH END POINTS===========\\


//============GRAPH QL SCHEMA============\\
// const AlienType = new GObject({
//     name: "Alien",
//     fields: ()=> ({
//         id: {type: GID},
//         species: {type: GString},
//         description: {type: GString},
//         selected: {type: GString}
//     })
// })

// const CharacterType = new GObject({
//     name: "character",
//     fields: () => ({
//         id: {type: GID},
//         name: {type: GString},
//         bp: {type: GInt},
//         species: {type: GInt},
//         scores: {type: GString},
//         background: {type: GInt},
//         talents: {type: GString},
//         // profics: {type: GObject},
//         special: {type: GString},
//         hp: {type: GInt},
//         credits: {type: GInt},
//         qf: {type: GString}
//     })
// })


// const RootQuery = new GObject({
//     name: 'RootQueryType',
//     fields: {
//         aliens: {
//             type: new GList(AlienType),
//             resolve(parent, args) {
//                 return db().aliens.find()
//             }
//         },
//     }
// }) 

// const Mutation = new GObject({
//     name: "Mutation",
//     fields : {
//         addCharacter: {
//             type: CharacterType,
//             args: {
//                 name: {type: new GNonNull(GString)},
//                 bp: {type: new GNonNull(GInt)},
//                 species: {type: new GNonNull(GInt)},
//                 scores: {type: new GNonNull(GString)},
//                 background: {type: new GNonNull(GInt)},
//                 talents: {type: new GNonNull(GString)},
//                 // profics: {type: new GNonNull(GObject)},
//                 special: {type: new GNonNull(GString)},
//                 hp: {type: new GNonNull(GInt)},
//                 credits: {type: new GNonNull(GInt)},
//                 qf: {type: new GNonNull(GString)}
//             },
//             resolve(parent, args) {
//                 let scores = JSON.parse(args.scores)
//                 let qf = JSON.parse(args.qf)
//                 let talents = JSON.parse(args.talents)
//                 let special = JSON.parse(args.special)

//                 db().create.stats([scores.STR, scores.INT, scores.WIS, scores.DEX, scores.CON, scores.CHA, scores.LKS, scores.REP]).then( req => {
//                     scores = req[0].id
//                     db().create.main([user(), args.bp, args.species, args.background, args.hp, args.credits, scores, args.name]).then(req => {

//                         qf.forEach( v => {
//                             if (+v.table === 1) {
//                                 db().update.mentalquirks([+v.id])
//                             } else if (+v.table === 3) {
//                                 db().update.physicalquirks([+v.id])
//                             } else {
//                                 db().update.behaviorquirks([+v.id])
//                             }
//                                 db().create.qf([req[0].id, v.id, v.table])
//                             } )                           
//                         talents.forEach( v => db().create.talents([req[0].id, v]) )
//                         special ? special.forEach( v => db().create.specialMain([req[0].id, v.name, v.type]).then(result => {
//                             for (let key in v) {
//                                 if (Array.isArray(v[key])) {
//                                     db().create.specialModifier([result[0].id,`${key}`, v[key][0] ? '1' : '0', v[key][1] ? '1' : '0', v[key][2] ? '1' : '0', v[key][3] ? '1' : '0', v[key][4] ? '1' : '0'])
//                                 }
//                             }
//                         })) : null

//                         // SUBSCRIPTION
//                         db().aliens.find().then(req => {
//                             console.log('first')
//                             pubsub.publish("ALIENS_UPDATED", {updateAliens: req})
//                         })
//                     })
//                 })
//             } 
//         }
//     }
// })

const resolvers = {
    Query: {
        aliens: _ => db().aliens.find(),
        backgrounds: (_, { search }) => db().searchBackgrounds([search.toUpperCase()]),
        talents: _ => db().talents.find(),
        proficiencies: _ => db().proficiencies.find(),
        quirkTables: (_, { roll }) => db().getQuirkTable([+roll]),
        getQuirk: (_, { roll, table }) => {
            if (table === 1) {
                return db().getMentalQuirk([roll])
            } else if (table === 3) {
                return db().getPhysicalFlaws([roll])
            } else {
                return db().getBehavioralQuirk([roll])
            }
        }
    },
    Alien: {
        id: root => root.id,
        species: root => root.species,
        description: root => root.description,
        selected: root => root.selected,
    },
    Background: {
        id: root => root.id,
        category: root => root.category,
        name: root => root.name,
        price: root => root.price,
        description: root => root.description,
        selected: root => root.selected,
    },
    Talent: {
        id: root => root.id,
        name: root => root.name,
        price: root => root.price,
        description: root => root.description,
        multi: root => root.multi,
    },
    proficiency: {
        id: root => root.id,
        name: root => root.name,
        price: root => root.price,
        multi: root => root.multi,
        description: root => root.description,
        preReq: root => db().getProficPreReqs([root.id]),
    },
    quirkTable: {
        id: root => root.id,
        name: root => root.name,
    },
    quirk: {
        id: root => root.id,
        name: root => root.name,
        bp: root => root.bp
    }
}

// ===========CONECTION THINGS============\\
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

const db = function () {
    return app.get('db')
}

const user = function () {
    return app.get('user')
}

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)

    app.listen(SERVER_PORT, _ => console.log(`Sing the song of your heart and read the mourning engraved there ${SERVER_PORT}`))
})
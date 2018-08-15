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
    , { PubSub, withFilter } = require('graphql-subscriptions')
    , { execute, subscribe } = require('graphql')
    , { createServer } = require('http')
    , { SubscriptionServer } = require('subscriptions-transport-ws')

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

app.delete('/deleteCharacter/:id', ({app, params}, res) => {
    //Add logic to check if character owner matches user id
    const db = app.get('db')
    db.deleteCharacter([params.id]).then( _ => res.sendStatus(200) )
})

//============GRAPH QL RESOLVERS============\\
const pubsub = new PubSub();

const resolvers = {
    Query: {
        aliens: _ => db().aliens.find(),
        backgrounds: (_, { search }) => db().searchBackgrounds([search.toUpperCase()]),
        talents: _ => db().talents.find(),
        proficiencies: _ => db().proficiencies.find(),
        quirkTables: (_, { roll }) => db().get.quirkTable([+roll]),
        getQuirk: (_, { roll, table }) => {
            if (table === 1) {
                return db().get.mentalQuirk([roll])
            } else if (table === 2) {
                return db().get.behavioralQuirk([roll])
            } else if (table === 3) {
                return db().get.physicalFlaw([roll])
            }
        },
        getAllQuirks: (_, { table }) => {
            if (table === 1) {
                return db().get.allMentalQuirks()
            } else if (table === 2) {
                return db().get.allBehavioralQuirks()
            } else if (table === 3) {
                return db().get.allPhysicalFlaws()
            }
        },
        getMyCharacters: _ => db().get.myCharacters([user()]),
        getAllCharacters: _ => db().get.allCharacters([user()]),
        getSingleCharacter: (_, { id }) => db().get.singleCharacter(id)
    },
    Mutation: {
        addCharacter: (_, args) => {
            let scores = JSON.parse(args.scores)
            let qf = JSON.parse(args.qf)
            let talents = JSON.parse(args.talents)
            let special = JSON.parse(args.special)
            let profics = JSON.parse(args.profics)

            db().create.stats([scores.STR, scores.INT, scores.WIS, scores.DEX, scores.CON, scores.CHA, scores.LKS, scores.REP]).then(req => {
                scores = req[0].id
                db().create.main([user(), args.bp, args.species, args.background, args.hp, args.credits, scores, args.name]).then(req => {

                    qf.forEach(v => {
                        if (+v.table === 1) {
                            db().update.mentalquirks([+v.id])
                        } else if (+v.table === 3) {
                            db().update.physicalquirks([+v.id])
                        } else {
                            db().update.behaviorquirks([+v.id])
                        }
                        db().create.qf([req[0].id, v.id, v.table])
                    })
                    talents ? talents.forEach(v => db().create.talents([req[0].id, v])) : null
                    profics ? profics.forEach(v => db().create.profics([req[0].id, v])) : null
                    special ? special.forEach(v => db().create.specialMain([req[0].id, v.name, v.type]).then(result => {
                        for (let key in v) {
                            if (Array.isArray(v[key])) {
                                db().create.specialModifier([result[0].id, `${key}`, v[key][0] ? '1' : '0', v[key][1] ? '1' : '0', v[key][2] ? '1' : '0', v[key][3] ? '1' : '0', v[key][4] ? '1' : '0'])
                            }
                        }
                    })) : null

                    // SUBSCRIPTIONS
                }).then(_ => db().aliens.find().then(req => {
                    let alienUpdate = req.filter(val => val.id === +args.species)[0]
                    let backgroundUpdate = req.filter(val => val.id === +args.background)[0]
                    pubsub.publish('alienUpdate', {alienUpdate})
                    pubsub.publish('backgroundUpdate', {backgroundUpdate})
                })
                )
            })
        }
    },
    Subscription: {
        alienUpdate: {
            subscribe: _ => pubsub.asyncIterator('alienUpdate')
        },
        backgroundUpdate: {
            subscribe: _ => pubsub.asyncIterator('backgroundUpdate')
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
    Proficiency: {
        id: root => root.id,
        name: root => root.name,
        price: root => root.price,
        multi: root => root.multi,
        description: root => root.description,
        preReq: root => db().get.proficPreReqs([root.id]),
    },
    QuirkTable: {
        id: root => root.id,
        name: root => root.name,
    },
    Quirk: {
        id: root => root.id,
        name: root => root.name,
        bp: root => root.bp
    },
    GetCharacterInfo: {
        id: root => root.id,
        name: root => root.name,
        species: root => db().aliens.findOne({ id: root.species }, { fields: ['species'] }).then(req => req.species),
        background: root => db().backgrounds.findOne({ id: root.background }, { fields: ['name'] }).then(req => req.name),
    },
    WholeCharacter: {
        id: root => root.id,
        name: root => root.name,
        bp: root => root.bp,
        species: root => db().aliens.findOne({ id: root.species }, { fields: ['species'] }).then(req => req.species),
        scores: root => db().get.sCscores([root.id]).then(req => JSON.stringify(req)),
        background: root => db().backgrounds.findOne({ id: root.background }, { fields: ['name'] }).then(req => req.name), 
        talents: root => db().get.sCtalents([root.id]).then(req => JSON.stringify(req)),
        profics: root => db().get.sCprofics([root.id]).then(req => JSON.stringify(req)), 
        special: root => db().get.sCspecials([root.id]).then(req => {
            let tempArr = req.map(val => db().get.sCspecialMod( val.id ).then(result => {
                    let {charid, ...special} = val
                    result.forEach(v => Object.assign(special, {[v.modified]: [
                        v.one === '1' ? true : false,
                        v.two === '1' ? true : false,
                        v.three === '1' ? true : false,
                        v.four === '1' ? true : false,
                        v.five === '1' ? true : false, 
                    ]}))
                    return special
                })
            )
            return Promise.all(tempArr).then(final => JSON.stringify(final))
        }),
        hp: root => root.hp,
        credits: root => root.credits,
        qf: root => db().get.sCqf([root.id]).then(req => {
            let tempArray = []
            req.forEach(({qfid, tableid})=> {
                if (+tableid === 1) {
                    tempArray.push( db().mentalquirks.findOne({id : +qfid}, {fields: ['id', 'name']}) )
                } else if (+tableid === 3) {
                    tempArray.push( db().physicalquirks.findOne({id : +qfid}, {fields: ['id', 'name']}) )
                } else {
                    tempArray.push( db().behavioralquirks.findOne({id : +qfid}, {fields: ['id', 'name']}) )
                }
            })
            return Promise.all(tempArray).then( val => JSON.stringify(val) )
        })
    }
}

// ===========CONECTION THINGS============\\
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.get('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'ws://localhost:4141/subscriptions'
}))

const db = function () {
    return app.get('db')
}

const user = function () {
    return app.get('user')
}

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)

    const ws = createServer(app)

    ws.listen(SERVER_PORT, _ => console.log(`Sing the song of your heart and read the mourning engraved there ${SERVER_PORT}`))

    new SubscriptionServer({
        execute,
        subscribe,
        schema
    }, {
            server: ws,
            path: '/subscriptions'
        })
    // app.listen(SERVER_PORT, _ => console.log(`Sing the song of your heart and read the mourning engraved there ${SERVER_PORT}`))
})

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

app.get('/loginDummy', (req, res)=> {
    req.app.set('user', req.session.user.id)
    res.send('hello')})

// ===========AUTH END POINTS===========\\


//============GRAPH QL SCHEMA============\\
const AlienType = new GObject({
    name: "Alien",
    fields: ()=> ({
        id: {type: GID},
        species: {type: GString},
        description: {type: GString},
        selected: {type: GString}
    })
})

const BackgroundType = new GObject({
    name: "Background",
    fields: () => ({
        id: {type: GID},
        category: {type: GString},
        name: {type: GString},
        price: {type: GInt},
        description: {type: GString},
        selected: {type: GString}
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

const CharacterType = new GObject({
    name: "character",
    fields: () => ({
        id: {type: GID},
        name: {type: GString},
        bp: {type: GInt},
        species: {type: GInt},
        scores: {type: GString},
        background: {type: GInt},
        talents: {type: GString},
        // profics: {type: GObject},
        special: {type: GString},
        hp: {type: GInt},
        credits: {type: GInt},
        qf: {type: GString}
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
            type: CharacterType,
            args: {
                name: {type: new GNonNull(GString)},
                bp: {type: new GNonNull(GInt)},
                species: {type: new GNonNull(GInt)},
                scores: {type: new GNonNull(GString)},
                background: {type: new GNonNull(GInt)},
                talents: {type: new GNonNull(GString)},
                // profics: {type: new GNonNull(GObject)},
                special: {type: new GNonNull(GString)},
                hp: {type: new GNonNull(GInt)},
                credits: {type: new GNonNull(GInt)},
                qf: {type: new GNonNull(GString)}
            },
            resolve(parent, args) {
                let scores = JSON.parse(args.scores)
                let qf = JSON.parse(args.qf)
                let talents = JSON.parse(args.talents)
                let special = JSON.parse(args.special)

                db().create.stats([scores.STR, scores.INT, scores.WIS, scores.DEX, scores.CON, scores.CHA, scores.LKS, scores.REP]).then( req => {
                    scores = req[0].id
                    db().create.main([user(), args.bp, args.species, args.background, args.hp, args.credits, scores, args.name]).then(req => {
                
                        qf.forEach( v => {
                            if (+v.table === 1) {
                                db().update.mentalquirks([+v.id])
                            } else if (+v.table === 3) {
                                db().update.physicalquirks([+v.id])
                            } 
                                db().create.qf([req[0].id, v.id, v.table])
                            } )                           
                        talents.forEach( v => db().create.talents([req[0].id, v]) )
                        special ? special.forEach( v => db().create.specialMain([req[0].id, v.name, v.type]).then(result => {
                            for (let key in v) {
                                if (Array.isArray(v[key])) {
                                    db().create.specialModifier([result[0].id,`${key}`, v[key][0] ? '1' : '0', v[key][1] ? '1' : '0', v[key][2] ? '1' : '0', v[key][3] ? '1' : '0', v[key][4] ? '1' : '0'])
                                }
                            }
                        })) : null
                    })
                })
            } 
        }
    }
})

// ===========CONECTION THINGS============\\

const db = function() {
    return app.get('db')
}

const user = function() {
    return app.get('user')
}

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    
    app.use('/graphql', gqlHTTP({
        schema: new GSchema({query: RootQuery, mutation: Mutation}),
        graphiql: true
    }))
    
    app.listen(SERVER_PORT, _=> console.log(`Sing the song of your heart and read the mourning engraved there ${SERVER_PORT}`))
})
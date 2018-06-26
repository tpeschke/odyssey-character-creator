module.exports = {
    typeDefs: `
    type Query {
        aliens: [Alien!]
        backgrounds (search: String!): [Background!]
        talents: [Talent!]
        proficiencies: [proficiency!]
        quirkTables (roll: Int!): [quirkTable!]
        getQuirk (roll: Int!, table: Int!): [quirk!]
    }

    # =========================== #

    type Mutation {
        addCharacter (  name: String!,
                        bp: Int!,
                        species: Int!,
                        scores: String!,
                        background: Int!,
                        talents: String!,
                        profics: String!,
                        special: String!,
                        hp: Int!,
                        credits: Int!,
                        qf: String!
                    ): [wholeCharacter!]
    }
    
    # =========================== #
    
    type Alien {
        id: ID!
        species: String!
        description: String!
        selected: String!
    }
    
    type Background {
        id: ID!
        category: String!
        name: String!
        price: Int!
        description: String!
        selected: String!
    }

    type Talent {
        id: ID!
        name: String!
        price: Int!
        description: String!
        multi: String!
    }

    type proficiency {
        id: ID!
        name: String!
        price: Int!
        multi: String!
        description: String!
        preReq: [proficReq]
    }

    type proficReq {
        id: ID!,
        name: String!,
        score: Int!
        type: String!
    }

    type quirkTable {
        id: ID!
        name: String!
    }

    type quirk {
        id: ID!
        name: String!
        bp: Int!
    }

    type wholeCharacter {
        id: ID!
        name: String!
        bp: Int!
        species: Int!
        scores: String!
        background: Int!
        talents: String!
        profics: String!
        special: String!
        hp: Int!
        credits: Int!
        qf: String!
    }
    `
}



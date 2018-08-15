module.exports = {
    typeDefs: `
    type Query {
        aliens: [Alien!]
        backgrounds (search: String!): [Background!]
        talents: [Talent!]
        proficiencies: [Proficiency!]
        quirkTables (roll: Int!): [QuirkTable!]
        getQuirk (roll: Int!, table: Int!): [Quirk!]
        getAllQuirks (table: Int!): [Quirk!]
        getMyCharacters: [GetCharacterInfo!]
        getAllCharacters: [GetCharacterInfo!]
        getSingleCharacter (id: Int!): [WholeCharacter!] 
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
                    ): [WholeCharacter!]
    }
    
    # =========================== #

    type Subscription {
        alienUpdate: Alien,
        backgroundUpdate: Background
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

    type Proficiency {
        id: ID!
        name: String!
        price: Int!
        multi: String!
        description: String!
        preReq: [ProficReq]
    }

    type ProficReq {
        id: ID!,
        name: String!,
        score: Int!
        type: String!
    }

    type QuirkTable {
        id: ID!
        name: String!
    }

    type Quirk {
        id: ID!
        name: String!
        bp: Int!
    }

    type WholeCharacter {
        id: ID!
        name: String!
        bp: Int!
        species: String!
        scores: String!
        background: String!
        talents: String!
        profics: String!
        special: String!
        hp: Int!
        credits: Int!
        qf: String!
    }

    type Scores {
        id: Int!
        str: String!
        int: String!
        wis: String!
        dex: String!
        con: String!
        cha: String!
        lks: String!
        rep: String!
    }

    type GetCharacterInfo {
        id: ID!
        name: String!
        species: String!
        background: String!
    }
    `
}



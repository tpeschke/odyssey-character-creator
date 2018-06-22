module.exports = {
    typeDefs: `
    type Query {
        aliens: [Aliens!]
    }
    
    # =========================== #
    
    type Aliens {
        id: ID!
        species: String!
        description: String!
        selected: String!
    }`
}



const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Policy {
    legislation: String
    countryCode: [String]
    topic: String
    status: String
    description: String
    lastUpdated: String
    dateCreated: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  input PolicyInput {
    legislation: String
    countryCode: [String]
    topic: String
    status: String
    description: String
    lastUpdated: String
    dateCreated: String
  }
`;

module.exports = typeDefs;

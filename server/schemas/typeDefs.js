const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    starredPolicies: [Policy]
  }

  type Policy {
    _id: ID
    legislation: String!
    countryCode: String!
    topic: String
    status: String
    description: String
    lastUpdated: String!
    dateCreated: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(_id: ID!): User
    checkout: Checkout
    policy(_id: ID!): Policy
    searchPolicies(policyInput: PolicyInput): [Policy]
    policies(topic: String, countryCode: String, status: String): [Policy]
  }

  type Checkout {
    session: ID
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPolicy(legislation: String!, countryCode: String!, topic: String!, status: String, description: String, lastUpdated: String!, dateCreated: String!): Policy
    updatePolicy(_id: ID!, legislation: String, countryCode: String, topic: String, status: String, description: String, lastUpdated: String, dateCreated: String): Policy
    deletePolicy(_id: ID!): Policy
    starPolicy(policyId: ID!): User
    unstarPolicy(policyId: ID!): User
  }

  input PolicyInput {
    _id: ID
    legislation: String
    countryCode: String
    topic: String
    status: String
    description: String
    lastUpdated: String
    dateCreated: String
  }
`;

module.exports = typeDefs;

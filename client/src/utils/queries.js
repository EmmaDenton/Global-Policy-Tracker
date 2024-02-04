import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      starredPolicies {
        _id
        legislation
        countryCode
        topic
        status
        description
        lastUpdated
        dateCreated
      }
    }
  }
`;

export const GET_POLICIES = gql`
query getAllPolicies {
  policies {
    _id
    legislation
    description
  }
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout{
    checkout{
      session
    }
  }
`;


export const SEARCH_POLICIES = gql`
  query searchPolicies($policyInput: PolicyInput) {
    searchPolicies(policyInput: $policyInput) {
      _id
      legislation
      countryCode
      topic
      status
      description
      lastUpdated
      dateCreated
    }
  }
`;

export const STAR_POLICY = gql`
  mutation starPolicy($policyId: ID!) {
    starPolicy(policyId: $policyId) {
      _id
      username
      starredPolicies {
        _id
        legislation
        topic
        status
        description
        lastUpdated
      }
    }
  }
`;

export const UNSTAR_POLICY = gql`
  mutation unstarPolicy($policyId: ID!) {
    unstarPolicy(policyId: $policyId) {
      _id
      username
      starredPolicies {
        _id
        legislation
        topic
        status
        description
        lastUpdated
      }
    }
  }
`;
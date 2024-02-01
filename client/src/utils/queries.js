import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
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
query searchPolicies ($policyInput: PolicyInput) 
{
  searchPolicies (policyInput: $policyInput) {
    legislation
    countryCode
    status
    topic
    description
    lastUpdated
    dateCreated
  }
} 
`;
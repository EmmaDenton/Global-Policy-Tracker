import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_POLICIES } from '../utils/queries';
import { GET_ME } from '../utils/queries';

const SavedPolicy = () => {
  const { loading: loadingPolicies, data: policiesData } = useQuery(GET_POLICIES);
  const { loading: loadingUser, data: userData } = useQuery(GET_ME);

  const [starredPolicies, setStarredPolicies] = useState([]);

  useEffect(() => {
    if (!loadingPolicies && !loadingUser && policiesData && userData) {
      // Extract starred policies IDs
      const starredIds = new Set(userData.me.starredPolicies.map(p => p._id));
      // Filter all policies by checking if their ID is in starredIds
      const filteredPolicies = policiesData.policies.filter(policy => starredIds.has(policy._id));
      setStarredPolicies(filteredPolicies);
    }
  }, [loadingPolicies, loadingUser, policiesData, userData]);

  if (loadingPolicies || loadingUser) return <div>Loading...</div>;

  return (
    <div id="mainContainer2">
      <ul>
        {starredPolicies.length ? (
          starredPolicies.map((policy) => (
            <li key={policy._id} className="resultsCard">
              <div className="content-left">
              <div className='legislation'>{policy.legislation}</div> 
              <div className='countrTitle'>{policy.country}</div>
              <div className='topic'>{policy.topic}</div>
              <div className='Description'>{policy.description}</div>
              </div>
              <div className="content-right">
              <div className='lastUpdated'>{policy.lastUpdated}</div>
              <div 
                className='status' 
                style={{
                  backgroundColor: policy.status === 'Implemented' ? '#B8F8D5' : 
                                  policy.status === 'Not Yet Drafted' ? '#FAD02E' : 
                                  policy.status === 'Passed' ? '#B8F8D5' : 
                                  policy.status === 'In Progress' ? '#F4A261' : 'transparent',
                  display: 'inline-flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '15px',
                  padding: '0px 10px',
                  fontSize: '14px',
                  width: 'auto',
                  height: '20px'
                }}
              >
                {policy.status}
              </div>
              </div>
            </li>
          ))
        ) : (
          <li>You have not starred any policies yet.</li>
        )}
      </ul>
    </div>
  )}

export default SavedPolicy;

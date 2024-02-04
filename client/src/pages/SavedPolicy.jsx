import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_POLICIES } from '../utils/queries'; // Import or define this
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
    <div>
      <h2>My Starred Policies</h2>
      {starredPolicies.length ? (
        <ul>
          {starredPolicies.map((policy) => (
            <li key={policy._id}>
              <h3>{policy.legislation}</h3>
              <p>{policy.description}</p>
              {/* Add more policy details here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not starred any policies yet.</p>
      )}
    </div>
  );
};

export default SavedPolicy;

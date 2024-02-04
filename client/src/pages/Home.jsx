
import { useLazyQuery, useMutation } from '@apollo/client';
import Map from '../components/Map';
import React, { useEffect, useState, useCallback } from 'react';
import { SEARCH_POLICIES, STAR_POLICY, UNSTAR_POLICY } from '../utils/queries';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');


  const [starPolicy] = useMutation(STAR_POLICY);
  const [unstarPolicy] = useMutation(UNSTAR_POLICY);

  // Function to star a policy
  const handleStarPolicy = (policyId) => {
    console.log(policyId)
    starPolicy({
      variables: { policyId },
      refetchQueries: [{ query: SEARCH_POLICIES }]
    }).catch(err => console.error(err));
  };

  // Function to unstar a policy
  const handleUnstarPolicy = (policyId) => {
    console.log(policyId)
    unstarPolicy({
      variables: { policyId },
      refetchQueries: [{ query: SEARCH_POLICIES }]
    }).catch(err => console.error(err));
  };


  const [searchPolicies, { data, loading, error }] = useLazyQuery(SEARCH_POLICIES);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    searchPolicies({ 
      variables: {
        policyInput: { 
          legislation: searchTerm,
          countryCode: selectedCountry,
          topic: selectedTopic,
          status: selectedStatus,
        }
      }
    });
  };

  const searchedPolicies = data?.searchPolicies || [];


//Map click handler

  useEffect(() => {
    if (selectedCountry) {
      searchPolicies({
        variables: {
          policyInput: {
            countryCode: selectedCountry,
            legislation: searchTerm,
            topic: selectedTopic,
            status: selectedStatus,
          },
        },
      });
    }
  }, [selectedCountry, searchPolicies, searchTerm, selectedTopic, selectedStatus]);

  return (
    <main id='mainContainer2'>
      <div className="flex-row justify-center">
      </div>
      <div>
      <Map setSelectedCountry={setSelectedCountry}/>
      <div>
      <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />
          <select class="ui fluid dropdown" value={selectedCountry} onChange={(e) => {setSelectedCountry(e.target.value); handleFormSubmit(e)}}>
          <option value="">Country</option>
            <option value="aus">Australia</option>
          </select>
          <select class="ui fluid dropdown" value={selectedTopic} onChange={(e) => {setSelectedTopic(e.target.value); handleFormSubmit(e)}}>
            <option value="">Topic</option>
            <option value="aI">AI</option>
            <option value="Competition">Competition</option>
            <option value="e-commerce">E-commerce</option>
            <option value="onlineSafety">Online Safety</option>
          </select>
          <select class="ui fluid dropdown" value={selectedStatus} onChange={(e) => {setSelectedStatus(e.target.value); handleFormSubmit(e)}}>
          <option value="">Status</option>
            <option value="notYetDrafted">Not Yet Drafted</option>
            <option value="passed">Passed</option>
            <option value="implemented">Implemented</option>
            <option value="inProgress">In Progress</option>
          </select>
          <button onClick={handleFormSubmit}>Submit</button>
      </div>
      {searchedPolicies.map((policy) => {
            return (
      <div key={policy._id}>
        <div className='legislation'>{policy.legislation}</div>
        <div className='topic'>{policy.topic}</div>
        <div className='status'>{policy.status}</div>
        <div className='lastUpdated'>{policy.lastUpdated}</div>
        <div className='Description'>{policy.description}</div>
        <div>Supporting Documents</div>
        <div className='Links'>{policy.links}</div>
          <div key={policy._id}>
            {/* Existing policy details */}
            <button onClick={() => handleStarPolicy(policy._id)}>Star</button>
            <button onClick={() => handleUnstarPolicy(policy._id)}>Unstar</button>
          </div>
      </div>
       )})};
      </div>
    </main>
  );
};


export default Home;


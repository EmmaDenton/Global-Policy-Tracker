
import { useLazyQuery, useMutation } from '@apollo/client';
import Map from '../components/Map';
import React, { useEffect, useState, useCallback } from 'react';
import { SEARCH_POLICIES, STAR_POLICY, UNSTAR_POLICY } from '../utils/queries';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [starredPolicyIds, setStarredPolicyIds] = useState(new Set());
  const [countriesWithPolicies, setCountriesWithPolicies] = useState(new Set());

  const [searchPolicies, { data, loading, error }] = useLazyQuery(SEARCH_POLICIES, {
    fetchPolicy: "cache-and-network"
  });

  const handleCountryClick = (countryCode) => {
    setSelectedCountry(countryCode);
    // You can also trigger a search directly here if needed
    handleSearch({ countryCode });
  };

  useEffect(() => {
    searchPolicies({
      onCompleted: (data) => {
        if (data?.searchPolicies) {
          const uniqueCountries = new Set(data.searchPolicies.map(policy => policy.countryCode));
          setCountriesWithPolicies(uniqueCountries);
        }
      }
    });
  }, [searchPolicies]);



  const [starPolicy] = useMutation(STAR_POLICY);
  const [unstarPolicy] = useMutation(UNSTAR_POLICY);

  // Function to star a policy
  const handleStarPolicy = (policyId) => {
    console.log(policyId)
    starPolicy({
      variables: { policyId },
      onCompleted: (data) => {
        setStarredPolicyIds(prev => new Set(prev).add(policyId));
      }
    }).catch(err => console.error(err));
  };

  // Function to unstar a policy
  const handleUnstarPolicy = (policyId) => {
    console.log(policyId)
    unstarPolicy({
      variables: { policyId },
      onCompleted: (data) => {
        setStarredPolicyIds(prev => {
          const newIds = new Set(prev);
          newIds.delete(policyId);
          return newIds;
        });
      }
    }).catch(err => console.error(err));
  };

  const handleSearch = useCallback(({ countryCode, legislation, topic, status }) => {
    searchPolicies({
      variables: {
        policyInput: {
          countryCode: countryCode || selectedCountry,
          legislation: legislation || searchTerm,
          topic: topic || selectedTopic,
          status: status || selectedStatus,
        },
      },
    });
  }, [searchPolicies, selectedCountry, searchTerm, selectedTopic, selectedStatus]);
  const searchedPolicies = data?.searchPolicies || [];


//Handle search feature
const handleFormSubmit = (event) => {
  event.preventDefault();
  handleSearch({});
};
  return (
    <main id='mainContainer2'>
      <div >
      <Map setSelectedCountry={setSelectedCountry} onCountryClick={handleCountryClick} countriesWithPolicies={Array.from(countriesWithPolicies)} />
      <div className="ui right action left icon input">
      <i className="search icon"></i>
      <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="ui action input formInput"
          />
          <select className="ui fluid search selection dropdown" value={selectedTopic} onChange={(e) => {setSelectedTopic(e.target.value); handleFormSubmit(e)}}>
            <option value="">Topic</option>
            <option value="aI">AI</option>
            <option value="Competition">Competition</option>
            <option value="e-commerce">E-commerce</option>
            <option value="onlineSafety">Online Safety</option>
          </select>
          <select className="ui basic floating dropdown button" value={selectedStatus} onChange={(e) => {setSelectedStatus(e.target.value); handleFormSubmit(e)}}>
          <option value="">Status</option>
            <option value="notYetDrafted">Not Yet Drafted</option>
            <option value="passed">Passed</option>
            <option value="implemented">Implemented</option>
            <option value="inProgress">In Progress</option>
          </select>
          {/* delete submit?? */}
          <button className="ui button" onClick={handleFormSubmit}>Submit</button>
      </div>
      {searchedPolicies.map((policy) => {
          const isStarred = starredPolicyIds.has(policy._id);
            return (
      <div className="resultsCard" key={policy._id}>
        <div className='legislation'>{policy.legislation}</div>
        <div key={policy._id}>
        {isStarred ? (
        <i onClick={() => handleUnstarPolicy(policy._id)} className="star icon starButton"></i>
      ) : (
        <i onClick={() => handleStarPolicy(policy._id)} className="star outline icon starButton"></i>
      )}
          </div>
        <div className='topic'>{policy.topic}</div>
        <div className='status'>{policy.status}</div>
        <div className='lastUpdated'>{policy.lastUpdated}</div>
        <div className='Description'>{policy.description}</div>
      </div>
       )})}
      </div>
    </main>
  );
};


export default Home;


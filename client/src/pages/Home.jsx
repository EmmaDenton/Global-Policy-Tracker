
import { useLazyQuery, useQuery } from '@apollo/client';
import Map from '../components/Map';
import React, { useState, useEffect } from 'react';
import { SEARCH_POLICIES } from '../utils/queries';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [searchPolicies, { data, loading, error }] = useLazyQuery(SEARCH_POLICIES);

  useEffect(() => {
    if (data) {
      console.log('Search results:', data);
    }
  }, [data]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    searchPolicies({ variables: { policyInput: {legislation: searchTerm, countryCode: selectedCountry, topic: selectedTopic, status: selectedStatus }} });
  };

  return (
    <main id='mainContainer2'>
      <div className="flex-row justify-center">
      </div>
      <div>
      <Map/>
      <div>
      <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />
          <select class="ui fluid dropdown" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="" disabled>Country</option>
            <option value="aus">Australia</option>
          </select>
          <select class="ui fluid dropdown" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
            <option value="" disabled>Topic</option>
            <option value="aI">AI</option>
            <option value="Competition">Competition</option>
            <option value="e-commerce">E-commerce</option>
            <option value="onlineSafety">Online Safety</option>
          </select>
          <select class="ui fluid dropdown" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="" disabled>Status</option>
            <option value="notYetDrafted">Not Yet Drafted</option>
            <option value="passed">Passed</option>
            <option value="implemented">Implemented</option>
            <option value="inProgress">In Progress</option>
          </select>
          <button onClick={handleFormSubmit}>Submit</button>
      </div>
      {/* {searchedPolicys.map((policy) => {
            return (
      <div>
        <div className='legislation'>{policy.legislation}</div>
        <div className='topic'>{policy.topic}</div>
        <div className='status'>{policy.status}</div>
        <div className='lastUpdated'>{policy.lastUpdated}</div>
        <div className='Description'>{policy.description}</div>
        <div>Supporting Documents</div>
        <div className='Links'>{policy.links}</div>
      </div>
       )})}; */}
      </div>
    </main>
  );
};


export default Home;


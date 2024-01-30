import { useQuery } from '@apollo/client';
import Map from '../components/Map';
const Home = () => {

  return (
    <main>
      <div className="flex-row justify-center">
        <h1>welcome Google Policy Tracker</h1>
      </div>
      <div>
      <Map/>
      </div>
    </main>
  );
};

export default Home;

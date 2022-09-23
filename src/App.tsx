import './App.scss';
import Connection from './routes/connection/connection.component';
import Navigation from './routes/navigation/navigation.component';
import '@aws-amplify/ui-react/styles.css';
import { useSelector } from 'react-redux';
import { selectAuthReducer } from './store/auth/auth.selector';

function App() {
  const auth = useSelector(selectAuthReducer);
  console.log(auth);

  return (
    <div className="App">
      {
        auth.isConnected ? (<Navigation />) : (<Connection />)
      }
    </div>
  );
}

export default App;

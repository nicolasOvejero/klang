import './App.scss';
import Connection from './routes/connection/connection.component';
import '@aws-amplify/ui-react/styles.css';
import { useSelector } from 'react-redux';
import { selectAuthReducer } from './store/auth/auth.selector';
import Home from './routes/home/home.component';

function App() {
  const auth = useSelector(selectAuthReducer);

  return (
    <div className="App">
      {
        auth.isConnected ? (<Home/>) : (<Connection />)
      }
    </div>
  );
}

export default App;

import './App.scss';
import Connection from './routes/connection/connection.component';
import Navigation from './routes/navigation/navigation.component';

function App() {
  return (
    <div className="App">
      {
        true === true ? (<Connection />) : (<Navigation />)
      }
    </div>
  );
}

export default App;

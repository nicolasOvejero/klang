import './App.scss';
import Connection from './routes/connection/connection.component';
import '@aws-amplify/ui-react/styles.css';
import { useSelector } from 'react-redux';
import { selectAuthReducer } from './store/auth/auth.selector';
import Home from './routes/home/home.component';
import { Route, Routes } from 'react-router-dom';
import GuardedRoute from './routes/guarded-route.component';
import Navigation from './routes/navigation/navigation.component';
import Birthday from './routes/birthday/birthday.component';
import Event from './routes/event/event.component';

function App() {
    const auth = useSelector(selectAuthReducer);

    return (
        <div className="App">
            <Routes>
                <Route element={
                    <GuardedRoute auth={auth.isConnected}>
                        <Navigation />
                    </GuardedRoute>
                }>
                    <Route index element={<Home />} />
                    <Route path='birthdays' element={<Birthday />} />
                    <Route path='events' element={<Event />} />
                </Route>
                <Route path="login" element={<Connection />} />
            </Routes>
        </div>
    );
}

export default App;

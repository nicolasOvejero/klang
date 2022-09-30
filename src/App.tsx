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
import NewArrivals from './routes/new-arrivals/new-arrivals.component';
import ChangePassword from './components/change-password/change-password.component';
import Signin from './components/signin/signin.component';
import AdminGuardedRoute from './routes/admin-guarded-route.component';
import Admin from './routes/admin/admin.component';
import BirthdayForm from './components/admin/birthday-form/birthday-form.component';
import BirthdayFormAdd from './components/admin/birthday-form/birthday-form-add/birthday-form-add.component';

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
                    <Route path='new-arrivals' element={<NewArrivals />} />
                </Route>
                <Route element={
                    <AdminGuardedRoute groups={auth.user?.groups}>
                        <Navigation />
                    </AdminGuardedRoute>
                }>
                    <Route path='admin' element={<Admin />}>
                        <Route path='birthdays' element={<BirthdayForm />}>
                            <Route path='add' element={<BirthdayFormAdd />} />
                            <Route path='delete' element={<BirthdayForm />} />
                        </Route>
                        <Route path='events' element={<BirthdayForm />}>
                            <Route path='add' element={<BirthdayFormAdd />} />
                            <Route path='delete' element={<BirthdayForm />} />
                        </Route>
                        <Route path='new-arrivals' element={<BirthdayForm />}>
                            <Route path='add' element={<BirthdayFormAdd />} />
                            <Route path='delete' element={<BirthdayForm />} />
                        </Route>
                    </Route>
                </Route>
                <Route element={<Connection />}>
                    <Route path="login" element={<Signin />} />
                    <Route path='change-password' element={<ChangePassword />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

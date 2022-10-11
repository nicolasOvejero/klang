import './App.scss';
import Connection from './routes/connection/connection.component';
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
import UsersForm from './components/admin/users-form/users-form.component';
import UsersFormAdd from './components/admin/users-form/users-form-add/users-form-add.component';
import UsersFormRemove from './components/admin/users-form/users-form-remove/users-form-remove.component';
import EventForm from './components/admin/event-form/event-form.component';
import EventFormRemove from './components/admin/event-form/event-form-remove/event-form-remove.component';
import EventFormAdd from './components/admin/event-form/event-form-add/event-form-add.component';
import NewArrivalForm from './components/admin/new-arrival-form/new-arrival-form.component';
import NewArrivalFormAdd from './components/admin/new-arrival-form/new-arrival-form-add/new-arrival-form-add.component';
import Profile from './routes/profile/profile.component';
import FirstTime from './components/first-time/first-time.component';
import Code from './components/code/code.component';

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
                    <Route path='profile' element={<Profile />} />
                </Route>
                <Route element={
                    <AdminGuardedRoute groups={auth.user?.groups}>
                        <Navigation />
                    </AdminGuardedRoute>
                }>
                    <Route path='admin' element={<Admin />}>
                        <Route path='users' element={<UsersForm />}>
                            <Route path='add' element={<UsersFormAdd />} />
                            <Route path='delete' element={<UsersFormRemove />} />
                        </Route>
                        <Route path='birthdays' element={<BirthdayForm />}>
                            <Route path='add' element={<BirthdayFormAdd />} />
                        </Route>
                        <Route path='events' element={<EventForm />}>
                            <Route path='add' element={<EventFormAdd />} />
                            <Route path='delete' element={<EventFormRemove />} />
                        </Route>
                        <Route path='new-arrivals' element={<NewArrivalForm />}>
                            <Route path='add' element={<NewArrivalFormAdd />} />
                        </Route>
                    </Route>
                </Route>
                <Route element={<Connection />}>
                    <Route path="login" element={<Signin />} />
                    <Route path="first-time" element={<FirstTime />} />
                    <Route path="code" element={<Code />} />
                    <Route path='change-password' element={<ChangePassword />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

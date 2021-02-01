import '../App.css';
import AuthProvider from '../contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './authentication/PrivateRoute'
import Signup from './authentication/Signup'
import Login from './authentication/Login'
import Profile from './authentication/Profile'
import ForgotPassword from './authentication/ForgotPassword'
import UpdateProfile from './authentication/UpdateProfile'
import Dashboard from './drive/Dashboard'

function App() {
  return (
      <Router>
        <AuthProvider>
            <Switch>
              {/* Drive routes */}  
              <PrivateRoute path="/" exact component={Dashboard}/>
              <PrivateRoute path="/folder/:folderId" exact component={Dashboard}/>

              {/* Auth routes */}
              <PrivateRoute path='/user' exact component={Profile} />
              <PrivateRoute path='/update-profile' exact component={UpdateProfile} />
              
              {/* Login routes */}
              <Route path='/signup' component={Signup} />
              <Route path='/login' exact component={Login} />
              <Route path='/forgot-password' exact component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>  
    
  );
}

export default App;

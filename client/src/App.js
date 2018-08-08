import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/user-profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing}/>
      <div className="container">
      <Switch>  
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/profiles" component={Profiles}/>
      <Route path="/profile/:handle" component={Profile}/>
      <PrivateRoute path="/dashboard" component={Dashboard}/>
      <PrivateRoute path="/create-profile" component={CreateProfile}/>
      <PrivateRoute path="/edit-profile" component={EditProfile}/>
      <PrivateRoute path="/add-experience" component={AddExperience}/>
      <PrivateRoute path="/add-education" component={AddEducation}/>
      <PrivateRoute path="/feed" component={Posts}/>
      <PrivateRoute path="/post/:id" component={Post}/>
      <Route component={NotFound}/>
      </Switch>  
      </div>
      <Footer />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

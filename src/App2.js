import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/Login/LoginForm'
import{
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';



//App class
class App extends Component {
  render() {
    return (
       <div>
         <LoginForm/>
       </div>
    );
  }
}

export default App;

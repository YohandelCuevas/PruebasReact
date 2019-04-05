import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/Login/LoginForm'
import{
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';
import {createBrowserHistory} from 'history';


const history = createBrowserHistory();


const klk = () =><h3>app</h3>

//App class
class App extends Component {
  constructor(){
    super();
    this.state = {
      isAuthenticated: false
    }
}

  isAuthenticated = () =>{
    const token = localStorage.getItem('token');
    if(token) this.setState({isAuthenticated: true});
  }

  componentDidMount(){
    this.isAuthenticated();
  }
  render() {
    return (
      !this.state.isAuthenticated ? 
      <Router>
        <Switch>
          <Route path='/auth/login' component={LoginForm}/>
          <Redirect to='/auth/login' />
        </Switch>
    </Router> :
          <Router>
            <Switch>
              <Route path='/app' component={klk}/>
              <Redirect to='/app' />
            </Switch>
      </Router>
    );
  }
}

export default App;

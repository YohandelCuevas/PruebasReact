import React, { Component } from 'react';
import './App.css';
import{
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';


const fakeAuth = {
  isAuthenticade: false,
  authenticade(cb){
    this.isAuthenticade = true
    setTimeout(cb,100) //fake async
  },
  signout(cb){
    this.isAuthenticade = false
    setTimeout(cb,100)
  }
}

const Public = () =><h3>Public</h3>
const Protected = () =><h3>Protected</h3>

//LOGIN CLASS

class Login extends React.Component {

  state={
    reditectToReferrer: false
  }

  login = ()=> {
    fakeAuth.authenticade(()=>{
      this.setState(()=>({
        reditectToReferrer: true
      }))
    })
  }

  render(){
    const {reditectToReferrer} = this.state
    const {from} = this.props.location.state || {from: {pathname: '/'}}

    if (reditectToReferrer === true){
      return(
        <Redirect to={from}/>
      )
    }
   return(
     <div>
       <p>You must log in to view this page at {from.pathname}</p>
       <button onClick={this.login}>Log in</button>
     </div>
   )
  }
}

//Private route

const PrivateRoute = ({component: Component,...rest}) =>(
  <Route {...rest} render = {(props)=>(
    fakeAuth.isAuthenticade === true 
    ? <Component {...props}/>
    : <Redirect to={{
      pathname: '/login',
      state : {from: props.location}
    }}/>
  )}/>
)


const AuthButton = withRouter( ({history}) =>(
  fakeAuth.isAuthenticade === true ? 
  <p>Welcome! <button onClick={()=> {
    fakeAuth.signout( ()=> history.push('/') )
  }}>Sing out</button> </p>
  : <p>You're not logged in.</p>
));

//App class
class App extends Component {
  render() {
    return (
        <Router>
          <div>
          <AuthButton/>
          <ul>
            <li><Link to='/public'>Public page</Link></li>
            <li><Link to='/protected'>Protected page</Link></li>
          </ul>

          <Route path='/public' component ={Public}/>
          <Route path='/login' component ={Login}/>
          <PrivateRoute path='/protected' component ={Protected}/>
          </div>
        </Router>
       
      
    );
  }
}

export default App;

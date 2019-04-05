import React, { Component } from 'react';
import axios from 'axios';
import{
    BrowserRouter as Router,
    Route,
    withRouter,
    Redirect
  } from 'react-router-dom';
  
  
  

export default class LoginForm extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            user:{
                email:"",
                password:""
            }
        }
    }
    emailChangedHandler = event =>{
        this.setState({email: event.target.value})
    }

    passwordChangedHandler = event =>{
        this.setState({password: event.target.value})
    }
    submitForm = (event) =>{
        event.preventDefault();
        axios.post('http://prixet-dashboard.staging.prixet.com/api/auth/login', {email:this.state.email, password:this.state.password})
        .then((res)=>{
            localStorage.setItem('token',res.data.access_token)
            this.props.history.push('/app');
        }).catch((err) => {
            console.log(err)
        })
        
    }

    render () {
       
        return(

            <div className="container">
                <form style={{marginTop:50}}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        
                        <input type="email"
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={this.emailChangedHandler}
                        value={this.state.email}/>
                    
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>

                        <input type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password"
                        onChange={this.passwordChangedHandler}
                        value={this.state.password}/>

                    </div>
                    <div className="form-check">

                        <input type="checkbox"
                        className="form-check-input" 
                        id="exampleCheck1"/>

                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
                </form>
    </div>  
        
        )
    }
}
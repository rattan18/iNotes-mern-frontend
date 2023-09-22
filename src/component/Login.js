import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();
    const handelSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("https://inotes-mern-backend.onrender.com/api/auth/login", {
            method:"POST",  
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });

          const json = await response.json(); 
          console.log(json);
          if(json.success){
              localStorage.setItem('token', json.authToken);
              props.showAlert("Logged In Successfully", "success");
              navigate('/');
            }
          else{
            props.showAlert("Invalid Credentials", "danger");
          }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value});
    }

    return (
        <>
        <div>
            <h2 style={{marginBottom:"40px"}}>Log in to iNotes</h2>
            <form onSubmit={handelSubmit}>
                <div className="mb-3" >
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default Login

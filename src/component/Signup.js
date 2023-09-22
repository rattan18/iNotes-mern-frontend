import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: ""});
  let navigate = useNavigate();
  const handelSubmit = async (e)=>{
      e.preventDefault();
      const {name, email, password} = credentials;
      const response = await fetch("https://inotes-mern-backend.onrender.com/api/auth/createuser", {
          method:"POST",  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, email, password})
        });
        const json = await response.json(); 
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert("Signed Up Successfully", "success");
          }
        else{
          props.showAlert('Invalid Credentials', "danger");
        }

  }

  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value});
  }


  return (
    <div className='container'>
      <h2 style={{marginBottom:"30px"}}>Create an account to use iNotes</h2>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name="name" aria-describedby="name" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup

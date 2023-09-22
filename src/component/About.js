import React, { useEffect, useState } from 'react';


const About = (props) => {
  const [credentials, setCredentials] = useState([]);

  const fetchData = async () => {
    if (localStorage.getItem('token')) {
      const response = await fetch("https://inotes-mern-backend.onrender.com/api/auth/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      setCredentials(json);
    }

    else {
      props.showAlert("Please Log In or Sign Up.", "danger");
    }
  }


  useEffect(() => {
    fetchData();
  });




  return (
    <>
      <div>
        <h1>Account Details</h1>
        <form style={{ marginTop: "40px" }}>
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input disabled type="text" class="form-control" id="name" value={credentials.name} />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input disabled type="email" class="form-control" id="email" value={credentials.email} />
          </div>

        </form>
      </div>
    </>
  )
}

export default About


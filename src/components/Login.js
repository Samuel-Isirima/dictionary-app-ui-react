import React from "react"
import "./Login.css"

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const emailChangeHandler = (event) =>
  {
  setEmail(event.target.value)
  }
    
  const passwordChangeHandler = (event) =>
  {
  setPassword(event.target.value)
  }


  async function logUserIn(credentials) {
    return fetch('http://localhost:8000/api/V1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

   const handleLoginRequest = async e => {
    e.preventDefault();
    const token = await logUserIn({
      email,
      password
    });
    
    setToken(token);
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
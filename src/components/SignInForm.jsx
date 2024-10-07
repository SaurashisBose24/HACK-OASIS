import React, { useState } from 'react'
import './styles/signInForm.css'
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [isActive, setisActive] = useState(false);
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    username:'',
    password:'',
    gender:'',
    height:0,
    weight:0
  })

  const handleChange = () =>{
    setisActive(!isActive);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let res = await fetch("/api/signup",{
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    let a = await res.json();
    console.log(a);
    if(a.statusCode === 200)
      navigate("/main");
    else
      alert("Invalid credentials");
  }

  const formChange = (e) => {
    const {name,value} = e.target;
    setformData((prevData) => ({
      ...prevData,[name]: value,
    }))
  }

  const handleLogIn = async(e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/login",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    let a = await res.json();
    if(a.statusCode === 200)
      navigate("/main");
    else
      alert("Invalid credentials");
  }
  return (
    <div className='main'>
        <div className='Form'>
            <form action="" className='User' onSubmit={handleSubmit}  >
                <div className= {isActive?"Signinactive":"Signactive"}>
                    <input type="text" name='email' value={formData.email} placeholder='Enter email' onChange={formChange}/>
                    <input type="text" name='password' value={formData.password} placeholder='Enter password' onChange={formChange}/>
                    <div className='radio-class'>
                      <label htmlFor="male">Male</label>
                      <input type="radio" name='gender' value="MALE" id="male" onChange={formChange} />
                    </div>
                    <div className='radio-group'>
                      <label htmlFor="female">Female</label>
                      <input type="radio" id="female" value="FEMALE" name="gender" onChange={formChange}  />
                    </div>
                    <input type="text" name='height'  placeholder='Enter height in cm' onChange={formChange} />
                    <input type="text" name='weight'  placeholder='Enter weight in kg' onChange={formChange} />
                    <button type='submit'>Sign In</button>
                </div>
                </form>
                <form action="" className='User' onSubmit={handleLogIn}>
                  <div className= {isActive?"Logactive":"Loginactive"}>
                    <input type="text" name='email' value={formData.email} placeholder='Enter email' onChange={formChange}/>
                    <input type="text" name='password' value={formData.password} placeholder='Enter password' onChange={formChange}/>
                    <button type='submit'> Log In</button>
                  </div>
                </form>
           
            <div  className='About'>
                <div className={isActive?"Signinactive":"Signactive"}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aliquam dolor accusantium provident at.</p>
                    <button onClick={handleChange} > Already have an account? </button>
                </div>
                <div className={isActive?"Logactive":"Loginactive"}>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, temporibus delectus necessitatibus nemo harum</p>
                    <button onClick={handleChange}> Create new account </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignInForm
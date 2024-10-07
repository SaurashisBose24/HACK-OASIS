import React from 'react'
import { useState,useEffect,useLayoutEffect } from 'react'
import './styles/Prediction.css'

const Prediction = () => {
    const [formData, setformData] = useState({
        fever:'',
        cough:'',
        fatigue:'',
        difficulty:'',
        bp: '',
        cholestrol:''
      })
    const [result, setResult] = useState('')
    const [User, setUser] = useState(null)
    const [loading, setloading] = useState(true)
    const weight=65;

    const formChange = (e) => {
        const {name,value} = e.target;
        setformData((prevData) => ({
          ...prevData,[name]: value,
        }))
    }
    useEffect(() => {
      const fetchData = async() =>{
      const res = await fetch("http://localhost:3000/api/getUser",{method: "POST", credentials: 'include'});
      const a = await res.json();
      console.log(a);
      setUser(a.data);
      
      setloading(false);}
      fetchData();
      
      console.log(User);
    }, [])
    
    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        let res = await fetch("http://127.0.0.1:5000/get_result",{
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        let a = await res.text();
        let h = a.substring(15);
        let k = h.slice(0,-4);
        
        setResult(k);
    }
  if(loading)
    return <div>Loading</div>
  return (
    <div className='FormPrediction'>
        <div>
            <p>Gender: {User.gender} &nbsp; &nbsp; &nbsp; email: {User.email}</p>
            <p>height: {User.height}cm &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; weight: {User.weight}kg</p>
        </div>
        <form action="" className='insideFormPrediction' onSubmit={handleSubmit} >
            <div className='radio-classPrediction'>
                <p>Fever:</p>
                <label htmlFor="yesFever">Yes</label>
                <input type="radio" name='fever' value="Yes" id="yesFever" onChange={formChange} />
                <label htmlFor="noFever">No</label>
                <input type="radio" name='fever' value="No" id="noFever" onChange={formChange} />
            </div>
            <div className='radio-classPrediction'>
                <p>Cough:</p>
                <label htmlFor="yesCough">Yes</label>
                <input type="radio" name='cough' value="Yes" id="yesCough" onChange={formChange} />
                <label htmlFor="noCough">No</label>
                <input type="radio" name='cough' value="No" id="noCough" onChange={formChange} />
            </div>
            <div className='radio-classPrediction'>
                <p>Difficulty:</p>
                <label htmlFor="yesDifficulty">Yes</label>
                <input type="radio" name='difficulty' value="Yes" id="yesDifficulty" onChange={formChange} />
                <label htmlFor="noDifficulty">No</label>
                <input type="radio" name='difficulty' value="No" id="noDifficulty" onChange={formChange} />
            </div>
            <div className='radio-classPrediction'>
                <p>Fatigue:</p>
                <label htmlFor="yesFatigue">Yes</label>
                <input type="radio" name='fatigue' value="Yes" id="yesFatigue" onChange={formChange} />
                <label htmlFor="noFatigue">No</label>
                <input type="radio" name='fatigue' value="No" id="Fatigue" onChange={formChange} />
            </div>
            <div className='radio-classPrediction'>
                <p>Blood Pressure:</p>
                <label htmlFor="lowBP">Low</label>
                <input type="radio" name='bp' value="Low" id="lowBP" onChange={formChange} />
                <label htmlFor="normalBP">Normal</label>
                <input type="radio" name='bp' value="MALE" id="normalBP" onChange={formChange} />
                <label htmlFor="highBP">High</label>
                <input type="radio" name='bp' value="MALE" id="highBP" onChange={formChange} />
            </div>
            <div className='radio-classPrediction'>
                <p>Cholestrol:</p>
                <label htmlFor="lowCh">Low</label>
                <input type="radio" name='cholestrol' value="Low" id="lowCh" onChange={formChange} />
                <label htmlFor="normalCh">Normal</label>
                <input type="radio" name='cholestrol' value="Normal" id="normalCh" onChange={formChange} />
                <label htmlFor="highCh">High</label>
                <input type="radio" name='cholestrol' value="High" id="highCh" onChange={formChange} />
            </div>
            <button type='submit'> Predict </button>
        </form>
        {result && <div>{result}</div>}
    </div>
  )
}

export default Prediction
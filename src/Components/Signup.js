import React ,{ useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import './css/Signup.css'
function SignUp() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [passwordError,setPasswordError] = useState([]);
    const [confirmPasswordError, setConfirmPasswordError] = useState([]);
    const navigate = useNavigate();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData (prev => ({...prev,  [name]:value,}))

        if(name === "password"){
            if(!passwordRegex.test(value)){
                setPasswordError("Must be atleast 6 characters, with one uppercase,one lowercase, one number , and one special character.");
            }

            else{
                setPasswordError("");
            }
        }

        if(name === "confirmPassword"){
            if(value !== formData.password){
                setConfirmPasswordError('passwords do not match');
            }
            
            else{
                setConfirmPasswordError('');
            }
        }

         
    }

    const isFormValid = 
        formData.name.trim() !== "" &&
        formData.email.trim() !=="" &&
        passwordRegex.test(formData.password) &&
        formData.password === formData.confirmPassword;
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(passwordError){
            alert("please fix errors before submitting");
            return ;

        }

        const userData = {
            name:formData.name,
            email:formData.email,
            password: formData.password

        };
        localStorage.setItem("user",JSON.stringify(userData));
        console.log("formSubmitted",formData);
        alert ('Signup SuccessFul');
        navigate('/Login'); 


    }

    return(
        <div className = "signup-container" >
            <h2>signup</h2>
            <form onSubmit={handleSubmit} className = "signup-form">
                <input
                    type = "text"
                    name = "name"
                    placeholder="name"
                    value = {formData.name}
                    onChange = {handleChange}
                    className = "signup-input"
                />

                <input
                    type = "email"
                    name = "email"
                    placeholder="email"
                    value = {formData.email}
                    onChange={handleChange}
                    className = "signup-input"
                />

                <input 
                    type = "password"
                    name = "password"
                    placeholder = "password"
                    value = {formData.password}
                    onChange = {handleChange}
                    className = "signup-input"
                />

                {
                    passwordError && (
                        <p style ={{color: "red", fontSize:"14px", marginTop:"-10px"}}>

                            {passwordError}
                        </p>
                    )
                }

                <input 
                    type = "password"
                    name = "confirmPassword"
                    placeholder="Confirm Password"
                    value = {formData.confirmPassword}
                    onChange = {handleChange}
                    className = "signup-input"
                />

                {
                    confirmPasswordError&&(
                        <p style= {{color: "red", fontSize:"14px",marginTop:"-10px"}}>
                            {confirmPasswordError}
                        </p>
                    )
                }
                <button type = "submit" className="signup-button" disabled = {!isFormValid} style = {{backgroundColor: isFormValid ? '#007bff':'#aaa',
                    cursor:isFormValid ? 'pointer':'not-allowed'
                }}>Submit</button>
            </form>
        </div>
    )
}

export default SignUp;
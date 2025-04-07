
import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'; 

function Login () {
    const [loginData, setLoginData] =  useState({email:'',password:''})
    const [loginError,setLoginError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        if (
          emailRegex.test(loginData.email) &&
          loginData.password.trim() !== ''
        ) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
      }, [loginData]);
    
    const navigate = useNavigate();
    
    
    const handleChange = (e) =>{
        const {name, value} = e.target;

        setLoginData(prev => ({...prev,[name]:value}));

        if(name === 'email') setEmailError('');
        if(name === 'password') setPasswordError('');
        setLoginError('');

    }

    const handleLogin = (e)=>{
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem("user"));
        
        
        
        
        
        let valid ='true';
        if (!emailRegex.test(loginData.email)) {
            setEmailError("Please enter a valid email address");
            valid = false;
        }
        

        if(!loginData.password.trim()){
            setLoginError ("password is empty");
            valid = false;
        }
        if(!storedUser){
            setLoginError("No Users Found");
            return;
        }

        if(valid && loginData.email === storedUser.email && loginData.password === storedUser.password){
            setLoginError("");
            alert("Login SuccessFul");
            navigate("/home");
        }
        else if(loginData.password === "" ){
            setLoginError("Enter the password");
        }
        else {
            setLoginError("invalid credentials");

        }

    };


    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-lg p-10 bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
            <form onSubmit={handleLogin} className="space-y-6">
            <div>

            <input 
            type = "email"
            name = "email"
            placeholder='Email'
            value={loginData.email}
            onChange = {handleChange}
            className = "w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {
                emailError &&(
                    <p className = "text-red-500 text-sm mt-1">{emailError} </p>
                )
            }
            </div>
            <div>
            <input
            type = "password"
            name = "password"
            placeholder='Password'
            value = {loginData.password}
            onChange = {handleChange}
            className = "w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {   passwordError && (
                <p className = "text-red-500 text-sm mt-1 ">{passwordError} </p>
            )
                
            }
            </div>

            
            {
                loginError &&(
                    <p className="text-red-500 text-sm -mt-2">{loginError} </p>
                )
            }

            <div>
            <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full font-semibold py-2 px-4 rounded-lg transition duration-200 ${
              isFormValid
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          > submit </button>           
           </div>
            </form>
            </div>
        </div>
    );
}

export default Login;
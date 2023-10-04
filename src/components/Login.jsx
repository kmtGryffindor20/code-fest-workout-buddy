import { useState , useEffect} from "react";
export default function Login(props){


    const [formData, setFormData] = useState({
        "email":"",
        "password":"",
        "passwordConfirm":"",
        "shouldLogin":false,
        "isSignUp":false
    })
    
    useEffect(()=> {
        if(formData.shouldLogin)
        {
            if(!formData.isSignUp)
            {
                console.log("login");
                async function initiateLogin(){
                    const options = {
                        "method":"POST",
                        "headers":{
                                "accept": "application/json",
                                "Content-Type": "application/json"
                        },
                        
                        "body":JSON.stringify({
                            "email": formData.email,
                            "password": formData.password
                        })
                    }
                    const response = await fetch(`${props.baseURI}/user/login`, options)
                    const data = await response.json();
                    if(response.status != 200)
                    {
                        alert("Incorrect Email or Password!")
                        props.setLoginStatus(false);
                        setFormData(prevState => {
                            return {
                                ...prevState,
                                shouldLogin: false
                            }
                        })
                        return;
                    }
                    else{
                        alert("Logged In Successfully!")
                        props.setLoginStatus(true);
                    }
                    props.setToken(data.token)
                    

                    console.log(data)
                    setFormData(prevData => {
                        return {
                            ...prevData,
                            shouldLogin: false
                        }
                    })
                    
                }
                initiateLogin();
            }
            else
            {
                console.log(formData);
                if(formData.password === formData.passwordConfirm)
                {    
                    async function initiateSignup(){
                        const options = {
                            "method":"POST",
                            "headers":{
                                    "accept": "application/json",
                                    "Content-Type": "application/json"
                            },
                            
                            "body":JSON.stringify({
                                "email": formData.email,
                                "password": formData.password
                            })
                        }
                        const response = await fetch(`${props.baseURI}/user/signup`, options)
                        const data = await response.json();
                        props.setToken(data.token)
                        if (response.status == 200) {
                            alert("Account Created Successfully!")
                            
                        }

                        console.log(data)
                        setFormData(prevData => {
                            return {
                                ...prevData,
                                shouldLogin: false,
                                isSignUp:false
                            }
                        })
                        
                    }
                    initiateSignup();
                }
                else{
                    alert("Passwords do not match.")
                    props.setLoginStatus(false);
                        setFormData(prevState => {
                            return {
                                ...prevState,
                                shouldLogin: false
                            }
                        })
                        return;
                }
            }
        }
        
    }, [formData.shouldLogin])



    function handleChangeInForm(event){
        const {name ,value} = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]:value
            }
        })
    }

   function handleSubmit(event)
   {
    event.preventDefault()
    setFormData(prevData => {
        return {
            ...prevData,
            shouldLogin: true
        }
    })
   }

   function changeLoginMode(){
    setFormData(prevData => {
        return {
            ...prevData,
            isSignUp: !prevData.isSignUp
        }
    })
   }

    return (
        <div id="login" className="flex flex-col items-center bg-night py-24">
            <h2 className="text-white text-6xl text-center font-bold max-w-4xl">{formData.isSignUp?"Signup Now to start you fitness routine":"Login to continue your fitness routine"}!</h2>
            <form onSubmit={handleSubmit} className="rounded-lg bg-gunmetal w-96 h-full py-12 px-6 mt-10 shadow-md shadow-seasalt">
            <h2 className="text-3xl text-white font-bold">{formData.isSignUp ?"Sign Up to start you workout journey" :"Sign in to get your workouts"}.</h2>

                <div className="flex flex-col mt-6">
                    <label htmlFor="email" className="text-md font-medium leading-6 text-amber">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Adress"
                        className="w-full shadow-sm rounded-md leading-6 indent-2 border-2"
                        value={formData.email}
                        onChange={handleChangeInForm} />
                </div>
                <div className="flex flex-col mt-6 mb-6">
                    <label htmlFor="password" className="text-md font-medium leading-6 text-amber">Password</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full shadow-sm rounded-md leading-6 indent-2 border-2"
                        value={formData.password}
                        onChange={handleChangeInForm} />
                </div>
                {formData.isSignUp && <div className="flex flex-col mt-6 mb-6">
                    <label htmlFor="passwordConfirm" className="text-md font-medium leading-6 text-amber">Confirm Password</label>
                    <input 
                        type="password"
                        name="passwordConfirm"
                        placeholder="Retype Password"
                        className="w-full shadow-sm rounded-md leading-6 indent-2 border-2"
                        value={formData.passwordConfirm}
                        onChange={handleChangeInForm} />
                </div>}
                <button className="btn">{formData.isSignUp?"Sign Up":"Log In"}</button>
                <small className="text-white ml-5">{formData.isSignUp?"Already":"Don't"} have an account? <a onClick={changeLoginMode} className="hover:text-amber cursor-pointer">{formData.isSignUp?"Login":"SignUp"}</a></small>
            </form>
       </div>
    )
}
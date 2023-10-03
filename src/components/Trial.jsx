import { useState, useEffect } from "react";
export default function Trial(){

    const baseURI = "https://workoutapi-fjcr.onrender.com/api";

    useEffect(()=> {
        console.log("login");
        async function getData(){
            const options = {
                "method":"POST",
                "headers":{
                        "accept": "application/json",
                        "Content-Type": "application/json"
                },
                
                "body":JSON.stringify({
                    "email": "tripathikmt20@gmail.com",
                    "password": "Testing@321"
                  })
            }
            const response = await fetch(`${baseURI}/user/login`, options)
            const data = await response.json();
            setToken(data.token)
        }
        getData();
    }, [])

    useEffect(()=> {
        console.log(token);
        async function getWorkout(){
            
                const options = {
                    "method":"GET",
                    "headers":{
                        "accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
                console.log(options.headers)
                const response = await fetch(`${baseURI}/workouts`, options)
                const data = await response.json()
                console.log(data);
            
        }
        getWorkout()
    }, [token])

    return(
        <p>{token}</p>
    )
}
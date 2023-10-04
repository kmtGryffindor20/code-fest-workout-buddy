import Workout from "./Workout"
import { useState, useEffect } from "react"
export default function WorkoutArea(props){

    const [data, setData] = useState([])
    const [shouldReload, setReload] = useState(false)
    var workouts;
    useEffect(()=> {
        async function getData(){
            const options = {
                "method":"GET",
                "headers":{
                    "accept": "application/json",
                    "Authorization": `Bearer ${props.token}`
                }
            }
            const response = await fetch(`${props.baseURI}/workouts`, options)
            const this_data = await response.json()
            setData(this_data);
        }
        getData();
        console.log(data);
        
    }, [data.length, shouldReload])

    try{
        workouts = data.map((workout)=>
            <Workout name={workout.title}
                    reps={workout.reps}
                    load={workout.load}
                    token={props.token}
                    baseURI={props.baseURI}
                    id={workout._id} 
                    setReload={setReload}/>
            )
            console.log(workouts)
        }
        catch{
            
        }
    

    

    return(
        <div className=" text-white py-10 w-full px-32">
            <h5 className="indent-4 font-bold text-xl md:text-3xl mb-6">Your Workouts</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {workouts}
            </div>
        </div>
    )
}
import Workout from "./Workout"
import CreateWorkout from "./CreateWorkout"
import { useState, useEffect } from "react"
import plus from "../assets/images/plus.png"
export default function WorkoutArea(props){

    const [data, setData] = useState([])
    const [shouldReload, setReload] = useState(false)

    const [isOpen, setOpen] = useState(false)
    function handleModal(){
        setOpen(true)
    }

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
        <div id="workoutArea" className=" text-white py-10 w-full h-auto px-8 sm:px-32">
            <div className="flex items-center mb-6">
                <h5 className="indent-2 font-bold text-lg sm:text-xl md:text-3xl">Your Workouts</h5>
                <a onClick={handleModal} className="ml-0 sm:ml-5 items-center hover:animate-pulse cursor-pointer"><img className="w-10" src={plus} alt="" /></a> 
            </div>
            {isOpen && <CreateWorkout setOpen={setOpen} baseURI={props.baseURI} token={props.token} setReload={setReload} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10">
                {workouts}
            </div>
            
        </div>
    )
}
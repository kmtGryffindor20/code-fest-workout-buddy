import { useState , useEffect} from "react";
export default function Modal(props) {
  
    

    const [data, setData] = useState({})

    useEffect(() => {
        
            async function getData(){
                const options = {
                    "method":"GET",
                    "headers":{
                        "accept": "application/json",
                        "Authorization": `Bearer ${props.token}`
                    }
                }
                const response = await fetch(`${props.baseURI}/workouts/${props.id}`, options)
                const this_data = await response.json()
                
                setData(this_data);
                setFormData({
                    reps: this_data.reps,
                    load: this_data.load
                })
            }
            getData();
        
        
    }, [])

    const [shouldUpdate, setUpdate] = useState(false)

    const [formData, setFormData] = useState({})

    function handleChangeInForm(event){
        const {name, value} = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    var updatedOn
    try{
        updatedOn = data.updatedAt.split("T")[0]
    }
    catch {
        try{
            updatedOn = data.updatedAt
        }
        catch{
            updatedOn = data.createdAt
        }
    }


    useEffect(()=>
    {
        if(shouldUpdate)
        {
            async function patchData(){
                console.log("patching");
                const options = {
                    "method":"PATCH",
                    "headers":{
                            "accept": "application/json",
                            "Content-Type":"application/json",
                            "Authorization": `Bearer ${props.token}`
                    },
                    
                    "body":`{\n "reps": ${formData.reps}, \n "load": ${formData.load}\n}`
                }
                const response = await fetch(`${props.baseURI}/workouts/${props.id}/`, options)
                const this_data = await response.json()

                props.setReload(prevState => !prevState);
                setUpdate(prevState => !prevState);
            }
            patchData();
        }
        
    }, [shouldUpdate])

    function handleSubmit(event){
        event.preventDefault()
        setUpdate(prevState => !prevState);
    }

    const [shouldDelete, setShouldDelete] = useState(false)


    useEffect(() => {
        if(shouldDelete)
        {
            async function createWorkout()
            {
                const options = {
                    method:"DELETE",
                    headers:{
                        "accept": "application/json",
                        "Authorization": `Bearer ${props.token}`,
                    }
                }

                const response = await fetch(`${props.baseURI}/workouts/${props.id}`, options)
                const data = await response.json()
                console.log(options)
                console.log(data);
                setShouldDelete(false);
                props.setReload(prevState => !prevState);
            }
            createWorkout();
            props.setShowModal(false);
        }
    }, [shouldDelete])

  return (
      
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-gunmetal outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-seasalt rounded-t">
                  <h3 className="text-3xl font-semibold">
                  {data.title}
                  </h3>
                  <small>Last Modified On: {updatedOn}</small>
                </div>
                <div className="relative p-6 flex-auto">
                <form className="rounded-lg bg-gunmetal w-96 h-full py-12 px-6 mt-10">
                <h2 className="text-3xl text-white font-bold">Update Your Workout?</h2>

                <div className="flex flex-col mt-6 mb-6">
                    <label htmlFor="reps" className="text-md font-medium leading-6 text-amber">Reps</label>
                    <input 
                        type="text"
                        name="reps"
                        className="w-full shadow-sm rounded-md leading-6 indent-2 border-2 text-night"
                        value={formData.reps}
                        onChange={handleChangeInForm} />
                </div>
                <div className="flex flex-col mt-6 mb-6">
                    <label htmlFor="load" className="text-md font-medium leading-6 text-amber">Load</label>
                    <input 
                        type="text"
                        name="load"
                        className="w-full shadow-sm rounded-md leading-6 indent-2 border-2 text-night"
                        value={formData.load}
                        onChange={handleChangeInForm} />
                </div>
                <button
                    className="btn"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                  <button
                    className="text-white bg-red-500 hover:text-red-500 border-red-500 btn"
                    type="button"
                    onClick={() => setShouldDelete(true)}
                  >
                    DELETE
                  </button>
            </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white bg-red-500 hover:text-red-500 border-red-500 btn"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
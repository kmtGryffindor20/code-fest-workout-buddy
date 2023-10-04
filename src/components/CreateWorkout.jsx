import { useState, useEffect } from "react"

export default function CreateWorkout(props){

    const [formData, setFormData] = useState({
        title:"",
        reps:"",
        load:""
    })

    const [shouldCreate, setShouldCreate] = useState(false)

    function handleChangeInForm(event){
        const {name, value} = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    useEffect(() => {
        if(shouldCreate)
        {
            async function createWorkout()
            {
                const options = {
                    method:"POST",
                    headers:{
                        "accept": "application/json",
                        "Authorization": `Bearer ${props.token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "title":formData.title,
                        "load":parseInt(formData.load),
                        "reps":parseInt(formData.reps)
                    })
                }

                const response = await fetch(`${props.baseURI}/workouts`, options)
                const data = await response.json()
                console.log(options)
                console.log(data);
                setShouldCreate(false);
                props.setReload(prevState => !prevState);
            }
            createWorkout()
        }
    }, [shouldCreate])

    function handleSubmit(event){
        event.preventDefault()
        setShouldCreate(true)
    }


    return(
        <>
            <div className="fixed z-50 overflow-y-auto justify-center items-center flex overflow-x-hidden inset-0 ">
                <div className="relative w-auto my-6 mx-auto max-w-3xl bg-gunmetal">
                <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-gunmetal outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                <h2 className="text-3xl text-white font-bold">Create New Workout!</h2>

                <form className="rounded-lg bg-gunmetal w-96 h-full py-12 px-6 mt-10">
                <div className="flex flex-col mt-6 mb-6">
                    <label htmlFor="title" className="text-md font-medium leading-6 text-amber">Title</label>
                    <input 
                        type="text"
                        name="title"
                        placeholder="Your Workout Title"
                        value={formData.title}
                        className="w-full shadow-sm rounded-md leading-6 indent-2 border-2 text-night"
                        onChange={handleChangeInForm}
                        required
                        />
                </div>
                <div className="flex flex-col mt-6 mb-6">
                    <label htmlFor="reps" className="text-md font-medium leading-6 text-amber">Reps</label>
                    <input 
                        type="text"
                        name="reps"
                        placeholder="Number of Reps"
                        value={formData.reps}
                        onChange={handleChangeInForm}
                        className="w-full shadow-sm rounded-md leading-6 indent-2 border-2 text-night"
                        required
                        />
                </div>
                <div className="flex flex-col mt-6 mb-6">
                    <label htmlFor="load" className="text-md font-medium leading-6 text-amber">Load</label>
                    <input 
                        type="text"
                        name="load"
                        placeholder="Load Used"
                        value={formData.load}
                        onChange={handleChangeInForm}
                        className="w-full shadow-sm rounded-md leading-6 indent-2 border-2 text-night"
                        required
                         />
                </div>
                <button
                    className="btn"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                  
            </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-whitw bg-red-500 hover:text-red-500 border-red-500 btn"
                    type="button"
                    onClick={() => props.setOpen(false)}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
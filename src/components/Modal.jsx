import { useState , useEffect} from "react";
export default function Modal(props) {
  
    const [formData, setFormData] = useState({
        reps: props.data.reps,
        load: props.data.load
    })

    const [shouldUpdate, setUpdate] = useState(false)

    function handleChangeInForm(event){
        const {name, value} = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    useEffect(()=>
    {
        if(shouldUpdate)
        {
            async function postData(){
                const options = {
                    "method":"PATCH",
                    "headers":{
                            "accept": "application/json",
                            "Content-Type":"application/json",
                            "Authorization": `Bearer ${props.token}`
                    },
                    
                    "body":JSON.stringify(formData)
                }
                const response = await fetch(`${props.baseURI}/workouts/${props.data._id}`, options)
                const this_data = await response.json()

                console.log(this_data);
            }
            postData();
        }
        
    }, [shouldUpdate])

    function handleSubmit(event){
        event.preventDefault()
        setUpdate(prevState => !prevState);
    }

  return (
      
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              Workout Detail
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-gunmetal outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-seasalt rounded-t">
                  <h3 className="text-3xl font-semibold">
                  {props.data.title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit} className="rounded-lg bg-gunmetal w-96 h-full py-12 px-6 mt-10">
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
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Save Changes
                  </button>
            </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
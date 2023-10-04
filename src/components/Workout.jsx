import Modal from "./Modal"
import { useState, useEffect } from "react"
export default function Workout(props){

    const [isOpen, setOpen] = useState(false)
    function handleModal(){
        setOpen(prevState => !prevState)
    }


    
    
    return(
    <>
        <div onClick={handleModal} className="w-full max-w-sm p-6 ml-5 bg-gunmetal border border-seasalt rounded-lg shadow hover:bg-gray-800 cursor-pointer">
            <h3 className="text-3xl">{props.name}</h3>
            <p>Reps : {props.reps}</p>
            <p>Load : {props.load}</p>
        </div>
        {isOpen && <Modal showModel={isOpen} setShowModal={setOpen} token={props.token} baseURI={props.baseURI} id={props.id} setReload={props.setReload}/>}
    </>

    )
}
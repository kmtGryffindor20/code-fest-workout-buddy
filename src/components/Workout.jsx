import Modal from "./Modal"
import { useState, useEffect } from "react"
export default function Workout(props){

    const [isOpen, setOpen] = useState(false)
    function handleModal(){
        setOpen(prevState => !prevState)
    }


    
    
    return(
    <>
        <div onClick={handleModal} className="w-full p-6 ml-0 sm:ml-5 bg-gunmetal border border-seasalt rounded-lg shadow hover:bg-gray-800 cursor-pointer">
            <h3 className="text-xl lg:text:3xl font-bold">{props.name}</h3>
            <p className="font-light md:font-normal lg:font-semibold">Reps : {props.reps}</p>
            <p className="font-light md:font-normal lg:font-semibold">Load : {props.load}</p>
        </div>
        {isOpen && <Modal showModel={isOpen} setShowModal={setOpen} token={props.token} baseURI={props.baseURI} id={props.id} setReload={props.setReload}/>}
    </>

    )
}
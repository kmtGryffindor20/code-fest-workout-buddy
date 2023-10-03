export default function Workout(props){
    return(
        <div className="w-full max-w-sm p-6 ml-5 bg-gunmetal border border-seasalt rounded-lg shadow hover:bg-gray-800 cursor-pointer">
            <h3 className="text-3xl">{props.name}</h3>
            <p>Reps : {props.reps}</p>
            <p>Load : {props.load}</p>
        </div>
    )
}
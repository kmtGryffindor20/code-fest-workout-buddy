import { Link } from "react-scroll"
export default function Home(props){
    return(
        <main id="home" className="bg-gunmetal py-40 items-center flex flex-col">
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-center max-w-3xl font-bold mb-10">Create you own fitness plan now!</h1>
            <Link 
                to={props.hasLoggedIn?"workoutArea":"login"}
                smooth={true}
                offset={50}
                duration={500}
                className="btn text-lg">Get Started
            </Link>
        </main>
    )
}
import { Link } from "react-scroll"
export default function Navbar(props){
    return(
        <header className=" bg-night fixed w-full">
            <nav className="flex items-center w-4/5  shadow-m py-4">
                <a href="#" className="text-2xl font-medium border px-2 py-2 border-amber text-amber ml-auto mr-auto rounded-lg">Workout Buddy</a>
                <ul className="flex flex-row mr-4 text-white">
                    <Link
                        to="home"
                        activeClass="text-amber font-medium"
                        spy={true}
                        smooth={true}
                        offset={-200}
                        duration={500}
                    ><li className="mr-10 text-lg hover:text-amber"><a href="">Home</a></li>
                    </Link>
                    <Link
                        to={props.hasLoggedIn?"workoutArea":'login'}
                        activeClass="text-amber font-medium"
                        spy={true}
                        smooth={true}
                        offset={-200}
                        duration={500}
                    >
                    <li className="mr-10 text-lg hover:text-amber"><a href="">Workouts</a></li>
                    </Link>
                </ul>
            </nav>
        </header>

    )
}
import { Link } from "react-scroll"
import { useState } from "react"
export default function Navbar(props){

    const [display, setDisplay] = useState("hidden")

    function handleHamburgerClick(){
        if(display === "hidden")
        {
            setDisplay("block");
        }
        else
        {
            setDisplay("hidden");
        }
    }
    return(
        <header className=" bg-night fixed w-screen overflow-x-clip">
            <nav className="hidden items-center w-4/5  shadow-m py-4 md:flex">
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
            <nav className="block md:hidden">
                <div onClick={handleHamburgerClick} class="p-4 space-y-2 rounded shadow cursor-pointer">
                    <span class="block w-8 h-0.5 bg-seasalt"></span>
                    <span class="block w-8 h-0.5 bg-seasalt"></span>
                    <span class="block w-8 h-0.5 bg-seasalt"></span>
                </div>
                <div className="ml-5">
                    <ul className={`mr-4 text-white ${display} transition ease-in-out delay-150`}>
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
                </div>
            </nav>
        </header>

    )
}
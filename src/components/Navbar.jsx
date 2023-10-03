export default function Navbar(){
    return(
        <header className=" bg-night fixed w-full">
            <nav className="flex items-center w-4/5  shadow-m py-4">
                <a href="#" className="text-2xl font-light border px-2 py-2 border-amber text-amber ml-auto mr-auto rounded-lg">Workout Buddy</a>
                <ul className="flex flex-row mr-4 text-white">
                    <li className="mr-10 text-lg hover:text-amber"><a href="">Home</a></li>
                    <li className="mr-10 text-lg hover:text-amber"><a href="">Workouts</a></li>
                    <li className="mr-10 text-lg hover:text-amber">About</li>
                </ul>
            </nav>
        </header>

    )
}
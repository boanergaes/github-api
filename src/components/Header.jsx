import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="flex justify-center items-center p-4 fixed left-0 top-0 z-10 w-screen bg-black">
            <div className="flex justify-between items-center w-full max-w-[1480px]">
                <Link to='/'>
                    <h1 className="text-4xl font-bold">DIR</h1>
                </Link>
                <Link to='/create-repo'>
                    <button>New Repo +</button>
                </Link>
            </div>
        </header>
    )
}
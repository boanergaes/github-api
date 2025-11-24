import { Link } from "react-router-dom";
import { clearCatch } from "../Catch";

export default function Header() {
    return (
        <header className="flex justify-center items-center p-4 fixed left-0 top-0 z-10 w-screen bg-black">
            <div className="flex justify-between items-center w-full max-w-[1480px]">
                <Link to='/'>
                    <h1 className="text-4xl font-bold">Dir</h1>
                </Link>
                <div className="flex gap-3">
                    <button onClick={clearCatch}>Clear Catch</button>

                    <Link to='/create-repo'>
                        <button>New Repo +</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
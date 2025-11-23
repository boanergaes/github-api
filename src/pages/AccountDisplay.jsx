import { useState } from "react"
import { Link } from "react-router-dom"
import { grabCatch, isCatched, storeCatch } from "../Catch"

export default function AccountDisplay() {
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')

    const fetchURL = `https://api.github.com/users/${username}/repos`

    const handleSearch = () => {
        if (!username) return

        if (isCatched(fetchURL)) {
            setRepos(grabCatch(fetchURL))
            return   
        }

        setLoading(true)
        setError('')
        setRepos([])

        fetch(fetchURL)
        .then(res => {
            if (!res.ok) throw new Error("User not found")
            return res.json()
        })
        .then(data => {
            setRepos(data)
            storeCatch(fetchURL, data)
        })
        .catch(err => {
            setError(err.message || "Unexpected error occurred!")
        })
        .finally(() => {
            setLoading(false)
            console.log('fetch called!')
        })
    }

    let count = 0

    return (
        <>
            <div className="flex justify-center gap-4 w-full">
                <input onChange={e => setUsername(e.target.value)} onKeyDown={e => {if (e.key === 'Enter') handleSearch()}} className="border px-4 py-1 w-[60%] rounded-lg" type="search" placeholder="username to search" />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="text-gray-400 mt-8">
                {/* Search with username or create new repo. */}
                {loading && <p>Loading...</p>}
                {error && <p style={{color:'red'}}>{error}</p>}

                {!loading && !error && repos && (
                    <div className="flex flex-col gap-8">
                        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                            <div className="flex gap-4 items-end">
                                <h1 className="text-[1.8rem]">{username}</h1>
                                <a href={ `https://github.com/${username}` } target="_black" >GitHub-{'>'}</a>
                            </div>
                            {repos && <p>{Object.keys(repos).length} repositories</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {
                                repos.map(repo => {
                                    count++
                                    return (
                                        <Link to={`/repo/${username}/${repo.name}`} key={repo.id} className="flex justify-between items-center w-full border border-gray-700 px-6 py-2 rounded-sm cursor-pointer hover:bg-[#2b2b2b] transition-colors">
                                            <p>{count}. {repo.name}</p>
                                            {/* <a href={`${repo.html_url}`} target="_blank">GitHub-{'>'}</a> */}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                )}
            </div>

            
        </>
    )
}
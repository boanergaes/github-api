import { useState } from 'react'

export default function FetchAccount() {
    const [repo, setRepo] = useState({})
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [reponame, setReponame] = useState('')
    const [error, setError] = useState('')

    const handleSearch = () => {
        if (!username || !reponame) return

        setLoading(true)
        setError('')
        setRepo({})

        fetch(`https://api.github.com/repos/${username}/${reponame}`)
        .then(res => {
            if (!res.ok) {          // handles 404, 500, etc.
            throw new Error("Repo not found")
            }
            return res.json()
        })
        .then(data => {
            setRepo(data)
        })
        .catch(err => {
            setError(err.message || "Unexpected error occurred!")
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
        <div className='flex flex-col gap-3 mb-6'>
            <input
            className='border px-2.5 py-1'
            onChange={(e) => setUsername(e.target.value)}
            placeholder='GitHub username'
            />

            <input
            className='border px-2.5 py-1'
            onChange={(e) => setReponame(e.target.value)}
            placeholder='Repo name'
            />

            <button onClick={handleSearch}>Search</button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{color:'red'}}>{error}</p>}

        {!loading && !error && repo?.name && (
            <div>
            <div className='flex flex-col'>
                <a target='_blank' href={repo?.html_url}>{repo.name}</a>
                <a target='_blank' href={repo?.owner?.html_url}>Author: {repo?.owner?.login}</a>
            </div>
            <p>Stars: {repo?.stargazers_count}</p>
            <p>Description: {repo?.description}</p>
            </div>
        )}
        </>
    )
}
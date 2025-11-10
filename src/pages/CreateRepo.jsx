// import axios from "axios";
import { useState } from "react";

export default function CreateRepo() {
    const github_token = import.meta.env.VITE_GITHUB_TOKEN
    const [loading, setLoading] = useState(false)
    const [repoName, setRepoName] = useState('')
    const [repoDescription, setRepoDescription] = useState('')
    const [includeReadme, setIncludeReadme] = useState(false)
    const [creationResponse, setCreationResponse] = useState({})
    const [error, setError] = useState('')

    function handleCreation() {
        if (!repoName) return

        setLoading(true)

        fetch('https://api.github.com/user/repos', {
            'method': 'post',
            'headers': {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${github_token}`,
            },
            'body': JSON.stringify({
                'name': repoName,
                'description': repoDescription,
                'auto_init': includeReadme
            })
        })
        .then((res) => {
            if (!res.ok) throw new Error('Error while creating repository!')
            return res.json()
        })
        .then((reply) => {
            setCreationResponse(reply)
        })
        .catch((err) => {
            setError(err.message || 'Unexpected Error occured!')
        }) 
        .finally(() => {
            setLoading(false)
        })
    }

    // if (loading) return <p>Please wait...</p>

    // if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="flex flex-col">
            <h3>Create new Repository</h3>
            <div className="flex flex-col gap-3">
                <input className="border px-2.5 py-1" type="text" placeholder="Repository name" onChange={(e) => setRepoName(e.target.value)} />
                <input className="border px-2.5 py-1" type="text" placeholder="Description" onChange={(e) => setRepoDescription(e.target.value)} />
                <div className="flex gap-1">
                    <input type="radio" id="readme" onChange={(e) => setIncludeReadme(e.target.checked)} />
                    <label htmlFor="readme">Initialize with minimal README.md file</label>
                </div>
                <button onClick={handleCreation}>Create Repo</button>
                <p>{loading && 'Please wait...'}</p>
                <p className="text-green-600">{!loading && !error && creationResponse?.name && 'Success!'}</p>
                <p className="text-red-500">{error && error}</p>
            </div>
        </div>
    )
}
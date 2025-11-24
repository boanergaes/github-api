import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DeleteRepo from "./DeleteRepo"
import { FileIcon, FolderIcon } from "./Icons/Icons"

export default function CodePanel({repo}) {
    const [delTriggered, setDelTriggered] = useState(false)
    const [loadingFiles, setLoadingFiles] = useState(true)
    const [contents, setContents] = useState([])
    const [error, setError] = useState('')

    const contentURL = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents`

    function fetchRepoContents() {
        fetch(contentURL, {
            'headers': {
                'Accept': 'Application/json'
            }
        })
        .then((res) => {
            // if (!res.ok) throw new Error('Could not fetch repository Contents!');
            return res.json()
        })
        .then((data) => {
            if (data.message === 'This repository is empty.') throw new Error(data.message)
            setContents(data)
            setLoadingFiles(false)
        })
        .catch((err) => {
            setError(err.message)
            setLoadingFiles(false)
            console.error(err)
        })
    }

    useEffect(() => {
        fetchRepoContents()
    }, [])

    return (
        <div className="overflow-scroll h-screen pr-4">
            <div className="flex items-end gap-4 border-b border-gray-600 pb-3">
                <h1 className="text-[1.8rem]">{repo.full_name}</h1>

                <p className="bg-blue-950 px-2 rounded-2xl border border-gray-700">{repo.private ? 'private' : 'public'}</p>
                
                <a href={repo.html_url} target="_blank">GitHub-{'>'}</a>
            </div>

            <div className="flex flex-col gap-8 py-8 h-full">
                <div className="flex justify-between border-b border-gray-600 pb-4">
                    <button>Stars: {repo.stargazers_count}</button>
                    <div className="flex gap-6">
                        <button className="">Edit</button>
                        <button>Commit</button>
                        <button>Fork</button>
                        <button>Clone</button>
                        <button className="text-red-700" onClick={() => setDelTriggered(true)}>Delete</button>
                    </div>
                </div>

                {/* file structure and code display */}
                <div className="flex flex-col gap-3 p-4 border  border-gray-600 rounded-2xl">
                    {loadingFiles && <p>Loading Files...</p>}

                    {error && <p className="text-red-800">{error}</p>}

                    {!loadingFiles && !error && !contents && <p>This repository is empty!</p>}

                    {/* fist load the folders */}
                    {!loadingFiles && !error && contents && (
                        contents.filter((item) => item.type === 'dir').map((item) => {
                            return (
                                <Link key={item.sha} to='/' className="border-b border-gray-700 pb-1">
                                    <div className="flex gap-2">
                                        <span>{<FolderIcon />}</span>
                                        <p>{item.name}</p>
                                    </div>
                                </Link>
                            )
                        })
                    )}

                    {/* then load the files */}
                    {!loadingFiles && !error && contents && (
                        contents.filter((item) => item.type !== 'dir').map((item) => {
                            return (
                                <Link key={item.sha} to='/' className="border-b border-gray-700 pb-1">
                                    <div className="flex gap-2">
                                        <span>{<FileIcon />}</span>
                                        <p>{item.name}</p>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>

                {/* readme display */}
                <div className="border  border-gray-600 rounded-2xl h-fit p-4">
                    <h1 className="text-3xl border-b border-gray-700 mb-4">README.md</h1>
                    {repo.description ? <p>{repo.description}</p> : <p>No / empty README (Description) file!</p>}
                </div>
            </div>
            {delTriggered && <DeleteRepo username={repo.owner.login} reponame={repo.name} destroyer={setDelTriggered} />}
        </div>
    )
}
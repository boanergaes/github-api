import { useState } from "react"
import { clearCatch } from "../Catch"

function DeleteRepo({username, reponame, destroyer}) {
    const [deleting, setDeleting] = useState(false)

    return (
        <div className="absolute w-screen h-screen top-0 left-0 flex items-center bg-[#000000b9]">
            <div className="px-4 pt-3 m-auto z-20 w-[600px] h-[150px] flex flex-col justify-around bg-gray-800 rounded-md">
                <p>Are you sure you want to delete "{reponame}"? {deleting && 'Deleting...'}</p>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => destroyer(false)}>No</button>
                    <button onClick={() => repoDeletionCarrier(username, reponame, destroyer, setDeleting)}>Yes</button>
                </div>
            </div>
        </div>
    )
}

function repoDeletionCarrier(username, reponame, destroyer, setDeleting) {
    const deleteURL = `https://api.github.com/repos/${username}/${reponame}`
    const github_token = import.meta.env.VITE_GITHUB_TOKEN

    setDeleting(true)

    fetch(deleteURL, {
        'method': 'delete',
        'headers': {
            'Accept': 'Application/json',
            'Authorization': `Bearer ${github_token}`
        }
    })
    .then((res) => {
        if (res.ok) {
            destroyer(false)
            setDeleting(false)
            clearCatch() //perhaps i need to find a way to remove only the catch related to the related repo
            alert('Successfully deleted the repository!')
        }
    })
    .catch((err) => {
        alert('Failed to delete repository')
        console.log(err)
    })   
}

export default function CodePanel({repo}) {
    const [delTriggered, setDelTriggered] = useState(false)

    return (
        <div className="">
            <div className="flex items-end gap-4 border-b border-gray-600 pb-3">
                <h1 className="text-[1.8rem]">{repo.full_name}</h1>

                <p className="bg-blue-950 px-2 rounded-2xl border border-gray-700">{repo.private ? 'private' : 'public'}</p>
                
                <a href={repo.html_url} target="_blank">GitHub-{'>'}</a>
            </div>

            <div className="py-8">
                <div className="flex justify-between">
                    <button>Stars: {repo.stargazers_count}</button>
                    <div className="flex gap-6">
                        <button className="">Edit</button>
                        <button>Commit</button>
                        <button>Fork</button>
                        <button>Clone</button>
                        <button className="text-red-700" onClick={() => setDelTriggered(true)}>Delete</button>
                    </div>
                </div>
            </div>
            {delTriggered && <DeleteRepo username={repo.owner.login} reponame={repo.name} destroyer={setDelTriggered} />}
        </div>
    )
}
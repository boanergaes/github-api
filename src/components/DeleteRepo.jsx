import { clearCatch } from "../Catch"
import { useState } from "react"

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

export default function DeleteRepo({username, reponame, destroyer}) {
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

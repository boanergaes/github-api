import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CodePanel from "../components/CodePanel"
import MessagePanel from "../components/MessagePanel"
import { grabCatch, isCatched, storeCatch } from "../Catch"

export default function RepoMain() {
    const {username, reponame} = useParams()
    const [repo, setRepo] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchURL = `https://api.github.com/repos/${username}/${reponame}`

    async function fetchRepo() {
        if (isCatched(fetchURL)) {
            setRepo(grabCatch(fetchURL))
            setLoading(false)
            return
        }

        try {
            const response = await fetch(fetchURL)
            const fetchedRepo = await response.json()
            setRepo(fetchedRepo)
            storeCatch(fetchURL, fetchedRepo)
        } catch(err) {
            setError(err.message)
        } finally {
            setLoading(false)
            console.log('fetch called!')
        }
    }

    useEffect(() => {
        fetchRepo()
    }, [])

    if (loading) {
        return (
            <div className="">
                <p>Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="">
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-[1fr_30rem] gap-12">
            <CodePanel repo={repo} />
            <MessagePanel />
        </div>
    )
}
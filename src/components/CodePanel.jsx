export default function CodePanel({repo}) {
    return (
        <div className="">
            <div className="flex items-end gap-4 border-b border-gray-600 pb-3">
                <h1 className="text-[1.8rem]">{repo.full_name}</h1>
                <a href={repo.html_url} target="_blank">GitHub-{'>'}</a>
            </div>

            <div className="py-8">
                <div className="flex justify-between">
                    <button>Stars: {repo.stars}</button>
                    <div className="flex gap-6">
                        <button className="">Edit</button>
                        <button>Commit</button>
                        <button>Fork</button>
                        <button>Clone</button>
                        <button className="text-red-700">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
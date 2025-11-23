import { Route, Routes, useParams } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import CreateRepo from './pages/CreateRepo'
import AccountDisplay from './pages/AccountDisplay'
import RepoMain from './pages/RepoMain'

function App() {
    return (
        <>
            <Header />
            <div className='pt-20'>
                <Routes>
                    <Route path='/' element={<AccountDisplay />}/>
                    <Route path='/create-repo' element={<CreateRepo />} />
                    <Route path='/repo/:username/:reponame' element={<RepoMain />} />
                </Routes>
                {/* <FetchAccount />
                <CreateRepo /> */}
            </div>
        </>
    )
}

export default App

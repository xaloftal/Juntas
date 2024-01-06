import {Routes, Route} from 'react-router-dom'

import Login from '../pages/Login'
import SignUp from '../pages/RegistoUtente'

function MyRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/registo" element={<SignUp />}/>
        </Routes>
    )
}

export default MyRouter;
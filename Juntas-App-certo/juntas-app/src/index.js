import React from 'react';
import ReactDOM from 'react-dom';

import Login from './pages/Login';
import SignUp from './pages/RegistoUtente';
import SignUpMed from './pages/RegistoMedico';
import SignUpAdm from './pages/RegistoAdm';
import PatientPageOne from './pages/UtenteSolicitacao';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PatientPageOne />);


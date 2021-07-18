import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef } from 'react';
import { Account, Operations, ToastPortal } from './components';

function App() {
  const toastRef = useRef();

  const addToast = (mode, message) => {
    toastRef.current.addMessage({ mode, message });
  };

  const path = 'http://localhost:8080';

  return (
    <div className="container">
      <h1 className="mt-3">Sistema bancário</h1>
      <div className="row mt-3">
        <Account
          method={'POST'}
          endpoint={`${path}/account/create/`}
          title={'Cadastrar conta'}
          message={'Cadastrar'}
          addToast={addToast}
        />
      </div>
      <div className="row mt-3">
        <Account
          method={'GET'}
          endpoint={`${path}/account/extract/`}
          title={'Consultar saldo'}
          message={'Consultar'}
          addToast={addToast}
        />
      </div>
      <div className="row mt-3">
        <Operations
          title={'Operações'}
          message={'Enviar'}
          endpoint={`${path}/account/`}
          addToast={addToast}
        />
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </div>
  );
}

export default App;

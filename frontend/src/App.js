import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useState } from 'react';
import { Account, Operations, ToastPortal } from './components';
import { path } from './constants';

function App() {
  const [selectedOption, setSelectedOption] = useState('NewAccount');

  const toastRef = useRef();

  const addToast = (mode, message) => {
    toastRef.current.addMessage({ mode, message });
  };

  return (
    <div className="container">
      <h6 className="mt-3 mb-0 text-center">Seja bem vindo ao</h6>
      <h1 className="text-center">Sistema bancário</h1>

      <p className="mb-1">Escolha uma opção:</p>
      <div className="radio mx-4">
        <label>
          <input
            className="m-2"
            type="radio"
            value="NewAccount"
            checked={selectedOption === "NewAccount"}
            onChange={(event) => setSelectedOption(event.target.value)}
          />
          Cadastro de conta
        </label>
      </div>
      <div className="radio mx-4">
        <label>
          <input
            className="m-2"
            type="radio"
            value="ConsultBalance"
            checked={selectedOption === "ConsultBalance"}
            onChange={(event) => setSelectedOption(event.target.value)}
          />
          Consulta de saldo
        </label>
      </div>
      <div className="radio mx-4">
        <label>
          <input
            className="m-2"
            type="radio"
            value="Operations"
            checked={selectedOption === "Operations"}
            onChange={(event) => setSelectedOption(event.target.value)}
          />
          Operações
        </label>
      </div>

      <div className="my-4" style={{ width: '100%', height: '1px', background: '#ccc' }}/>

      {selectedOption === "NewAccount" && (
        <div className="row mt-3">
          <Account
            method={'POST'}
            endpoint={`${path}/account/create/`}
            title={'Cadastrar conta'}
            message={'Cadastrar'}
            addToast={addToast}
          />
        </div>
      )}

      {selectedOption === "ConsultBalance" && (
        <div className="row mt-3">
          <Account
            method={'GET'}
            endpoint={`${path}/account/extract/`}
            title={'Consultar saldo'}
            message={'Consultar'}
            addToast={addToast}
          />
        </div>
      )}

      {selectedOption === "Operations" && (
        <div className="row mt-3">
          <Operations
            title={'Operações'}
            message={'Enviar'}
            endpoint={`${path}/account/`}
            addToast={addToast}
          />
        </div>
      )}

      <ToastPortal ref={toastRef} autoClose={true} />
    </div>
  );
}

export default App;

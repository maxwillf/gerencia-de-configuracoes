import axios from 'axios';
import React, { useState } from 'react';
import { path } from '../../constants';

const EndpointOperations = {
  base: `${path}/account/`,
  interest: `${path}/savings/interest/`,
}

export function Operations({ title, message, endpoint, addToast }) {
  const [accountId, setAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [value, setValue] = useState('');
  const [operation, setOperation] = useState('credit');

  const onSubmit = (event) => {
    event.preventDefault();

    if (operation === 'interest') {
      axios
        .post(`${EndpointOperations.interest}${accountId}`, {
          percentage_rate: value.toString(),
        })
        .then((response) => {
          if (response.data.includes('Saldo')) {
            addToast('success', response.data);
          } else {
            addToast('info', response.data);
          }
        })
        .catch((error) => {
          addToast('error', 'Falha ao carregar os dados');
        })
        .finally(() => {
          setAccountId('');
          setValue('');
        });
    } else if (operation === 'transfer') {
      console.log('oi');
      axios
        .post(`${EndpointOperations.base}${accountId}/${operation}/${toAccountId}`, {
          value: value.toString(),
        })
        .then((response) => {
          if (response.data.includes('Saldo')) {
            addToast('success', response.data);
          } else {
            addToast('info', response.data);
          }
        })
        .catch((error) => {
          addToast('error', 'Falha ao carregar os dados');
        })
        .finally(() => {
          setAccountId('');
          setValue('');
          setToAccountId('');
        });
    } else {
      axios
        .post(`${EndpointOperations.base}${accountId}/${operation}`, {
          value: value.toString(),
        })
        .then((response) => {
          if (response.data.includes('Saldo')) {
            addToast('success', response.data);
          } else {
            addToast('info', response.data);
          }
        })
        .catch((error) => {
          addToast('error', 'Falha ao carregar os dados');
        })
        .finally(() => {
          setAccountId('');
          setValue('');
        });
    }
  };

  return (
    <>
      <h3 className="mt-3">{title}</h3>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-sm col-lg-2">
            <select
              className="form-select"
              aria-label="operations"
              onChange={(event) => setOperation(event.target.value)}
              value={operation}
            >
              <option value="credit">Crédito</option>
              <option value="debit">Débito</option>
              <option value="transfer">Transferência</option>
              <option value="interest">Render Juros</option>
            </select>
          </div>
          <div className="col-sm col-lg-3">
            <input
              required="required"
              type="number"
              className="form-control"
              id="accountId"
              value={accountId}
              onChange={(event) => setAccountId(event.target.value)}
              placeholder={`Número da conta ${
                operation === 'transfer' ? 'de origem' : ''
              }`}
            />
          </div>

          <div className="col-sm col-lg-3">
            <input
              required="required"
              type="number"
              className="form-control"
              id="value"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={
                operation === 'interest'
                  ? "Taxa de juros que deseja acrescentar"
                  : "Valor que deseja transferir"
              }
            />
          </div>
          {operation === 'transfer' ? (
            <div className="col-sm col-lg-3">
              <input
                required="required"
                type="number"
                className="form-control"
                id="value"
                value={toAccountId}
                onChange={(event) => setToAccountId(event.target.value)}
                placeholder="Número da conta de destino"
              />
            </div>
          ) : null}

          <div className="col-sm">
            <button type="submit" className="btn btn-primary">
              {message}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

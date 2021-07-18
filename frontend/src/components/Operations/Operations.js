import axios from 'axios';
import React, { useState } from 'react';

export function Operations({ title, message, endpoint, addToast }) {
  const [accountId, setAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [value, setValue] = useState('');
  const [operation, setOperation] = useState('credit');

  const onSubmit = (event) => {
    event.preventDefault();

    if (operation === 'transfer') {
      axios
        .post(`${endpoint}${accountId}/${operation}/${toAccountId}`, {
          value: value.toString(),
        })
        .then((response) => {
          if (response.data.includes('Saldo')) {
            addToast('success', response.data);
          } else {
            addToast('info', response.data);
          }
        })
        .catch((error) => addToast('warning', error))
        .finally(() => {
          setAccountId('');
          setValue('');
          setToAccountId('');
        });
    } else {
      axios
        .post(`${endpoint}${accountId}/${operation}`, {
          value: value.toString(),
        })
        .then((response) => {
          if (response.data.includes('Saldo')) {
            addToast('success', response.data);
          } else {
            addToast('info', response.data);
          }
        })
        .catch((error) => addToast('warning', error))
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
            >
              <option value="credit" selected>
                Crédito
              </option>
              <option value="debit">Débito</option>
              <option value="transfer">Transferência</option>
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
              placeholder="Valor que deseja transferir"
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
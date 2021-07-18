import axios from 'axios';
import React, { useState } from 'react';

export function Account({ title, message, method, endpoint, addToast }) {
  const [accountId, setAccountId] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    setAccountId((oldValue) => Math.trunc(oldValue));

    if (method === 'GET') {
      axios
        .get(`${endpoint}${accountId}`)
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
        .finally(() => setAccountId(''));
    } else if (method === 'POST') {
      axios
        .post(`${endpoint}${accountId}`)
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
        .finally(() => setAccountId(''));
    }
  };

  return (
    <>
      <h3 className="mt-3">{title}</h3>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-sm col-lg-4">
            <input
              required="required"
              type="number"
              className="form-control"
              id="accountId"
              value={accountId}
              onChange={(event) => setAccountId(event.target.value)}
              placeholder="Número da conta"
            />
          </div>

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

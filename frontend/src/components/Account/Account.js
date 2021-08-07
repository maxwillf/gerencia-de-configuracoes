import axios from 'axios';
import React, { useState } from 'react';

import { path } from '../../constants';

const EndpointNewAccount = {
  simple: `${path}/account/create/`,
  bonus: `${path}/bonus/create/`,
  savings: `${path}/savings/create/`,
}

export function Account({ title, message, method, endpoint, addToast }) {
  const [accountId, setAccountId] = useState('');
  const [accountType, setAccountType] = useState('simple');

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
        .post(`${EndpointNewAccount[accountType]}${accountId}`)
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

      {method === 'POST' && (
        <div className="row my-2">
          <div className="radio">
            <label className="m-2">
              <input
                className="m-2"
                type="radio"
                value="simple"
                checked={accountType === "simple"}
                onChange={(event) => setAccountType(event.target.value)}
              />
              Conta Simples
            </label>

            <label className="m-2">
              <input
                className="m-2"
                type="radio"
                value="bonus"
                checked={accountType === "bonus"}
                onChange={(event) => setAccountType(event.target.value)}
              />
              Conta Bônus
            </label>

            <label className="m-2">
              <input
                className="m-2"
                type="radio"
                value="savings"
                checked={accountType === "savings"}
                onChange={(event) => setAccountType(event.target.value)}
              />
              Conta Poupança
            </label>
          </div>
        </div>
      )}

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

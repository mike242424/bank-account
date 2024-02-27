import { useReducer } from 'react';
import Button from './Button';

const initialState = {
  balance: 0,
  loan: 0,
  status: 'closed',
};

function reducer(state, action) {
  if (state.status === 'closed' && action.type !== 'openAccount') return state;

  switch (action.type) {
    case 'openAccount':
      return {
        ...state,
        balance: state.balance + action.payload,
        status: 'open',
      };
    case 'deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'withdraw':
      if (state.balance === 0) return state;
      return { ...state, balance: state.balance - action.payload };
    case 'requestLoan':
      if (state.loan > 0) return state;

      return {
        ...state,
        balance: state.balance + action.payload,
        loan: state.loan + action.payload,
      };
    case 'payLoan':
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: state.loan - action.payload,
      };

    case 'closeAccount':
      if (state.balance !== 0 || state.loan !== 0) return state;

      return initialState;

    default:
      throw new Error('Unknown action type');
  }
}

const App = () => {
  const [{ balance, loan, status }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <div>
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <div>
        <Button
          dispatch={dispatch}
          type="openAccount"
          status={status}
          openOrClosed="open"
          payload={500}
        >
          Open Account
        </Button>
        <Button
          dispatch={dispatch}
          type="deposit"
          status={status}
          openOrClosed="closed"
          payload={150}
        >
          Deposit 150
        </Button>
        <Button
          dispatch={dispatch}
          type="withdraw"
          status={status}
          openOrClosed="closed"
          payload={50}
        >
          Withdraw 50
        </Button>
        <Button
          dispatch={dispatch}
          type="requestLoan"
          status={status}
          openOrClosed="closed"
          payload={5000}
        >
          Request a loan of 5000
        </Button>
        <Button
          dispatch={dispatch}
          type="payLoan"
          status={status}
          openOrClosed="closed"
          payload={5000}
        >
          Pay loan
        </Button>
        <Button
          dispatch={dispatch}
          type="closeAccount"
          status={status}
          openOrClosed="closed"
        >
          Close account
        </Button>
      </div>
    </div>
  );
};

export default App;

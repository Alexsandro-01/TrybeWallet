// Coloque aqui suas actions
export const EMAIL = 'email';
export const CURRENCIES = 'currencies';
export const EXPENSES = 'expenses';
export const DELETE_EXPENSE = 'delete_expense';
export const EDIT_EXPENSE = 'edit_expense';
export const BTN_EDIT = 'edit_btn';
export const EXPENSE_FOR_EDIT = 'expense_for_edit';

export const actionUser = (payload) => ({
  type: EMAIL,
  email: payload,
});

const actionCurrencies = (payload) => ({
  type: CURRENCIES,
  currencies: payload,
});

export const actionExpenses = (payload) => ({
  type: EXPENSES,
  expenses: payload,
});

export const actionDeleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  expense: payload,
});

export const actionEditExpense = (payload) => ({
  type: EDIT_EXPENSE,
  expense: payload,
});

export const actionExpenseForEdit = (payload) => ({
  type: EXPENSE_FOR_EDIT,
  expenseForEdit: payload,
});

export const actionbtnEdit = (payload) => ({
  type: BTN_EDIT,
  edit: payload,
});

export function fetchCoin() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    const arr = Object.keys(data);
    return dispatch(actionCurrencies(arr));
  };
}

export function fetchInfoCoins(userValues) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    const expenses = {
      ...userValues,
      exchangeRates: data,
    };
    return dispatch(actionExpenses(expenses));
  };
}

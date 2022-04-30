// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EXPENSES,
  CURRENCIES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  BTN_EDIT,
  EXPENSE_FOR_EDIT,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  currentId: 0,
  totalExpense: 0,
  expenseForEdit: {},
  edit: false,
};

function edit(state, expense) {
  const obj = state.expenses.find((value) => value.id === expense.id);
  let ind;
  state.expenses.forEach((value, index) => {
    if (value.id === expense.id) {
      ind = index;
    }
  });
  obj.value = expense.value;
  obj.currency = expense.currency;
  obj.description = expense.description;
  obj.method = expense.method;
  obj.tag = expense.tag;
  state.expenses[ind] = obj;
  return {
    ...state,
    expenses: [...state.expenses],
    edit: true,
  };
}

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EXPENSES:
    return {
      ...state,
      currentId: state.currentId + 1,
      expenses: state.expenses.concat({ id: state.currentId, ...action.expenses }),
    };
  case CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expense.id),
    };
  case EDIT_EXPENSE:
    return edit(state, action.expense);
  case EXPENSE_FOR_EDIT:
    return {
      ...state,
      expenseForEdit: action.expenseForEdit,
    };
  case BTN_EDIT:
    return {
      ...state,
      edit: action.edit,
    };
  default:
    return state;
  }
};

export default wallet;

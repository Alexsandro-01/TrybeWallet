import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { actionDeleteExpense, actionbtnEdit, actionExpenseForEdit } from '../actions';
import '../styles/table.css';

class Table extends Component {
  render() {
    const { expenses, deleteExpense, funcEditExpense, editBtnShow } = this.props;
    return (
      <section className="table-result">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>
                    {
                      expense.exchangeRates
                        && expense.exchangeRates[expense.currency].name
                    }
                  </td>
                  <td>
                    { expense.exchangeRates
                      && Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                  </td>
                  <td>
                    {
                      expense.exchangeRates
                        && (expense.exchangeRates[expense.currency].ask
                          * expense.value).toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      onClick={ () => {
                        funcEditExpense(expense);
                        editBtnShow(true);
                      } }
                      type="button"
                      data-testid="edit-btn"
                      className="editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={ () => {
                        deleteExpense(expense);
                        editBtnShow(false);
                      } }
                      data-testid="delete-btn"
                      type="button"
                      className="excluir"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  funcEditExpense: PropTypes.func.isRequired,
  editBtnShow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(actionDeleteExpense(expense)),
  editBtnShow: (bool) => dispatch(actionbtnEdit(bool)),
  funcEditExpense: (expense) => dispatch(actionExpenseForEdit(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

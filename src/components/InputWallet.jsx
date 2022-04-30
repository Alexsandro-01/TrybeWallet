import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/inputWallet.css';
import { fetchInfoCoins, actionEditExpense, actionbtnEdit } from '../actions';

const ALIMENTACAO = 'Alimentação';

class InputWallet extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    };
  }

  componentDidUpdate(prevProps) {
    const { expenseForEdit, edit } = this.props;
    if (edit && edit !== prevProps.edit) {
      this.handleValuesToEdit(expenseForEdit);
    }
    if (!edit && prevProps.edit) {
      this.resetState();
    }
  }

  handleValue = ({ target }) => {
    switch (target.id) {
    case 'valor':
      this.setState({
        value: target.value,
      });
      break;
    case 'descricao':
      this.setState({
        description: target.value,
      });
      break;
    default:
      break;
    }
  }

  handleSelect = ({ target }) => {
    switch (target.id) {
    case 'moeda':
      this.setState({
        currency: target.value,
      });
      break;
    case 'metodo':
      this.setState({
        method: target.value,
      });
      break;
    case 'categoria':
      this.setState({
        tag: target.value,
      });
      break;
    default:
      break;
    }
  }

  handleValuesToEdit = (expense) => {
    this.setState({
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
    });
  }

  resetState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    });
  }

  render() {
    const {
      currencies,
      addState,
      editState,
      expenseForEdit,
      edit,
      editBtnShow,
    } = this.props;

    const { value, description, currency, method, tag } = this.state;
    return (
      <section className="inputWallet">
        <div>
          <label htmlFor="valor">
            Valor
            <input
              onChange={ (e) => this.handleValue(e) }
              value={ value }
              type="number"
              id="valor"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              onChange={ (e) => this.handleSelect(e) }
              data-testid="currency-input"
              value={ currency }
              name="moeda"
              id="moeda"
            >
              {
                currencies.map((coin) => (
                  <option key={ coin } value={ coin }>{ coin }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="metodo">
            Método
            <select
              onChange={ (e) => this.handleSelect(e) }
              value={ method }
              name="metodo"
              id="metodo"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria
            <select
              onChange={ (e) => this.handleSelect(e) }
              value={ tag }
              name="categoria"
              id="categoria"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="descricao">
            Descrição
            <input
              onChange={ (e) => this.handleValue(e) }
              value={ description }
              type="text"
              autoComplete="off"
              id="descricao"
              data-testid="description-input"
            />
          </label>
        </div>
        <div>
          {
            edit ? (
              <button
                onClick={ () => {
                  editState({ ...this.state, id: expenseForEdit.id });
                  editBtnShow(false);
                } }
                type="button"
                className="editar-despesa"
              >
                Editar despesa
              </button>
            )
              : (
                <button
                  onClick={ () => {
                    addState(this.state);
                    this.resetState();
                  } }
                  type="button"
                >
                  Adicionar despesa
                </button>
              )
          }
        </div>
      </section>
    );
  }
}

InputWallet.defaultProps = {
  edit: true,
  expenseForEdit: {},
};

InputWallet.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  addState: PropTypes.func.isRequired,
  editState: PropTypes.func.isRequired,
  expenseForEdit: PropTypes.instanceOf(Object),
  edit: PropTypes.bool,
  editBtnShow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expenseForEdit: state.wallet.expenseForEdit,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  addState: (value) => dispatch(fetchInfoCoins(value)),
  editState: (value) => dispatch(actionEditExpense(value)),
  editBtnShow: (bool) => dispatch(actionbtnEdit(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputWallet);

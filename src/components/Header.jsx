import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.css';

class Header extends Component {
  handleTotalSum = () => {
    // const { totalExpense } = this.props;
    // if (totalExpense > 0) {
    //   return totalExpense.toFixed(2);
    // }
    // return 0;
    const { expenses } = this.props;
    let count = 0;
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        count += expense.value * (expense.exchangeRates[expense.currency].ask);
      });
    }
    return count.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <section>
          <div>
            <h1>
              Finance
            </h1>
          </div>
          <div>
            <p data-testid="email-field">
              Email:
              {' '}
              { email }
            </p>
            <p>
              Despesa Total:
              {' '}
              R$
              {' '}
              <span data-testid="total-field">{ this.handleTotalSum() }</span>
              {' '}
              <span data-testid="header-currency-field">
                BRL
              </span>
            </p>
          </div>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  totalExpense: state.wallet.totalExpense,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

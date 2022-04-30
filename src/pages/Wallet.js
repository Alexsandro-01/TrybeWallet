import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCoin } from '../actions';
import InputWallet from '../components/InputWallet';
import Table from '../components/Table';

class Wallet extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     expense: {},
  //   };
  // }

  componentDidMount() {
    const { requestCoins } = this.props;
    requestCoins();
  }

  // editExpense = (expense) => {
  //   this.setState({
  //     expense,
  //   });
  // }

  render() {
    const { email } = this.props;
    // const { expense } = this.state;
    return (
      <main>
        <Header email={ email } />
        <InputWallet />
        <Table funcEditExpense={ this.editExpense } />
      </main>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  requestCoins: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  requestCoins: () => dispatch(fetchCoin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

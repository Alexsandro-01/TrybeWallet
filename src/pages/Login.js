import React from 'react';
import '../styles/login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      disable: true,
    };
  }

  handleEmail = ({ target }) => {
    this.setState({
      email: target.value,
    }, () => {
      this.libre();
    });
  }

  handleSenha = ({ target }) => {
    this.setState({
      senha: target.value,
    }, () => {
      this.libre();
    });
  }

  libre = () => {
    const { senha, email } = this.state;
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    // Solução com regex para testar email retirada com base na solução encontrada nesta url;
    const re = /\S+@\S+\.\S+/; /**/
    const MIN_LENGTH = 6;
    if (senha.length >= MIN_LENGTH && re.test(email)/**/) {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        disable: true,
      });
    }
  }

  render() {
    const { email, senha, disable } = this.state;
    const { add, history } = this.props;
    return (
      <section className="login-box">
        <h1>Sign in</h1>
        <div>
          <input
            value={ email }
            type="email"
            onChange={ (e) => this.handleEmail(e) }
            data-testid="email-input"
            placeholder="Email"
          />
          <input
            value={ senha }
            type="password"
            onChange={ (e) => this.handleSenha(e) }
            data-testid="password-input"
            placeholder="Senha"
          />
        </div>
        <div>
          <button
            className={ disable ? 'disabled' : 'able-btn' }
            type="button"
            disabled={ disable }
            onClick={ () => {
              add(email);
              history.push('/carteira');
            } }
          >
            Entrar
          </button>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  add: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add: (value) => dispatch(actionUser(value)),
});

export default connect(null, mapDispatchToProps)(Login);

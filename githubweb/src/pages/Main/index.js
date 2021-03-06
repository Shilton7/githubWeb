import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List } from './styles';
import api from '../../services/api';
import Container from '../../components/Container';

export default class Main extends Component {
  state = {
    novoNomeRepo: '',
    repositorios: [],
    loading: false,
  };

  componentDidMount() {
    const repositorios = localStorage.getItem('repositorios');

    if (repositorios) {
      this.setState({
        repositorios: JSON.parse(repositorios),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositorios } = this.state;

    if (prevState.repositorios === repositorios) {
      localStorage.setItem('repositorios', JSON.stringify(repositorios));
    }
  }

  handleInputChange = e => {
    this.setState({ novoNomeRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { novoNomeRepo, repositorios } = this.state;

    const response = await api.get(`repos/${novoNomeRepo}`);
    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositorios: [...repositorios, data],
      novoNomeRepo: '',
      loading: false,
    });
  };

  render() {
    const { novoNomeRepo, loading, repositorios } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={novoNomeRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositorios.map(repositorio => (
            <li key={repositorio.name}>
              <span>{repositorio.name}</span>
              <Link to={`/repositorio/${encodeURIComponent(repositorio.name)}`}>
                mais detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

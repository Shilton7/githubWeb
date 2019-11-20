import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { Loading, Owner, IssueList } from './styles';
import Container from '../../components/Container';
import { Link } from 'react-router-dom';

export default class Repositorio extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repositorio: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repositorio: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repositorioName = decodeURIComponent(match.params.repositorio);

    const [repositorio, issues] = await Promise.all([
      api.get(`/repos/${repositorioName}`),
      api.get(`/repos/${repositorioName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repositorio: repositorio.data,
      issues: issues.data,
      loading: false,
    });
  }
  render() {
    const { repositorio, issues, loading } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to={`/`}>Listagem de busca de repositórios</Link>
          <img
            src={repositorio.owner.avatar_url}
            alt={repositorio.owner.login}
          />

          <h1>{repositorio.name}</h1>
          <p>{repositorio.description}</p>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}

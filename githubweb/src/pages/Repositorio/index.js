import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

// import { Container } from './styles';

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
      laoding: false,
    });
  }
  render() {
    const { repositorio, issues, laoding } = this.state;
    return <h1>ok</h1>;
  }
}

import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

// rotação icone loading
const rotacao = keyframes`
from {
transform: rotacao(0deg);
}
to {
  transform: rotacao(360deg);
}`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  /* conteudo do botao alinhado ao centro */
  display: flex;
  justify-content: center;
  align-items: center;

  /* manipulando loadin button */
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* aplicando rotacao ao icon do button */
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotacao} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    /* aplica estilo so após primeiro item  */
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;

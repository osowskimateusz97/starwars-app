import styled, { css } from 'styled-components';
import loadingSpinner from 'assets/loadingSpinner.svg';
import PropTypes from 'prop-types';

const LoadingSpinner = styled.div`
  background: url(${loadingSpinner}) no-repeat;
  width: 45px;
  height: 40px;
  background-size: 100%;

  ${({ small }) =>
    small &&
    css`
      height: 20px;
      width: 22px;
    `}
`;

LoadingSpinner.propTypes = {
  small: PropTypes.bool,
};

export default LoadingSpinner;

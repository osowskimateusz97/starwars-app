import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
const Button = styled.button`
  background: ${({ theme: { colors } }) => colors.buttonBgColor};
  border-radius: 4px;
  width: 160px;
  font-weight: bold;
  height: 33px;
  font-size: ${({ theme: { fontSize } }) => fontSize.smallSize};
  border: none;
  outline: none;
  cursor: pointer;
  letter-spacing: 0.05em;
  line-height: 16px;
  color: #fff;
  margin: 20px;
  ${({ inactive }) =>
    inactive &&
    css`
      background-color: ${({ theme: { mainColors } }) => mainColors.mainColor};
    `}
`;

Button.propTypes = {
  inactive: PropTypes.bool,
};

export default Button;

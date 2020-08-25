import styled, { css } from 'styled-components';
import arrowCloseIcon from 'assets/arrowClose.svg';
import arrowOpenIcon from 'assets/arrowOpen.svg';
const ExpandButton = styled.div`
  width: 18px;
  height: 18px;
  cursor: pointer;
  background: url(${arrowOpenIcon});
  ${({ active }) =>
    active &&
    css`
      background: url(${arrowCloseIcon});
    `}
`;

export default ExpandButton;

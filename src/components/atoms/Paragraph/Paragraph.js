import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
const Paragraph = styled.p`
  font-size: ${({ theme: { fontSize } }) => fontSize.bigSize};
  font-weight: bold;
  line-height: 19px;
  color: ${({ theme: { colors } }) => colors.fontColor};
  ${({ listType }) =>
    listType &&
    css`
      font-weight: normal;
      font-size: ${({ theme: { fontSize } }) => fontSize.smallSize};
    `}
`;
Paragraph.propTypes = {
  listType: PropTypes.string,
};
export default Paragraph;

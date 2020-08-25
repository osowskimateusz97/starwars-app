import styled, { css } from 'styled-components';

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

export default Paragraph;

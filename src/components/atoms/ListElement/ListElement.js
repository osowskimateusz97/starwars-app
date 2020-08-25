import styled, { css } from 'styled-components';

const ListElement = styled.li`
  padding: 10px 15px;
  line-height: 14px;
  list-style: none;
  text-decoration: none;
  font-size: ${({ theme: { fontSize } }) => fontSize.smallSize};
  ${({ planetName }) =>
    planetName &&
    css`
      ${({ theme: { colors } }) => colors.fontColor};
    `}
`;

export default ListElement;

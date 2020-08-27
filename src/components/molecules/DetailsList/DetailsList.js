import React from 'react';
import ListElement from 'components/atoms/ListElement/ListElement';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.div`
  display: none;
  grid-template-columns: repeat(7, 100px);
  grid-template-rows: 1fr;

  @media (max-width: 800px) {
    height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(7, 50px);
    margin-bottom: 15px;
    grid-column: 1 / span 1;
    margin-top: 7px;
  }
  ${({ isActive }) =>
    isActive &&
    css`
      display: grid;
    `}
`;
const StyledListElement = styled(ListElement)`
  padding: 0;
  justify-self: center;
  @media (max-width: 800px) {
    justify-self: start;

    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  ${({ addPaddingBig }) =>
    addPaddingBig &&
    css`
      padding-left: 15px;
    `}
  ${({ addPaddingSmall }) =>
    addPaddingSmall &&
    css`
      padding-left: 13px;
    `}
`;
const DetailsList = ({ isActive }) => {
  return (
    <StyledWrapper isActive={isActive}>
      <StyledListElement planetName>Planet Name</StyledListElement>
      <StyledListElement>Rotation period</StyledListElement>
      <StyledListElement>Orbital period</StyledListElement>
      <StyledListElement addPaddingBig> Diameter</StyledListElement>
      <StyledListElement addPaddingSmall>Climate</StyledListElement>
      <StyledListElement>Surface water</StyledListElement>
      <StyledListElement>Population</StyledListElement>
    </StyledWrapper>
  );
};
export default DetailsList;

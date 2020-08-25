import React from 'react';
import ListElement from 'components/atoms/ListElement/ListElement';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const DetailsList = () => {
  return (
    <StyledWrapper>
      <ListElement planetName>Planet Name</ListElement>
      <ListElement>Rotation period</ListElement>
      <ListElement>Orbital period</ListElement>
      <ListElement>Diameter</ListElement>
      <ListElement>Climate</ListElement>
      <ListElement>Surface water</ListElement>
      <ListElement>Population</ListElement>
    </StyledWrapper>
  );
};
export default DetailsList;

import React, { useState, useEffect } from 'react';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import styled, { css, keyframes } from 'styled-components';
import ExpandButton from 'components/atoms/ExpandButton/ExpandButton';
import DetailsList from 'components/molecules/DetailsList/DetailsList';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 730px;
  background-color: #fff;
  position: relative;
  box-shadow: 0px 4px 12px rgba(224, 230, 238, 0.5);
  border-radius: 4px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(7, 100px);
  grid-template-rows: repeat(auto-fill, minmax(60px, 1fr));
`;

const showingAnimation = keyframes`
from{
  opacity:0;
}
  to:opacity:1;
`;

const StyledParagraph = styled(Paragraph)`
  position: relative;
  left: 5%;
  top: 15px;
  ${({ title }) =>
    title &&
    css`
      grid-column: 1/-1;
      grid-row: 1/2;
      line-height: 30px;
    `}
  ${({ data }) =>
    data &&
    css`
      animation: ${showingAnimation} 1s;
      animation-delay: 0.5;
      justify-self: center;
    `}
`;
const StyledExpandButton = styled(ExpandButton)`
  position: relative;
  transform: translateY(-50%);
  z-index: 9999;
  grid-template-columns: 1 / span 2;
  margin: 20px;
  top: 10px;
  right: 20px;
  grid-row: 1/2;
  cursor: pointer;
`;

const StyledWrapperList = styled.div`
  grid-column: 1/-1;
  grid-row: 2/3;
  height: 0;
  opacity: 0;
  transform: translateX(-100%);
  transition: transform 0.2s ease, opacity 0.4s ease-in-out, height 0.2s ease;
  ${({ active }) =>
    active &&
    css`
      transform: translate(0);
      height: 100%;
      opacity: 1;
    `}
  ${({ loading, active }) =>
    loading &&
    active &&
    css`
      height: 150px;
    `}
`;
const StyledLoadingSpinner = styled(LoadingSpinner)`
  position: absolute;
  top: 50%;
  left: 50%;
`;
const StyledDataContainer = styled.div`
  width: 100%;
  max-width: 730px;
  z-index: 99999;
  display: grid;
  padding: 0;
  grid-template-columns: repeat(7, 100px);
  grid-template-rows: repeat(auto-fill, minmax(60px, 1fr));
`;
const FilmItem = ({ title, planetsUrl, onClick, id, isActive }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch maped data about planets from fetched data from props
  useEffect(() => {
    if (planetsUrl !== undefined) {
      // eslint-disable-next-line no-inner-declarations
      function fetchPlanets() {
        planetsUrl.forEach(async (planet) => {
          let res = await fetch(planet);
          let data = await res.json();
          setPlanets((oldArr) => [...oldArr, data]);
        });
      }
      fetchPlanets();
    }
  }, []);

  // used delay for slower loading data
  const delay = () =>
    setTimeout(() => {
      setLoading(false);
    }, 500);
  const fetchId = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'surface_water',
    'population',
  ];

  if (loading) {
    return (
      <StyledWrapper>
        <StyledParagraph title="true">{title}</StyledParagraph>
        <StyledExpandButton
          onClick={() => {
            //open tab and start counting for ending of delay
            delay();
            onClick(id);
          }}
          active={isActive}
        />
        <StyledWrapperList loading="true" active={isActive}>
          <DetailsList />
          <StyledLoadingSpinner />
        </StyledWrapperList>
      </StyledWrapper>
    );
  }
  return (
    <StyledWrapper>
      <StyledParagraph title="true">{title}</StyledParagraph>
      <StyledExpandButton
        onClick={() => {
          delay();
          onClick(id);
        }}
        active={isActive}
      />
      <StyledWrapperList active={isActive}>
        <DetailsList />

        {/* generate all data about the planet from the movie */}
        {planets.map((planet, id) => (
          <StyledDataContainer key={id}>
            {fetchId.map((item, index) => (
              <StyledParagraph data="true" key={index} listType>
                {planet[item]}
              </StyledParagraph>
            ))}
          </StyledDataContainer>
        ))}
      </StyledWrapperList>
    </StyledWrapper>
  );
};

export default FilmItem;

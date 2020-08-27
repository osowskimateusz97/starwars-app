import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import styled, { css, keyframes } from 'styled-components';
import ExpandButton from 'components/atoms/ExpandButton/ExpandButton';
import DetailsList from 'components/molecules/DetailsList/DetailsList';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';

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

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
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
    ${({ isActive, data }) =>
      isActive &&
      data &&
      css`
        display: block;
      `}
`;
const StyledDetailsList = styled(DetailsList)`
  display: none;
  ${({ isActive }) =>
    isActive &&
    css`
      display: block;
    `}
  @media(max-width:800px) {
    display: none;
    ${({ isActive }) =>
      isActive &&
      css`
        display: block;
      `}
  }
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
  position: relative;
  display: none;

  transition: opacity 0.4s ease-in-out, height 0.2s ease;
  ${({ active }) =>
    active &&
    css`
      transform: translate(0);
      height: 100%;
      opacity: 1;
      display: block;
    `}
  ${({ loading, active }) =>
    loading &&
    active &&
    css`
      height: 150px;
    `}
    @media (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: column;
  }
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
  padding: 0;
  position: relative;
  grid-template-columns: repeat(7, 100px);
  grid-template-rows: repeat(auto-fill, minmax(60px, 1fr));
  display: none;
  @media (max-width: 800px) {
    margin-bottom: 30px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(7, 50px);
    margin-top: 7px;
    margin-left: 10px;
    /* padding: 20px; */
    :nth-child(3, 4, 7, 8) {
      background-color: rgba(229, 229, 229, 0.5);
    }
  }
  ${({ isActive }) =>
    isActive &&
    css`
      display: grid;
    `}
`;
const FilmItem = ({ title, data, planetsUrl, onClick, id, isActive, addPlanet, generate }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [widthSize, setWidthSize] = useState(window.innerWidth);
  // fetch maped data about planets from fetched data from props
  useEffect(() => {
    if (planetsUrl !== undefined) {
      function fetchPlanets() {
        planetsUrl.forEach(async (planet) => {
          let res = await fetch(planet);
          let data = await res.json();
          setPlanets((oldArr) => [...oldArr, data]);
        });
      }
      fetchPlanets();
    }
  }, [planetsUrl]);
  useEffect(() => {
    const handleResize = () => setWidthSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
  });

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
          <StyledDetailsList isActive={isActive} />
          <StyledLoadingSpinner />
        </StyledWrapperList>
      </StyledWrapper>
    );
  }
  if (!addPlanet) {
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
          {widthSize <= 800 ? (
            planets.map((planet, key) => <StyledDetailsList isActive={isActive} key={key} />)
          ) : (
            <StyledDetailsList isActive={isActive} />
          )}

          {/* generate all data about the planet from the movie */}
          {planets.map((planet, id) => (
            <StyledDataContainer isActive={isActive} key={id}>
              {fetchId.map((item) => (
                <StyledParagraph isActive={isActive} data="true" key={item} listType>
                  {planet[item]}
                </StyledParagraph>
              ))}
            </StyledDataContainer>
          ))}
        </StyledWrapperList>
      </StyledWrapper>
    );
  } else if (addPlanet === true && generate === true && data !== undefined) {
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
          {/* generate all data about the planet from the movie */}
          <StyledDetailsList isActive={isActive} />
          {data.map((item) => (
            <StyledDataContainer isActive={isActive} key={item.created}>
              <StyledParagraph data="true" key={item.name} listType>
                {item.name}
              </StyledParagraph>
              <StyledParagraph data="true" key={item.rotation_period} listType>
                {item.rotation_period}
              </StyledParagraph>
              <StyledParagraph data="true" key={item.orbital_period} listType>
                {item.orbital_period}
              </StyledParagraph>
              <StyledParagraph data="true" key={item.diameter} listType>
                {item.diameter}
              </StyledParagraph>
              <StyledParagraph data="true" key={item.climate} listType>
                {item.climate}
              </StyledParagraph>
              <StyledParagraph data="true" key={item.surface_water} listType>
                {item.surface_water}
              </StyledParagraph>
              <StyledParagraph data="true" key={item.population} listType>
                {item.population}
              </StyledParagraph>
            </StyledDataContainer>
          ))}
        </StyledWrapperList>
      </StyledWrapper>
    );
  }
};

FilmItem.propTypes = {
  title: PropTypes.string,
  planetsUrl: PropTypes.array,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};
FilmItem.defaultProps = {
  title: '',
  planetsUrl: undefined,
  onClick: null,
  isActive: false,
};
export default FilmItem;

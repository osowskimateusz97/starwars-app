import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserTemplate from 'templates/UserTemplate';
import FilmItem from 'components/organisms/FilmItem/FilmItem';
import styled from 'styled-components';
import Logo from 'components/atoms/Logo/Logo';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
const Line = styled.div`
  width: 100%;
  border: 2px dashed #ffffff;
`;
const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const UserPage = ({ correctData }) => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActive, setActive] = useState(null);
  useEffect(() => {
    async function fetchFilms() {
      let res = await fetch('https://swapi.dev/api/films/?format=json');
      let { results } = await res.json();
      setFilms(results);
      setLoading(false);
    }

    fetchFilms();
  }, []);

  if (loading) {
    return (
      <UserTemplate>
        <StyledWrapper>
          <Logo />
          <LoadingSpinner />
          <Line />
          <FilmItem />
        </StyledWrapper>
      </UserTemplate>
    );
  }
  return (
    <UserTemplate>
      <StyledWrapper>
        <Logo />
        {films.map(({ title, planets, episode_id: episodeId }, id) => (
          <FilmItem
            onClick={(id) => (id === isActive ? setActive(null) : setActive(id))}
            isActive={id === isActive && true}
            key={episodeId}
            id={id}
            title={title}
            planetsUrl={planets}
          />
        ))}
        <Line />
        <NewItemBar correctData={correctData}></NewItemBar>
      </StyledWrapper>
    </UserTemplate>
  );
};

UserPage.propTypes = {
  correctData: PropTypes.bool,
};
export default UserPage;

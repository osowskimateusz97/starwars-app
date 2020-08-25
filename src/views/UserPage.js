import React, { useState, useEffect } from 'react';
import UserTemplate from 'templates/UserTemplate';
import FilmItem from 'components/molecules/FilmItem/FilmItem';
import styled from 'styled-components';
import Logo from 'components/atoms/Logo/Logo';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
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
const UserPage = () => {
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
          <FilmItem add />
        </StyledWrapper>
      </UserTemplate>
    );
  }
  return (
    <UserTemplate>
      <StyledWrapper>
        <Logo />
        {films.map(({ title, planets, episode_id }, id) => (
          <FilmItem
            onClick={(id) => (id === isActive ? setActive(null) : setActive(id))}
            isActive={id === isActive && true}
            key={episode_id}
            id={id}
            title={title}
            planetsUrl={planets}
          />
        ))}
        <Line />
      </StyledWrapper>
    </UserTemplate>
  );
};

export default UserPage;

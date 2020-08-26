import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserTemplate from 'templates/UserTemplate';
import FilmItem from 'components/organisms/FilmItem/FilmItem';
import styled from 'styled-components';
import Logo from 'components/atoms/Logo/Logo';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import { PLANETS_API, FILMS_API } from 'api';
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
  const [newMovies, setNewMovie] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      let res = await fetch(FILMS_API);
      let { results } = await res.json();
      setFilms(results);
      setLoading(false);
    }

    fetchFilms();
  }, []);
  const handleAddMovie = (handleValidate, title, planets) => {
    if (!handleValidate) return;
    fetch(PLANETS_API).then((res) =>
      res.json().then(({ results }) => {
        const filterPlanets = results.filter((result) => planets.includes(result.name));
        return setNewMovie([...newMovies, { filterPlanets, title }]);
      }),
    );
  };
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
            addPlanet={false}
            onClick={(id) => (id === isActive ? setActive(null) : setActive(id))}
            isActive={id === isActive && true}
            key={episodeId}
            id={id}
            title={title}
            planetsUrl={planets}
          />
        ))}
        {newMovies.length !== 0 &&
          newMovies.map((newMovie) => (
            <FilmItem
              title={newMovie.title}
              data={newMovie.filterPlanets}
              generate={newMovie.length !== 0 ? true : false}
              addPlanet={true}
              onClick={() =>
                newMovie.title === isActive ? setActive(null) : setActive(newMovie.title)
              }
              isActive={newMovie.title === isActive && true}
              key={newMovie.title}
              id={newMovie}
              title={newMovie.title}
            />
          ))}
        <Line />
        <NewItemBar
          handleAddMovie={(correctData, title, planets) =>
            handleAddMovie(correctData, title, planets)
          }
        ></NewItemBar>
      </StyledWrapper>
    </UserTemplate>
  );
};

UserPage.propTypes = {
  correctData: PropTypes.bool,
};
export default UserPage;

import React, { Component } from 'react';
import Input from 'components/atoms/Input/Input';
import { PLANETS_API } from 'api';
import styled, { css } from 'styled-components';
import ExpandButton from 'components/atoms/ExpandButton/ExpandButton';
import SubmitButton from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import searchIcon from 'assets/search.svg';
import closeIcon from 'assets/close.svg';
import axios from 'axios';
const StyledItemBarWrapper = styled.div`
  width: 100%;
  max-width: 730px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(224, 230, 238, 0.5);
  border-radius: 4px;
  margin-bottom: 20px;
  max-height: 380px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
  height: 60px;
  transition: height 0.4s;
  ${({ isActiveTab }) =>
    isActiveTab &&
    css`
      height: 50vh;
    `}
`;
const StyledTitleBar = styled(Paragraph)`
  position: absolute;
  top: 15px;
  left: 5%;
  line-height: 30px;
`;
const StyledExpandButton = styled(ExpandButton)`
  position: absolute;
  right: 10px;
  top: 20px;
`;
const StyledErrorMsg = styled(Paragraph)`
  color: red;
  border: 1px solid red;
  padding: 5px 10px;
  width: 70%;
  box-shadow: 0px 4px 4px rgba(196, 196, 196, 0.5);
  margin-bottom: 10px;
`;
const StyledSubmitButton = styled(SubmitButton)`
  position: absolute;
  bottom: 10%;
  right: 14%;
`;

const Search = styled.div`
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
`;
const StyledInput = styled(Input)`
  position: relative;
`;
const StyledResultsWrapper = styled.div`
  width: 70%;
  background-color: white;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 4px 4px rgba(196, 196, 196, 0.5);
  z-index: 99999;
`;
const StyledResultPlanet = styled(Paragraph)`
  display: block;
  padding: 3px;
  cursor: pointer;
`;
const StyledJoinPlanet = styled(Paragraph)`
  border: 1px solid #999999;
  border-radius: 18px;
  width: 122px;
  height: 32px;
  display: inline-flex;
  justify-content: center;
  margin: 3px;
  align-items: center;
  position: relative;
  background: url(${closeIcon}) no-repeat;
  background-position: 90% 50%;
  cursor: pointer;
`;
const StyledJoinPlanetWrapper = styled.div`
  width: 100%;
  position: relative;
`;

class NewItemBar extends Component {
  state = {
    title: '',
    planet: '',
    correctData: '',
    matchResults: [],
    isActiveTab: false,
    listOfJoinPlanet: [],
  };
  handleInputChange = async (e, type) => {
    switch (type) {
      case 'title':
        this.setState({
          correctData: '',
          title: e.target.value,
        });

        break;

      case 'planet':
        await this.setState({
          correctData: '',
          planet: e.target.value,
        });
        await this.handleFetchPlanet();
        break;
    }
  };
  handleShowBar = () => {
    this.setState((prevState) => ({
      isActiveTab: !prevState.isActiveTab,
    }));
  };
  handleFetchPlanet = () => {
    const { planet, listOfJoinPlanet } = this.state;
    if (planet === '') return;
    axios
      .get(PLANETS_API)
      .then(({ data: { results } }) => {
        //filter data from planet which was written in input
        const matchResult = results.filter(({ name }) =>
          name.toLowerCase().includes(planet.toLowerCase()),
        );

        //check if fetched planets is in our state
        const filteredFromStoredPlanet = matchResult.filter(
          (result) => !listOfJoinPlanet.includes(result.name),
        );

        return filteredFromStoredPlanet;
      })
      .then((matchResults) => this.setState({ matchResults }));
  };
  //validation => if first letter is capital
  handleAddMovie = ({ title, planet }) => {
    if (title === '') {
      return this.setState({
        correctData: null,
      });
    }
    if (title[0] === title[0].toLowerCase()) {
      return this.setState({ correctData: false });
    } else {
      this.setState({
        title: '',
        planet: '',
      });
    }
  };
  checkShowResult = () => {
    const { matchResults, planet } = this.state;
    if (matchResults.length === 0 || planet === '') {
      return false;
    }
    return true;
  };

  handleJoinPlanet = (name) => {
    const { listOfJoinPlanet } = this.state;
    //check if the joined planet is in our list
    if (listOfJoinPlanet.findIndex((planet) => planet.toLowerCase() === name.toLowerCase()) !== -1)
      return;
    this.setState((prev) => ({
      listOfJoinPlanet: [...prev.listOfJoinPlanet, name],
      planet: '',
    }));
  };

  handleDeletePlanet = (id) => {
    this.setState((prevState) => ({
      listOfJoinPlanet: prevState.listOfJoinPlanet.filter((planet, index) => index !== id),
    }));
  };

  render() {
    const { title, planet, correctData, isActiveTab, matchResults, listOfJoinPlanet } = this.state;
    return (
      <>
        <StyledItemBarWrapper isActiveTab={isActiveTab}>
          <StyledTitleBar>Add movie</StyledTitleBar>
          <StyledExpandButton active={isActiveTab} onClick={this.handleShowBar} />

          {isActiveTab && (
            <>
              <Input
                onChange={(e) => this.handleInputChange(e, 'title')}
                value={title}
                name="title"
                label="Movie title"
                placeholder="Please enter the title of the movie"
              />
              {correctData === false ? (
                <StyledErrorMsg listType>
                  Movie title name must start with a capital letter.
                </StyledErrorMsg>
              ) : correctData === null ? (
                <StyledErrorMsg listType>Please type the title of the movie.</StyledErrorMsg>
              ) : null}
              <StyledJoinPlanetWrapper>
                {listOfJoinPlanet.length > 0 &&
                  listOfJoinPlanet.map((planet, index) => (
                    <>
                      <StyledJoinPlanet
                        onClick={() => this.handleDeletePlanet(index)}
                        key={planet}
                        listType
                      >
                        {planet}
                      </StyledJoinPlanet>
                    </>
                  ))}
              </StyledJoinPlanetWrapper>
              <StyledInput
                value={planet}
                onChange={(e) => {
                  this.handleInputChange(e, 'planet');
                }}
                name="planet"
                placeholder="Search for the planet in database"
                label="Add planet"
              >
                <Search />
              </StyledInput>
              {this.checkShowResult() && (
                <StyledResultsWrapper>
                  {matchResults.map(({ name }) => (
                    <StyledResultPlanet
                      onClick={() => this.handleJoinPlanet(name)}
                      as={'div'}
                      key={name}
                      listType
                    >
                      {name}
                    </StyledResultPlanet>
                  ))}
                </StyledResultsWrapper>
              )}
              <StyledSubmitButton onClick={() => this.handleAddMovie({ title, planet })}>
                ADD MOVIE
              </StyledSubmitButton>
            </>
          )}
        </StyledItemBarWrapper>
      </>
    );
  }
}

export default NewItemBar;

import React, { Component } from 'react';
import Input from 'components/atoms/Input/Input';
import styled, { css } from 'styled-components';
import ExpandButton from 'components/atoms/ExpandButton/ExpandButton';
import SubmitButton from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import searchIcon from 'assets/search.svg';

const StyledItemBarWrapper = styled.div`
  width: 100%;
  max-width: 730px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(224, 230, 238, 0.5);
  border-radius: 4px;
  margin-bottom: 20px;
  max-height: 350px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
  ${({ wrapCard }) =>
    wrapCard &&
    css`
      height: 100px;
    `}
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
const Search = styled.div`
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
const StyledInput = styled(Input)`
  position: relative;
`;
class NewItemBar extends Component {
  state = {
    title: '',
    planet: '',
    correctData: '',
    wrapCard: true,
  };
  handleInputChange = (e, type) => {
    switch (type) {
      case 'title':
        this.setState({
          correctData: '',
          title: e.target.value,
        });
        break;

      case 'planet':
        this.setState({
          correctData: '',
          planet: e.target.value,
        });
        break;
    }
  };
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
  render() {
    const { title, planet, correctData, wrapCard } = this.state;
    return (
      <>
        <StyledItemBarWrapper>
          <Paragraph>Add movie</Paragraph>
          <StyledExpandButton
            wrapCard={wrapCard}
            onClick={() => this.setState((prevState) => ({ wrapCard: !prevState.wrapCArd }))}
          />
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
          <StyledInput
            value={planet}
            onChange={(e) => this.handleInputChange(e, 'planet')}
            name="planet"
            placeholder="Search for the planet in database"
            label="Add planet"
          >
            <Search />
          </StyledInput>
          <SubmitButton onClick={() => this.handleAddMovie({ title, planet })}>
            ADD MOVIE
          </SubmitButton>
        </StyledItemBarWrapper>
      </>
    );
  }
}

export default NewItemBar;

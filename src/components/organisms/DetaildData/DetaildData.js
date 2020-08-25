import React, { Component } from 'react';
import styled from 'styled-components';
import ListElement from 'components/atoms/ListElement/ListElement';
import axios from 'axios';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  border-top: 1px solid #c4c4c4;
  width: 100%;
`;

const StyledLoadingSpinner = styled(LoadingSpinner)`
  grid-row: 4;
  grid-column: 4;
`;

class DetaildData extends Component {
  state = {
    loading: true,
    activeId: null,
  };
  componentDidMount() {
    const { planets } = this.props;
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 500);
  }

  render() {
    const { activeId, planet } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <>
          <StyledGridWrapper>
            <ListElement>Planet Name </ListElement>
            <ListElement>Rotation period </ListElement>
            <ListElement>Orbital period </ListElement>
            <ListElement>Diameter </ListElement>
            <ListElement>Climate </ListElement>
            <ListElement>Surface water </ListElement>
            <ListElement>Pupulation </ListElement>
            <StyledLoadingSpinner />
          </StyledGridWrapper>
        </>
      );
    } else
      return (
        <StyledGridWrapper>
          <ListElement>Planet Name </ListElement>
          <ListElement>Rotation period </ListElement>
          <ListElement>Orbital period </ListElement>
          <ListElement>Diameter </ListElement>
          <ListElement>Climate </ListElement>
          <ListElement>Surface water </ListElement>
        </StyledGridWrapper>
      );
  }
}

export default DetaildData;

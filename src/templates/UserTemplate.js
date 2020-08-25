import React from 'react';
import PropTypes from 'prop-types';
import MainTemplate from 'templates/MainTemplate';

const UserTemplate = ({ children }) => {
  return <MainTemplate>{children}</MainTemplate>;
};

UserTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserTemplate;

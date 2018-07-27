import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'

const MedalIcon = ({ type }) => (<div className={`medalIcon ${type}`} />)

MedalIcon.propTypes = {
    type: PropTypes.string
};

export default MedalIcon;

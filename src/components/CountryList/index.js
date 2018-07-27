import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { countries } from '../../resources/json/countries'
import './styles.css'
import { connect } from 'react-redux'

class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state = this.defaultState();

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected === '') {
            this.setState(this.defaultState());
        }
    }

    defaultState() {
        return { country: { code: 'default', name: 'Select a country' } };
    }

    handleChange(event) {
        const { value } = event.target;
        const country = countries.find(country => country.code === value)

        this.setState({ country }, () => this.props.onselect(value));
    }

    isCountrySelected(code) {
        const { existingCountries } = this.props;

        return !!existingCountries.map(({ countryCode }) => countryCode).find(countryCode => countryCode === code)
    }

    render() {
        return (
            <div className="countrySelect">
                <select value={this.state.country.code} onChange={this.handleChange}>
                    <option disabled value='default'>Select a country</option>
                    {countries.map(row => (
                        <option key={row.code} value={row.code} disabled={this.isCountrySelected(row.code)}>{row.name}</option>
                    ))}
                </select>
                <img src={`/images/${this.state.country.code}.png`} alt={this.state.country.name}/>
            </div>
        );
    }
}


CountryList.propTypes = {
    onselect: PropTypes.func,
    selected: PropTypes.string,
    existingCountries: PropTypes.array
};

CountryList.defaultProps = {
    onselect: () => {},
    existingCountries: []
};

const mapStateToProps = (state) => {
    return {
        existingCountries: state.countries
    };
};

export default connect(
    mapStateToProps
)(CountryList);

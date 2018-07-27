import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Country from '../Country';
import { MEDAL_TYPES, COUNTRY_MEDAL_SORT } from '../../main/constants';
import MedalIcon from '../Medal/MedalIcon';
import './styles.css';

class CountriesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            sortBy: MEDAL_TYPES.TOTAL,
            sort: COUNTRY_MEDAL_SORT.DESCENDING
        };

        this.sortMethod = this.sortMethod.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { countries } = nextProps;
        const { sortBy, sort } = this.state;

        this.sort(countries, sortBy, sort);
    }

    sortMethod(sortBy, sort, a, b) {
        const sortA = a[sortBy]
        const sortb = b[sortBy]

        return sort === COUNTRY_MEDAL_SORT.ASCENDING ? sortA - sortb : sortb - sortA
    }

    sort(countries, sortBy, sort) {
        countries.sort((a, b) => this.sortMethod(sortBy, sort, a, b));

        this.setState({ countries, sortBy, sort });
    }

    handleSort(medalType) {
        const { sortBy, sort } = this.state;
        const newState = { ...this.state };

        if (medalType !== sortBy) {
            newState.sortBy = medalType;
        } else {
            newState.sort = (sort === COUNTRY_MEDAL_SORT.DESCENDING ? COUNTRY_MEDAL_SORT.ASCENDING : COUNTRY_MEDAL_SORT.DESCENDING);
        }

        this.sort(newState.countries, newState.sortBy, newState.sort);
    }

    renderSortIcon(type) {
        const className = this.state.sortBy === type ? '' : 'disabled'

        return (
            <div>
                {type !== MEDAL_TYPES.TOTAL ? <MedalIcon type={type} /> : <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>}
                <span className={className}>
                    &nbsp;{ this.state.sort === COUNTRY_MEDAL_SORT.DESCENDING ? <span className='descending'>&#x25BC;</span> : <span className='ascending'>&#x25B2;</span> }
                </span>
            </div>
        )
    }

    render() {
        const { countries } = this.state;

        return (
            <div>
                { countries.length > 0 &&
                    <table className="countriesList">
                        <thead>
                            <tr>
                                <td colSpan="2" />
                                {
                                    Object.values(MEDAL_TYPES).map(type => (
                                        <th key={type} onClick={() => this.handleSort(type)}>
                                            <span>
                                                { this.renderSortIcon(type) }
                                            </span>
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                        { countries.map(country => (
                            <Country key={ country.countryCode } country={ country } />
                        )) }
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

CountriesList.propTypes = {
    countries: PropTypes.array.isRequired
};

CountriesList.defaultProps = {
    countries: []
};

const mapStateToProps = (state) => {
  return {
      countries: state.countries
  };
};

export default connect(
  mapStateToProps
)(CountriesList);

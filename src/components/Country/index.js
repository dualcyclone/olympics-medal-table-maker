import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../../main/actions';
import CountryList from '../CountryList';
import { countries } from '../../resources/json/countries'
import { MEDAL_TYPES } from '../../main/constants'
import Medal from '../Medal';
import './styles.css';

const defaultMedalValues = Object.values(MEDAL_TYPES).reduce((acc, type) => ({ ...acc, [type]: 0 }), {})

class Country extends Component {
    constructor(props) {
        super(props);
        this.state = this.defaultState();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.defaultState = this.defaultState.bind(this);
        this.remove = this.remove.bind(this);
    }

    defaultState() {
        return this.props.country ? this.props.country : {
            countryCode: '',
            ...defaultMedalValues
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onAdd({ ...this.state })
        this.setState(this.defaultState())
    }

    getMedal(type) {
        const value = this.state[type]
        const { editable } = this.props
        const Wrap = (editable ? 'div' : 'td')

        return <Wrap className={!editable ? 'medal' : undefined}><Medal type={type} editable={editable} value={value} onchange={medalCount => this.getTotal(type, medalCount)}/></Wrap>
    }

    getTotal(type, medalCount) {
        const { bronze, silver, gold } = this.state;
        let total = (type === MEDAL_TYPES.BRONZE ? medalCount : bronze) + (type === MEDAL_TYPES.SILVER ? medalCount : silver)  + (type === MEDAL_TYPES.GOLD ? medalCount : gold)

        this.setState({ [type]: medalCount, total })
    }

    remove() {
        this.props.onRemove({ ...this.state });
    }

    render() {
        const { editable } = this.props;

        const Wrapper = (editable ? 'form' : 'tr');
        const country = this.state;

        const countryData = !editable && countries.find(c => c.code === country.countryCode);

        return (
            <Wrapper onSubmit={editable ? this.handleSubmit : undefined} className="country">
                {
                    editable ?
                        <CountryList onselect={countryCode => this.setState({ countryCode })} selected={this.state.countryCode} /> :
                        <Fragment><td className="name">{countryData.name}</td><td className="flag"><img src={`/images/${countryData.code}.png`} alt={countryData.name}/></td></Fragment>
                }
                { this.getMedal(MEDAL_TYPES.BRONZE) }
                { this.getMedal(MEDAL_TYPES.SILVER) }
                { this.getMedal(MEDAL_TYPES.GOLD) }
                { editable ? <input type="submit" value="Create" disabled={this.state.countryCode === ''} /> :  <td className="total">{ (country.bronze || 0) + (country.silver || 0) + (country.gold || 0) }</td> }
                { !editable ? <td className="delete" onClick={() => this.remove()}>&#x2715;</td> : null}
            </Wrapper>
        );
    }
}


Country.propTypes = {
    country: PropTypes.object,
    onAdd: PropTypes.func.isRequired,
    editable: PropTypes.bool
};

Country.defaultProps = {
    editable: false
};

const mapDispatchToProps = (dispatch) => ({
    onAdd: (item) => dispatch(addItem(item)),
    onRemove: (item) => dispatch(removeItem(item))
});

export default connect(
    null,
    mapDispatchToProps
)(Country);

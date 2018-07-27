import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MedalIcon from './MedalIcon';
import './styles.css'

class Medal extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.value };

        this.handlekeyPress = this.handlekeyPress.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value })
    }

    handlekeyPress(event) {
        if (!isNaN(event.key)) {
            let { value } = this.state;

            value = Number((value > 0 ? value : '') + event.key);

            value = value < 0 ? 0 : (value > 99 ? 99 : value)

            this.setState({ value }, () => this.props.onchange(value));
        }
    }

    render() {
        const { editable, type } = this.props;

        return (
            <div className={`medalInput ${type} ${!editable && 'static'}`}>
                <MedalIcon type={type} />
                {
                    editable ?
                        <input type="text" id={type} value={this.state.value} onKeyPress={this.handlekeyPress}/> :
                        <p>{this.state.value}</p>
                }

            </div>
        );
    }
}

Medal.propTypes = {
    type: PropTypes.string,
    editable: PropTypes.bool.isRequired,
    onchange: PropTypes.func,
    value: PropTypes.number
};

Medal.defaultProps = {
    editable: false,
    onchange: () => {},
    value: 0
};

export default Medal;

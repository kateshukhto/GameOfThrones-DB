import React, {Component} from 'react';
import './randomChar.css';
import GotService from '../services/gotService';
import Spinner from '../spinner/spinner';
import Error from '../errorMessage/error';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {

    gotService = new GotService();
  
    state = { 
        char: {},
        loading: true, 
        error: false
    }

    static defaultProps = {
        interval: 3500
    }

    static propTypes = {
        interval: PropTypes.number
    }

    onCharLoader = (char) => {
        this.setState({ 
            char,
            loading: false
         })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoader)
            .catch(this.onError)
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {
        const  { char, loading, error} = this.state;

        const errorMessage = error ? <Error/> : null;
        const loader = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} /> : null;


        return (
            <div className="random-block rounded">
                {errorMessage}
                {loader}
                {content}
            </div>
        );
    }
}

const View = ({char}) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
}

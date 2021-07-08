import React, {Component} from 'react';
import './itemDetails.css';
import GotService from '../services/gotService';

export default class ItemDetails extends Component {

    gotService = new GotService();

    state = {
        data: null
    }

    componentDidMount() {
        this.updateItem()
    }

    updateItem() {
        const { getItem } = this.props;

        if(!this.props.itemId) {
            return 
        }

        getItem(this.props.itemId)
            .then( data => {
                this.setState({ data })
            })
    }

    componentDidUpdate(prevProps) {
        if(!this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }


    render() {

        if(!this.state.data) {
            return <span className='select-error'>Please select a field</span>
        }

        const { data } = this.state;
        const { name } = data;



        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {data})
                        })
                    }
                </ul>
            </div>
        );
    }
}
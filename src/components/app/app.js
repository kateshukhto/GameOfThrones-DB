import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BooksPage, HousesPage, BookItem} from '../pages';
import Error from '../errorMessage/error';
import GotService from '../services/gotService';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';



export default class App extends Component {
   gotService = new GotService();

    state = {
        toggle: false,
        error: false
    }


    onToggleRandomChar = () => {
        this.setState(({toggle}) => ({
            toggle: !toggle
        }))
    }


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {       

        const { toggle, error } = this.state;

        const content = toggle? null : <RandomChar/>; 

        if(error) {
            return <Error/>
        }

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {content}
                                <button onClick={this.onToggleRandomChar} className="btn__toggle">Toggle Random Character</button>
                            </Col>
                        </Row>
                            <Route exact path='/characters' component={CharacterPage}/>
                            <Route exact path='/houses' component={HousesPage}/>
                            <Route exact path='/books' component={BooksPage}/>
                            <Route exact path='/books/:id' render={({match, history}) => {
                                    console.log(history)
                                    const {id} = match.params;
                                    return <BookItem bookId={id}/>
                                }
                            }/>
                    </Container>
                </div>
            </Router>
        );
    }
};


import React, {Component} from 'react';
import ItemList from '../itemList';
import Error from '../errorMessage/error';
import GotService from '../services/gotService';
import { withRouter } from 'react-router';

class BooksPage extends Component {

   gotService = new GotService();

   state = {
      selectedItem: null, 
      error: false
   }

   onItemSelected = (id) => {
      this.setState({
          selectedItem: id
      })
   }

   componentDidCatch() {
      this.setState({
         error: true
      })
   }

   render() {

      if(this.state.error){
         return <Error/>
      }

      return (
         <ItemList 
                  onItemSelected={(itemId) => {
                     this.props.history.push(`${itemId}`)
                  }}
                  getData={this.gotService.getAllBooks}
                  renderItem={(item) => item.name}
      />
      )
   }
}

export default withRouter(BooksPage)
import React, {Component} from 'react';
import ItemDetails from '../itemDetails';
import GotService from '../services/gotService';
import Field from '../Field/Field';


export default class BookItem extends Component {

   gotService = new GotService();

   render() {
      return (
         <ItemDetails 
            getItem={this.gotService.getBook}
            itemId={this.props.bookId}>
            <Field field='numberOfPages' label='Number Of Pages'/>
            <Field field='publiser' label='Publiser'/>
            <Field field='released' label='Released'/>
         </ItemDetails>
      )
   }

}
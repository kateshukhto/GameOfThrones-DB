import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import Error from '../errorMessage/error';
import GotService from '../services/gotService';
import RowBlock from '../rowBlock/rowBlock';
import Field from '../Field/Field';

export default class CharacterPage extends Component {

   gotService = new GotService();

   state = {
      selectedItem: 129, 
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

      const itemList = (
         <ItemList onItemSelected={this.onItemSelected}
                         getData={this.gotService.getAllCharacters}
                         renderItem={(item) => `${item.name}(${item.gender})`}
         />
      );

      const itemDetails = (
         <ItemDetails
            getItem={this.gotService.getCharacter}
            itemId={this.state.selectedItem}>
            <Field field='gender' label='Gender'/>
            <Field field='born' label='Born'/>
            <Field field='died' label='Died'/>
            <Field field='culture' label='Culture'/>
         </ItemDetails>
      )

      return (
         <RowBlock left={itemList} right={itemDetails}/>
      )
   }
}
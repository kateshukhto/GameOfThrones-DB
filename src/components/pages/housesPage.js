import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import Error from '../errorMessage/error';
import GotService from '../services/gotService';
import RowBlock from '../rowBlock/rowBlock';
import Field from '../Field/Field';

export default class HousesPage extends Component {

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

      const itemList = (
         <ItemList onItemSelected={this.onItemSelected}
                         getData={this.gotService.getAllHouses}
                         renderItem={(item) => item.name}
         />
      );

      const itemDetails = (
         <ItemDetails 
            getItem={this.gotService.getHouse}
            itemId={this.state.selectedItem}>
            <Field field='region' label='Region'/>
            <Field field='words' label='Words'/>
            <Field field='titles' label='Titles'/>
            <Field field='overlord' label='Overlord'/>
            <Field field='ancestralWeapons' label='Ancestral Weapons'/>

         </ItemDetails>
      )

      return (
         <RowBlock left={itemList} right={itemDetails}/>
      )
   }
}
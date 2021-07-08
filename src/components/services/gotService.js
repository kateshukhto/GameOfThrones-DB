export default class GotService {
   constructor() {
       this._apiBase = 'https://www.anapioficeandfire.com/api';
   }

    getResource = async(url) => {
       const res = await fetch(`${this._apiBase}${url}`);
   
       if (!res.ok) {
         throw new Error(`Could not fetch ${url}` +
           `, received ${res.status}`);
       }
       return await res.json();
   }

    getAllBooks = async () => {
       const res = await this.getResource(`/books/`);
       return res.map(this._transformBook);
   }
   
    getBook = async (id) => {
       const book = await this.getResource(`/books/${id}`);
       return this._transformBook(book);
   }
   
    getAllCharacters = async () => {
       const res = await this.getResource(`/characters?page=15&pageSize=10`);
       return res.map(this._transformCharacter);
   }
   
    getCharacter = async (id) => {
       const character = await this.getResource(`/characters/${id}`);
       return this._transformCharacter(character);
   }
   
    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

   isSet(data) {
       if (data) {
           return data
       } else {
           return 'no data'
       }
   }

   _getId = (str) => {
       const numberPattern = /\d+/g;
       return str.match(numberPattern)
   }

   _transformCharacter = (char) => {
       return {
           name: this.isSet(char.name),
           gender: this.isSet(char.gender),
           born: this.isSet(char.born),
           died: this.isSet(char.died), 
           culture: this.isSet(char.culture),
           id: this._getId(char.url)
       };
   }

   _transformHouse = (house) => {
       return {
           name: this.isSet(house.name),
           region: this.isSet(house.region),
           words: this.isSet(house.words),
           titles: this.isSet(house.titles),
           overlord: this.isSet(house.overlord),
           ancestralWeapons: this.isSet(house.ancestralWeapons),
           id: this._getId(house.url)
       };
   }
   
   _transformBook = (book) => {
       return {
           name: this.isSet(book.name),
           numberOfPages: this.isSet(book.numberOfPages),
           publiser: this.isSet(book.publiser),
           released: this.isSet(book.released),
           id: this._getId(book.url)
       };
   }
}
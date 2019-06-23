const API_URL = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';

function callApi(endpoind, method) {
  const url = API_URL + endpoind;
  const options = {
    method
  };

  return fetch(url, options)
    .then(response =>
      response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    )
    .catch(error => {
      throw error;
    });
}

class FighterService {
    // async getFighters() {
    //   try {
    //     const endpoint = 'fighters.json';
    //     const apiResult = await callApi(endpoint, 'GET');
  
    //     return JSON.parse(atob(apiResult.content));
    //   } catch (error) {
    //     throw error;
    //   }
    // }
  
    async getFighterDetails(_id) {
      // implement this method
      // endpoint - `details/fighter/${_id}.json`;
      try {
        const endpoint = `details/fighter/${_id}.json`;
        const apiResult = await callApi(endpoint, 'GET');
  
        return JSON.parse(atob(apiResult.content));
      } catch (error) {
        throw error;
      }
    }
  }

  class View {
    element;
  
    createElement({ tagName, className = '', attributes = {} }) {
      const element = document.createElement(tagName);
      element.classList.add(className);
      Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
  
      return element;
    }
  }

  class Fighter {
    attack;
    defense;
    health;
    name;
    _source;
    _id;
  
    constructor(fighterDetails){
    ({attack:this.attack, defense:this.defense, health:this.health, name:this.name, _source:this._source, _id:this._id} = fighterDetails);
    }
  
    getHitPower(){
      let criticalHitChance = this.getRandomArbitrary(1,2);
      let power = this.attack * criticalHitChance;
      return power;
    }
  
    getBlockPower(){
      let dodgeChance = this.getRandomArbitrary(1,2);
      let power = this.defense * dodgeChance;
      return power;
    }
  
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
  }

  class FighterView extends View {
    constructor(fighter, handleClick) {
      super();
  
      this.createFighter(fighter, handleClick);
    }
  
    createFighter(fighter, handleClick) {
      const { name, source } = fighter;
      const nameElement = this.createName(name);
      const imageElement = this.createImage(source);
      const checkElement = this.createCheckbox();
  
      this.element = this.createElement({ tagName: 'div', className: 'fighter' });
      this.element.append(imageElement, nameElement, checkElement);
      this.element.addEventListener('click', event => handleClick(event, fighter), false);
    }
  
    createName(name) {
      const nameElement = this.createElement({ tagName: 'span', className: 'name' });
      nameElement.innerText = name;
  
      return nameElement;
    }
  
    createImage(source) {
      const attributes = { src: source };
      const imgElement = this.createElement({
        tagName: 'img',
        className: 'fighter-image',
        attributes
      });
  
      return imgElement;
    }
  
    createCheckbox(){
      const attributes = { type: 'checkbox' };
      const checkElement = this.createElement({ tagName: 'input', className: 'fighter-check', attributes });
  
      return checkElement;
    }
  }

  class FightersView extends View {
    constructor(fighters) {
      super();
      
      this.handleClick = this.handleFighterClick.bind(this);
      this.createFighters(fighters);
    }
  
    fightersDetailsMap = new Map();
  
    createFighters(fighters) {
      const fighterElements = fighters.map(fighter => {
        const fighterView = new FighterView(fighter, this.handleClick);
        return fighterView.element;
      });
  
      this.element = this.createElement({ tagName: 'div', className: 'fighters' });
      this.element.append(...fighterElements);
    }
  
    async handleFighterClick(event, fighter) {
      const fighterDetail = await fighterService.getFighterDetails(fighter._id);
      this.fightersDetailsMap.set(fighter._id, fighterDetail);
      let oneFighter = new Fighter(this.fightersDetailsMap.get(fighter._id));//delete
  
      console.log(/* this.fightersDetailsMap.get(fighter._id) */oneFighter);//delete
      console.log('clicked')
      
      // get from map or load info and add to fightersMap
      // show modal with fighter info
      // allow to edit health and power in this modal
    }
  }
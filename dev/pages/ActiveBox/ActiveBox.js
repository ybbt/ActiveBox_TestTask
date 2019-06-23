class Events {

    #listeners = {};

    on(event, fn){
        if (!this.#listeners[event]) {
            this.#listeners[event] = [];
        }
        this.#listeners[event].push(fn);
    }

    trigger(event){
        this.#listeners[event].forEach(fn => fn());
    }

}

class CollectionService {

    API_URL = 'https://jsonplaceholder.typicode.com/photos';

    callApi(method) {

    const options = {
        method,
    };

    return fetch(/*url*/this.API_URL, options)
        .then(response =>
            response.ok ? response.json() : Promise.reject(Error('Failed to load'))
        )
        .catch(error => {
            throw error;
        });
    }

    async getCollection() {

        try {

            /*const apiResult =*/return await this.callApi('GET');

        } catch (error) {
            throw error;
        }
    }
}


class Collection extends Events {

    #list = [
        {
        "title": "Easily Customised",
        "thumbnailUrl": "img/Layer 48.webp"
        },
        {
        "title": "Easily Customised",
        "thumbnailUrl": "img/Layer 48.webp"
        },
        {
        "title": "Easily Customised",
        "thumbnailUrl": "img/Layer 48.webp"
        },
        {
        "title": "Easily Customised",
        "thumbnailUrl": "img/Layer 48.webp"
        },
        {
        "title": "Easily Customised",
        "thumbnailUrl": "img/Layer 48.webp"
        },
        {
        "title": "Easily Customised",
        "thumbnailUrl": "img/Layer 48.webp"
        },
    ];


    add(list) {
        this.#list = list;
        this.trigger('change');
    }


    get list(){
        return this.#list.slice();
    }
}

class Features {

    static templateFeatures = document.querySelector('#templateFeatures').content;

    #model = new Collection()

    // root element of template
    #root = null

    constructor() {

        this._eventsAssign()
            ._render();
    }

    _eventsAssign() {

        document.querySelector('#btnFndOutMore').addEventListener('click', this.addItems.bind(this));

        this.#model.on('change', this._render.bind(this));
        return this;
    }

    _render() {
        document.querySelector('#features').innerHTML = '';

        this.#model.list.forEach((el, i) => {
            const template = Features.templateFeatures.cloneNode(true);
            template.querySelector('._insImg').src = el["thumbnailUrl"];
            template.querySelector('._insTitle').innerHTML = el["title"];
            document.querySelector('#features').appendChild(template);
        });
    }

    async addItems(){

        const collectionService  = new CollectionService();

        const tmpList =  await collectionService.getCollection();

        const listRandom = [];
        for (let index = 0; index < 5; index++) {
            listRandom.push(tmpList[Math.floor(Math.random() * tmpList.length)]);
        }

        this.#model.add(listRandom);

    }

}

new Features();

export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    render() {
        this._items.forEach(data => {
            this._renderer(data);
        });
    }

    addItem(item) {
        this._container.prepend(item);
    }

    addItemAppend(item) {
        this._container.append(item);
    }
}
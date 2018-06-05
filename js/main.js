// TODO
function createList(UI) {
    var todos = {};

    /**
     * Create todo
     * @param {*} data
     */
    function add(data) {
        var id = btoa('titulo do post');
        var todo = { id: id, description: data.description, status: 00 };
        todos[id] = todo;
        UI.addToList(id, todo);
    }

    /**
     * Edit todo
     * @param {*} id
     */
    function edit(id) {

    }

    /**
     * Remove todo
     * @param {*} id
     */
    function remove(id) {

    }

    /**
     * Mark todo as done/not done
     * @param {*} status
     */
    function mark(status) {

    }

    /**
     * Move todo up or down on the list
     * @param {*} direction
     */
    function move(direction) {

    }

    /**
     * Public API
     */
    var publicAPI = {
        add,
        edit,
        remove,
        mark,
        move
    };

    return publicAPI;
}


// UI
function createUI() {
    var TEMPLATE = `
        <h2>Lorem Ipsum1</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut quidem ratione hic nam libero asperiores inventore pariatur unde quisquam aliquam! Eligendi ad vel hic minima et quas repellendus ex! Iste?</p>
        <input type="checkbox" name="done" data-js-action="done" value="11"><label for="done">Finalizar</label>
        <a href="#" data-js-action="remove">Remover</a>
    `;
    var $todoElements = [];
    var $todosContainer = document.querySelector('#todos');
    var $btnAddNew = document.querySelector('[data-js-action="addNewTodo"]');
    var $inputTitle = document.querySelector('[data-js-id="title"]');
    var $inputDescription = document.querySelector('[data-js-id="description"]');

    /**
     * Handle form event
     * @param {*} e
     */
    function handleNewTodo(e) {
        e.preventDefault();
        App.add({});
    }

    /**
     * Initialize events
     */
    function init() {
        $btnAddNew.addEventListener('click', handleNewTodo);
    }

    /**
     * Render template
     * @param {*} data
     */
    function render(data) {
        var { title, description } = data;
        return `
            <h2>${title}</h2>
            <p>${description}</p>
            <input type="checkbox" name="done" data-js-action="done" value="11"><label for="done">Finalizar</label>
            <a href="#" data-js-action="remove">Remover</a>
        `;
    }

    /**
     * Add new todo to the UI
     * @param {*} id
     * @param {*} data
     */
    function addToList(id, data) {
        var fragment = document.createDocumentFragment();
        var wrapper = document.createElement('div');
        wrapper.classList.add = 'todo';
        wrapper.setAttribute('data-js-id', '123');
        wrapper.innerHTML = render({ title: 'Novo', description: 'Desc' });
        $todosContainer.appendChild(fragment.appendChild(wrapper));
    };

    /**
     * Public API
     */
    var publicAPI = {
        init,
        addToList
    };

    return publicAPI;
}

/**
 * Initialize
 */
var UI = createUI();
UI.init();

var App = createList(UI);
// TODO
function createList(UI) {
    var todos = {};

    /**
     * Create todo
     * @param {*} data
     */
    function add(data) {
        var id = btoa(data.title);
        var todo = { id: id, title: data.title, description: data.description, status: 00 };
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
        App.add(getFormData());
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
        wrapper.classList.add('todo');
        wrapper.setAttribute('data-js-id', id);
        wrapper.innerHTML = render({ title: data.title, description: data.description });
        $todosContainer.appendChild(fragment.appendChild(wrapper));
    };

    /**
     * Get form data
     */
    function getFormData() {
        return {
            title: $inputTitle.value,
            description: $inputDescription.value
        };
    }

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
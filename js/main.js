/**
 * Helpers
 */
var Helpers = {
    generateId: function() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
        });
    },
    validation: {
        rules: {
            required: function(data) {
                return data.length > 0 && data !== ' ';
            },
            min: function(data, length) {
                return data.length > length;
            },
            max: function(data, length) {
                return data.length < length;
            },
            type: function(data, type) {
                return typeof data === type;
            }
        }
    }
};

// TODO
function createList(UI) {
    var todos = {};

    /**
     * Create todo
     * @param {*} data
     */
    function add(data) {
        var id = Helpers.generateId();
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
        if(todos[id] === undefined) {
            return false;
        }

        delete todos[id];
        return true;
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
     * Handle form event
     * @param {*} e
     */
    function handleRemoveTodo(e) {
        e.preventDefault();
        var todo = e.target.parentNode;
        var id = todo.getAttribute('data-js-id');

        if(App.remove(id)) {
            $todoElements = $todoElements.filter(function(todo) {
                return todo.getAttribute('data-js-id') !== id;
            });
            renderAll();
        }
    }

    /**
     * Initialize events
     */
    function init() {
        $btnAddNew.addEventListener('click', handleNewTodo);
    }

    /**
     * Render todo
     * @param {*} id
     * @param {*} title
     * @param {*} description
     */
    function render(id, title, description) {
        var template = `
            <h2>${title}</h2>
            <p>${description}</p>
            <input type="checkbox" name="done" data-js-action="done" value="11"><label for="done">Finalizar</label>
            <a href="#" data-js-action="remove">Remover</a>
        `;
        var fragment = document.createDocumentFragment();
        var wrapper = document.createElement('div');
        wrapper.classList.add('todo');
        wrapper.setAttribute('data-js-id', id);
        wrapper.innerHTML = template;
        $todosContainer.appendChild(fragment.appendChild(wrapper));
        var $btnRemove = document.querySelector('.todo[data-js-id="' + id + '"] [data-js-action="remove"]');
        $btnRemove.addEventListener('click', handleRemoveTodo);
        return wrapper;
    }

    /**
     * Render all todos
     */
    function renderAll() {
        $todosContainer.innerHTML = '';

        $todoElements.forEach(function(todo) {
            var id = todo.getAttribute('data-js-id');
            var title = todo.getElementsByTagName('h2')[0].innerText;
            var description = todo.getElementsByTagName('p')[0].innerText;
            render(id, title,description);
        });
    }

    /**
     * Add todo to list
     * @param {*} id
     * @param {*} data
     */
    function addToList(id, data) {
        var todo = render(id, data.title, data.description);
        $todoElements.push(todo);
    }

    /**
     * Get form data
     */
    function getFormData() {
        var title = $inputTitle.value;
        var description = $inputDescription.value;
        $inputTitle.value = '';
        $inputDescription.value = '';
        return {title, description };
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
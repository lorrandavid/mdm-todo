(function(document, global) {
    /**
     * Helpers
     */
    var Helpers = {
        generateId: function() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(c) {
                return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
            });
        }
    };

    /**
     * UI Factory
     */
    function createUI() {
        var $todoElements = [];
        var $todosContainer;
        var $btnAddNew;
        var $inputTitle;
        var $inputDescription;

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

            if (App.remove(id)) {
                $todoElements = $todoElements.filter(function(todo) {
                    return todo.getAttribute('data-js-id') !== id;
                });
                $todosContainer.removeChild(todo);
            }
        }

        function handleDoneTodo(e) {
            var $checkbox = e.target;
            var id = $checkbox.parentNode.parentNode.getAttribute('data-js-id');

            if ($checkbox.checked) {
                $checkbox.parentNode.parentNode.classList.add('todo--done');
                App.mark(id, '11');
            } else {
                $checkbox.parentNode.parentNode.classList.remove('todo--done');
                App.mark(id, '00');
            }
        }

        /**
         * Easy-to-use dom selector
         * @param {*} selector
         */
        function $(selector) {
            var $elems = document.querySelectorAll(selector);

            if ($elems.length > 1) {
                return $elems;
            }
            return $elems[0];
        };

        /**
         * Initialize UI
         */
        function init() {
            $todosContainer = $('#todo');
            $doingContainer = $('#doing');
            $doneContainer = $('#done');
            $btnAddNew = $('[data-js-action="addNewTodo"]');
            $inputTitle = $('[data-js-id="title"]');
            $inputDescription = $('[data-js-id="description"]');
            $inputPriority = $('[data-js-id="priority"]');
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
            <div class="todo-cb">
                <input type="checkbox" class="todo-cb__input" name="done" data-js-action="done" value="11">
            </div>
            <div class="todo-info">
                <h2 class="todo-info__title">${title}</h2>
                <p class="todo-info__desc">${description}</p>
            </div>
            <h2></h2>
            <p></p>
            <a href="#" data-js-action="remove">Remover</a>
        `;
            var fragment = document.createDocumentFragment();
            var wrapper = document.createElement('div');
            wrapper.classList.add('todo');
            wrapper.setAttribute('data-js-id', id);
            wrapper.innerHTML = template;
            fragment.appendChild(wrapper)
            $todosContainer.firstElementChild.after(fragment);

            /**
             * Events
             */
            var todo = $('.todo[data-js-id="' + id + '"]');
            var $btnRemove = todo.querySelector('[data-js-action="remove"]');
            var $checkbox = todo.querySelector('[data-js-action="done"]');
            $btnRemove.addEventListener('click', handleRemoveTodo);
            $checkbox.addEventListener('change', handleDoneTodo);
            return wrapper;
        }

        /**
         * Add todo to list
         * @param {*} id
         * @param {*} data
         */
        function addToList(id, data) {
            var todo = render(id, data.title, data.description);
            $todoElements.unshift(todo);
        }

        /**
         * Get form data
         */
        function getFormData() {
            var title = $inputTitle.value;
            var description = $inputDescription.value;
            var priority = $inputPriority.value;
            $inputTitle.value = '';
            $inputDescription.value = '';

            return {
                title,
                description,
                priority
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
     * TODO List Factory
     * @param {*} UI
     */
    function createList(UI) {
        var todos = {};

        /**
         * Create todo
         * @param {*} data
         */
        function add(data) {
            var id = Helpers.generateId();
            var todo = {
                id: id,
                title: data.title,
                description: data.description,
                status: 00
            };
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
            if (todos[id] === undefined) {
                return false;
            }
            delete todos[id];
            return true;
        }

        /**
         * Mark todo as done/not done
         * @param {*} id
         * @param {*} status
         */
        function mark(id, status) {
            if (todos[id] === undefined) {
                return false;
            }
            todos[id].status = status;
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

    /**
     * Initialize
     */
    var UI = createUI();
    UI.init();

    var App = createList(UI);

    /**
     * Hardcoding some initial data
     */
    // App.add({
    //   title: 'Lorem Ipsum',
    //   description: 'Lorem ipsum dolor dictum sociosqu aenea.'
    // });
    // App.add({
    //   title: 'Vehicula varius blandit',
    //   description: 'Pretium porttitor turpis sit nulla mi erat mattis lorem.'
    // });
})(document, window);
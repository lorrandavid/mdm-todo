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

}
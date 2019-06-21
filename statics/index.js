window.onload = function () {

    const HOST = 'http://127.0.0.1';
    const PORT = '8080';

    let msgDiv = $('#msg_div');
    let todoInput = $('#todo_input');
    let todoTable = $('#todo_table tbody');
    let doneTable = $('#done_table tbody');

    let allBtn = $('#all_btn');
    let activeBtn = $('#active_btn');
    let completeBtn = $('#complete_btn');
    let clearCompleteBtn = $('#clear_complete_btn');

    let leftItemsSpan = $('#left_items_span');
    let todoList = [];

    todoInput.keydown(function (e) {
        if (e.which === 13) {
            let todo = todoInput.val();
            if (todo !== "") {
                todoInput.val("");  // clear input field
                pushData("todo", todo);
            }
        }
    });

    allBtn.click(function () {
        todoTable.css("display", "table-row-group");
        doneTable.css("display", "table-row-group");
    });

    activeBtn.click(function () {
        todoTable.css("display", "table-row-group");
        doneTable.css("display", "none");
    });

    completeBtn.click(function () {
        todoTable.css("display", "none");
        doneTable.css("display", "table-row-group");
    });

    clearCompleteBtn.click(function () {
        pushData("clear", "");
    });

    function pushData(opt, data) {
        $.ajax({
            url: HOST+":"+PORT+'/todo',
            type: 'PUT',
            contentType: "text/plain",
            data: JSON.stringify({'opt': opt, 'data':data}),
            success: ()=>{updateInfo();}
        });
    }

    function updateInfo() {
        $.ajax({
            url: HOST+":"+PORT+"/todo",
            type: "GET",
            success: (res) => {
                todoList = JSON.parse(res);
                addTodo();
                addDone();
                leftItemsSpan.html("Left items: "+todoList.todo.length);
                if (todoList.done.length > 0) {
                    $("#clear_complete_btn").css("display", "inline-block");
                }
            }
        });
    }

    function addTodo() {
        todoTable.html("");
        for (let item of todoList.todo) {
            todoTable.append(`
            <tr>
                <td class='item'><li>${item}</li></td>
                <td class='close_icon'>X</td>
            </tr>`)
        }
        $(".close_icon").on("click", (e)=>{
            pushData("delete", e.target.parentElement.firstElementChild.textContent);
        });
        $("#todo_table tbody tr .item").on("click", (e)=>{
            pushData("done", e.target.textContent);
        });
    }

    function addDone() {
        doneTable.html("");
        for (let item of todoList.done) {
            doneTable.append(`
            <tr>
                <td><li class='item'>${item}</li></td>
                <td class='close_icon'></td>
                </tr>`)
        }
        $("#done_table tbody tr").on("click", (e)=>{
            pushData("reset", e.target.textContent);
        });
    }

    updateInfo();
};
var tasks = [];

function add() {
    var title = document.getElementById("todo-form").value;
    if (title) {
        //var time = prompt("When does it need to be done?")
        tasks.push(new task(title));
        refreshList();
    }
    document.getElementById("todo-form").value = '';
}

function remove(arg) {
    tasks.splice(arg, 1);
    refreshList();
}

function task(title_arg) {
    this.title = title_arg;
    //this.time = time_arg;
    this.id = Math.floor(Math.random() * 1000000000);
}

function refreshList() {
    var myNode = document.getElementById("todo-list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    var list = ""
    for (var i = 0; i < tasks.length; i++) {
        var item = tasks[i].title;
        var y = document.createElement("LI");
        y.setAttribute("id", tasks[i].id);
        document.getElementById("todo-list").appendChild(y);
        document.getElementById(tasks[i].id).innerHTML = "<span>" + item + "</span><button class=\"minus-btn btn btn-default\" onclick=\"remove(" + (i) + ");\">-</button>";
    }
}

function enterClick() {
    if (event.keyCode == 13) {
        document.getElementById('add-btn').click()
    }
}
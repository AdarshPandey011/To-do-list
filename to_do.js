var count = 1;
var check = 0;
var flag = -1;
var array = [];

if (JSON.parse(localStorage.getItem("data")) == null) {
    array = [];
}
else {
    var temp = JSON.parse(localStorage.getItem("data"));
    console.log(array);
    for (var i = 0; i < temp.length; i++) {
        list_tasks(temp[i].data);
        if (temp[i].checked) {
            document.getElementById("check" + (i + 1)).checked = true;
            checkbox(i + 1);
        }
    }
}

function adjust() {
    a = array;
    for (var i = 0; i < array.length; i++) {
        if (array[i]) {
            a.push(array[i]);
        }
    }

}





function checkbox(value) {
    var checkbox = document.getElementById("check" + value);
    if (checkbox.checked == true) {
        var id = document.getElementById("row" + value);
        id = id.firstChild;
        id.style.textDecoration = "line-through"
        array[value - 1].checked = true;
    }
    else {
        var id = document.getElementById("row" + value);
        id = id.firstChild;
        id.style.textDecoration = "none";
        array[value - 1].checked = false;
    }
    localStorage.setItem("data", JSON.stringify(array));


}

function del(value) {

    var task = document.getElementById("task_section");
    var row_id = document.getElementById("row" + value);
    delete array[value - 1];

    var a=[];

    for(var i=0;i<array.length;i++){
        if(array[i]){
           a.push(array[i]); 
        }
    }

    localStorage.setItem("data",JSON.stringify(a));
    row_id.remove();

}

function edit(values) {
    var row_id = document.getElementById("row" + values);
    console.log(row_id.firstChild.innerText);

    //console.log(row_id.firstChild.innerHTML);

    var text = document.getElementById("text-area");
    text.value = row_id.firstChild.innerText;

    flag = values;


}


function list_controls(new_col2) {

    new_col2.classList.add("justify-content-space");

    var x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.setAttribute("value", count);
    x.setAttribute("onClick", "checkbox(value)");
    x.setAttribute("id", "check" + count);

    new_col2.appendChild(x);

    var y = document.createElement("li");
    y.setAttribute("class", "fa ml-2");
    y.classList.add("fa-pencil");
    y.setAttribute("value", count);
    y.setAttribute("onClick", "edit(value)");
    new_col2.appendChild(y);

    var z = document.createElement("li");
    z.setAttribute("class", "fa ml-2");
    z.classList.add("fa-close");
    z.setAttribute("value", count);
    z.setAttribute("onClick", "del(value)");

    new_col2.appendChild(z);

    var line = document.createElement("hr");
    new_col2.appendChild(line);

}

function list_tasks(text) {

    var new_container = document.getElementById("task_section");
    var new_row = document.createElement("div");
    var new_col1 = document.createElement("div");
    var new_col2 = document.createElement("div");
    var line = document.createElement("hr");


    new_col1.innerHTML = text;

    new_row.setAttribute("class", "row");
    new_col1.setAttribute("class", "col");
    new_col2.setAttribute("class", "col");
    new_row.setAttribute("id", "row" + count);

    new_col1.classList.add("col-md-9");
    new_col2.classList.add("col-md-3");


    new_container.appendChild(new_row);
    new_row.appendChild(new_col1);
    new_row.appendChild(new_col2);
    new_col1.appendChild(line);

    list_controls(new_col2);

    let obj = {
        data: text,
        checked: false
    };

    array.push(obj);
    localStorage.setItem("data", JSON.stringify(array));
    count++;

}



function get_text(event) {
    var text = document.getElementById('text-area');
    var x = text.value;
    var spaces=0;
    
    //console.log(x.length,"**");

    for(var i=0;i<x.length;i++){
        if(x[i]==' '){
            spaces++;
        }
    }
    

    if (event.key === "Enter" ) {
        event.preventDefault();

        if (text.value === ' ' || x.length==0 || x.length==spaces ) {
            alert("Enter Correct text!!");
        }
        else if (flag != -1) {

            var line = document.createElement("hr");
            var temp = document.getElementById("row" + flag);
            temp.firstChild.innerText = text.value;

            array[flag-1].data = text.value;
            localStorage.setItem("data", JSON.stringify(array));

            text.value = "";
            temp.firstChild.appendChild(line);
            flag = -1;
        }
        else {
            list_tasks(text.value);
            text.value = "";
        }
    }
}

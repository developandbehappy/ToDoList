var count = 0;
var textBox = [];

var press = document.getElementById("add");
var text = document.getElementById("text");
var block = document.getElementById("block");
var blockOne = document.getElementById("blockOne");
var ul = document.getElementById("ul");

window.onload = Prov;
press.onclick = init;

function init() {
  if(text.value === '' && text.value.length > 30) {
    alert("Вы не можете вводить пустую строку, или строку которая имеет больше 30 символов!");
    return false;
  }
  if(TodoStorage.getAll()) {
    TodoStorage.addItem({'title':strip_tags(text.value.trim()),'check':false});
    addVis(strip_tags(text.value.trim()));
    text.value = '';
  }
  else
  {
    TodoStorage.create();
    TodoStorage.addItem({'title':strip_tags(text.value.trim()),'check':false});
  }
}





function Prov() {
  if(TodoStorage.getAll()) {
  for(i = 0; i < TodoStorage.getAll().length; i++) {
      linkWithCheck();
      label.setAttribute("for", "c"+i);
      label.setAttribute("id", "cs"+i);
      x.setAttribute("id", "c"+i);
      x.setAttribute("onclick", "changeBox("+i+")");
      ul.appendChild(link).appendChild(x);
      ul.appendChild(link).appendChild(label).innerHTML = TodoStorage.getAll()[i].title;
      if(TodoStorage.getAll()[i].check == true) {
        x.setAttribute("checked",true);
        lineThrough(label);
      }
  }
}
else
  {
    TodoStorage.create();
  }
}




function addVis(text) {
      linkWithCheck();
      x.setAttribute("id", "c"+Math.floor(TodoStorage.getAll().length-1));
      x.setAttribute("onclick", "changeBox("+Math.floor(TodoStorage.getAll().length-1)+")");
      label.setAttribute("for", "c"+Math.floor(TodoStorage.getAll().length-1));
      label.setAttribute("id", "cs"+Math.floor(TodoStorage.getAll().length-1));
      ul.appendChild(link).appendChild(x);
      ul.appendChild(link).appendChild(label).innerHTML = text;
}

function strip_tags(str) {
  return str.replace(/<\/?[^>]+>/gi, '');
}


function changeBox(s) {
  labelS = document.getElementById("cs"+s);
  x = document.getElementById("c"+s);
  chan = TodoStorage.getAll();
  if(x.checked) {
    chan[s].check = true;
    changeSet = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    lineThrough(labelS);
    console.log("['TodoStorage'] Цель выполнена "+chan[s].title);
 }
  else{
    chan[s].check = false;
    changeSet = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    labelS.style.textDecoration = "none";
    labelS.style.color = "#fff";
    console.log("['TodoStorage'] Цель была снята с выполненной задачи "+chan[s].title);
  }
}


function lineThrough(label) {
      label.style.textDecoration = "line-through";
      label.style.color = "rgb(177, 20, 20)";
      label.style.transition = "all 1s ease-out 0.5s";
}

function linkWithCheck(){
  link = document.createElement("li");
  x = document.createElement("INPUT");
  label = document.createElement("label");
  x.setAttribute("type", "checkbox");
  return x,label,link;
} 
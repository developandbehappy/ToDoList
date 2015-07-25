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
  if(text.value !== '' && text.value.length < 20) {
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
  else{
    alert("Вы не можете вводить пустую строку, или строку которая имеет больше 20 символов!");
  }
}





function Prov() {
  if(TodoStorage.getAll()) {
  for(i = 0; i < TodoStorage.getAll().length; i++) {
      link = document.createElement("li");
      var x = document.createElement("INPUT");
      label = document.createElement("label");
      label.setAttribute("for", "c"+i);
      label.setAttribute("id", "cs"+i);
      x.setAttribute("type", "checkbox");
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
      link = document.createElement("li");
      var x = document.createElement("INPUT");
      label = document.createElement("label");
      x.setAttribute("type", "checkbox");
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
  getAll = TodoStorage.getAll()[s];
  if(x.checked) {
    chan = TodoStorage.getAll();
    chan[s].check = true;
    changeSet = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    lineThrough(labelS);
    console.log(getAll.check);
 }
  else{
    chan = TodoStorage.getAll();
    chan[s].check = false;
    changeSet = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    labelS.style.textDecoration = "none";
    labelS.style.color = "#fff";
    getAll.check = false;
    console.log(getAll.check+' '+s);
  }
}


function lineThrough(label) {
      label.style.textDecoration = "line-through";
      label.style.color = "#000";
}
var count = 0;
var textBox = [];

var press = document.getElementById("add");
var text = document.getElementById("text");
var block = document.getElementById("block");
var blockOne = document.getElementById("blockOne");
var ul = document.getElementById("ul");

window.onload = Prov;
press.onclick = init;


function init(){
  if(text.value !== '' && text.value.length < 20){
    if(TodoStorage.getAll()){
      TodoStorage.addItem(strip_tags(text.value.trim()));
      addVis(strip_tags(text.value.trim()));
      text.value = '';
    }
    else
    {
      TodoStorage.create();
      TodoStorage.addItem(text.value);
    }
  }
  else{
    alert("Вы не можете вводить пустую строку, или строку которая имеет больше 20 символов!");
  }
}





function Prov(){
  if(TodoStorage.getAll()){
  for(i = 0; i < TodoStorage.getAll().length; i++){
      link = document.createElement("li");
      var x = document.createElement("INPUT");
      label = document.createElement("label");
      label.setAttribute("for", "c"+i);
      label.setAttribute("id", "cs"+i);
      x.setAttribute("type", "checkbox");
      x.setAttribute("id", "c"+i);
      x.setAttribute("onclick", "changeBox("+i+")"); // Думай!
      ul.appendChild(link).appendChild(x);
      ul.appendChild(link).appendChild(label).innerHTML = TodoStorage.getAll()[i];
      
  }
}
else
  {
    TodoStorage.create();
  }
}




function addVis(text){
      link = document.createElement("li");
      var x = document.createElement("INPUT");
      label = document.createElement("label");
      x.setAttribute("type", "checkbox");
      x.setAttribute("id", "c"+Math.floor(TodoStorage.getAll().length));
      x.setAttribute("onclick", "changeBox("+TodoStorage.getAll().length+")");
      label.setAttribute("for", "c"+Math.floor(TodoStorage.getAll().length));
      label.setAttribute("id", "cs"+Math.floor(TodoStorage.getAll().length));
      ul.appendChild(link).appendChild(x);
      ul.appendChild(link).appendChild(label).innerHTML = text;
       
}

function strip_tags( str ){
  return str.replace(/<\/?[^>]+>/gi, '');
}


function changeBox( s ){
  labelS = document.getElementById("cs"+s);
  x = document.getElementById("c"+s);
  if(x.checked){
    labelS.style.textDecoration = "line-through";
    labelS.style.color = "#000";

  }
  else{
    labelS.style.textDecoration = "none";
    labelS.style.color = "#fff";
  }
}

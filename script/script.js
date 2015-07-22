var count = 0;
var textBox = [];

var press = document.getElementById("add");
var text = document.getElementById("text");
var block = document.getElementById("block");
var blockOne = document.getElementById("blockOne");






press.onclick = init;
  
if(JSON.parse(localStorage.a).length > 0){
  var ul = document.getElementById("ul");
  var link = document.createElement("li");
  var a = document.createElement("a");
  for(i = 0; i < JSON.parse(localStorage.a).length; i++){
    ul.appendChild(link).appendChild(a).innerHTML = JSON.parse(localStorage.a)[i];
  }
}

  function init(){
    if(text.value !== ''){

        textBox.push(text.value);
        text.value = '';
        addLocal();

    }
      else{
       
      }
  }


function addLocal(){
    localStorage.a = JSON.stringify(textBox);
    setItem(localStorage.a);
}

function setItem(item){
  var push = JSON.parse(item);
  var ul = document.getElementById("ul");
  var link = document.createElement("li");
  var a = document.createElement("a");
  for(i = 0; i < push.length; i++){
    ul.appendChild(link).appendChild(a).innerHTML = push[i];
  }
}
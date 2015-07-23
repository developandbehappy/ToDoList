var count = 0;
var textBox = [];

var press = document.getElementById("add");
var text = document.getElementById("text");
var block = document.getElementById("block");
var blockOne = document.getElementById("blockOne");
  var ul = document.getElementById("ul");
  var link = document.createElement("li");
  var a = document.createElement("a");

var ToDoStorage = function(arr,addNew){
  this.addEverything = function(arr) {
    for(i = 0; i < arr.length; i++){
        ul.appendChild(link).appendChild(a).innerHTML = arr[i];
    }
  },
  this.lastItem = function(arr){
    arr.pop();
  },
  this.addItem = function(addNew){
    arr.push(text.value);
  },
  this.removeAll = function(arr){
       for(i = 0; i < arr.length; i++){
        arr.shift();
    }
  },
    this.removeItem = function(){

    }
}




press.onclick = init;
if(JSON.parse(localStorage.a).length > 0){
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
  for(i = 0; i < push.length; i++){
    ul.appendChild(link).appendChild(a).innerHTML = push[i];
  }
}
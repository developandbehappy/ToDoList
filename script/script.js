var count = 0;
var textBox = [];

var press = document.getElementById("add");
var text = document.getElementById("text");
var block = document.getElementById("block");
var blockOne = document.getElementById("blockOne");






press.onclick = init;
  
  function init(){
    if(text.value !== ''){
        textBox.push(text.value);
        text.value = '';
        add(text.value);

    }
      else{
       
      }
  }


function add(txt){
    var ul = document.getElementById("ul");
    var link = document.createElement("li");
    var a = document.createElement("a");
    // StringArray = JSON.stringify(textBox);
    // Storage.getItem(stringArray);
   for(i = 0; i<textBox.length; i++){
          ul.appendChild(link).appendChild(a).innerHTML = textBox[i];
    }

}

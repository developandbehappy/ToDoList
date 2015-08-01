var press = document.getElementById("add");
var text = document.getElementById("text");
var block = document.getElementById("block");
var blockOne = document.getElementById("blockOne");
var ul = document.getElementById("ul");

window.onload =  TodoSomeList;
press.onclick = init;
text.addEventListener('keydown',function(e) {
  if (e.keyCode === 13) {
    init();
  }
});
/**
 * @ STATE : active, remove, done
 * @returns {boolean}
 */

function init() {
  if (text.value === "" || text.value.length > 30) {
    alert("Вы не можете вводить пустую строку, или строку которая имеет больше 30 символов!");
    return false;
  } else if (TodoStorage.data.length > 0) {
    act = true;
    dn = false;
    rem = false;
    stateOn();
    TodoStorage.addItem({
      title: stripTags(text.value.trim()),
      check: false,
      state: "active"
    });
    addVisuale(stripTags(text.value.trim()));
    text.value = "";
  } else {
    TodoStorage.create();
    stateOn();
    TodoStorage.addItem({
      title: stripTags(text.value.trim()),
      check: false,
      state: "active"
    });
    addVisuale(stripTags(text.value.trim()));
    text.value = "";
  }
}

function addVisuale(text) {
  linkWithCheck(text);
}

function stripTags(str) {
  return str.replace(/<\/?[^>]+>/gi, "");
}

function changeBox(s) {
  var labelS = document.getElementById("cs" + s);
  var x = document.getElementById("c" + s);
  var chan = TodoStorage.data;
  var changeSet = "";
  if (x.checked) {
    chan[s].check = true;
    chan[s].state = "done";
    changeSet = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    lineThrough(labelS);
    console.log("[TodoStorage] done -> " + chan[s].title);
    window.setTimeout(stateOn,1000);
  } else {
    chan[s].check = false;
    chan[s].state = "active";
    changeSet = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    labelS.style.textDecoration = "none";
    labelS.style.color = "#fff";
    console.log("[TodoStorage] undone -> " + chan[s].title);
    window.setTimeout(stateOn,1000);
  }
}



function lineThrough(label) {
  label.style.textDecoration = "line-through";
  label.style.color = "rgb(177, 20, 20)";
  label.style.transition = "all 1s ease-out 0.5s";
  return label;
}

function linkWithCheck(text) {
  var dataLength = Math.floor(TodoStorage.data.length - 1);
  var x = document.createElement("INPUT");
  var label = document.createElement("label");
  var link = document.createElement("li");
  var linkA = document.createElement("a");
  var img = document.createElement("img");
  img.setAttribute("src" , "img/ico_mus.png");
  img.setAttribute("class" , "imgMus");
  x.setAttribute("type", "checkbox");
  x.setAttribute("id", "c" + dataLength );
  x.setAttribute("onclick", "changeBox(" + dataLength + ")");
  linkA.setAttribute("href" , "#");
  linkA.setAttribute("class" , "delete" + dataLength);
  label.setAttribute("for", "c" + dataLength);
  label.setAttribute("id", "cs" + dataLength);
  ul.appendChild(link).appendChild(x);
  ul.appendChild(link).appendChild(linkA).appendChild(img);
  ul.appendChild(link).appendChild(label).innerHTML = text;
}


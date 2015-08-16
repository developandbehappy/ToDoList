var press = document.getElementById("add");
var text  = document.getElementById("text");

var varForWhile = {
  a: null,
  b: null,
  c: null
};


window.onload = TodoSomeList;
press.onclick = init;
text.addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    init();
  }
});
/**
 * @ STATE : active, remove, done
 * @returns {boolean}
 */

function init() {
  if (text.value === "" || text.value.length > 40) {
    if (text.value === "") {
        $.notify("Вы не можете отправить пустую строку", "warn");
    }
    else if (text.value.length > 40) {
        $.notify("Вы не можете отправить строку больше 40 символов", "warn");
    }
    return false;
  } else if (TodoStorage.data.length > 0) {
    act = true;
    dn  = false;
    rem = false;
    stateOn(true, false, false);
    TodoStorage.addItem({
      title: stripTags(text.value.trim()),
      check: false,
      state: "active"
    });
    addVisuale(stripTags(text.value.trim()));
    text.value = "";
  } else {
    TodoStorage.create();
    stateOn(true, false, false);
    TodoStorage.addItem({
      title: stripTags(text.value.trim()),
      check: false,
      state: "active"
    });
    addVisuale(stripTags(text.value.trim()));
    text.value = "";
  }
}

function addVisuale(someText) {
  linkWithCheck(someText);
}

function stripTags(str) {
  return str.replace(/<\/?[^>]+>/gi, "");
}

function changeBox(s) {
  var labelS      = document.getElementById("cs" + s);
  var x           = document.getElementById("c" + s);
  var chan        = TodoStorage.data;
  var changeSet   = "";
  if (x.checked) {
    chan[s].check = true;
    chan[s].state = "done";
    changeSet     = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    lineThrough(labelS);
    console.log("[TodoStorage] done -> " + chan[s].title);
    window.setTimeout(stateOn, 1000);
  } else {
    chan[s].check = false;
    chan[s].state = "active";
    changeSet     = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    labelS.style.textDecoration = "none";
    labelS.style.color = "#fff";
    console.log("[TodoStorage] undone -> " + chan[s].title);
    window.setTimeout(stateOn, 1000);
  }
}

function lineThrough(label) {
  label.style.textDecoration = "line-through";
  label.style.color          = "rgb(177, 20, 20)";
  label.style.transition     = "all 1s ease-out 0.5s";
  return label;
}

function linkWithCheck(textFromInput) {
  var dataLength = Math.floor(TodoStorage.data.length - 1);
  var x          = document.createElement("INPUT");
  var label      = document.createElement("label");
  var link       = document.createElement("li");
  var linkA      = document.createElement("a");
  var img        = document.createElement("img");
  img.setAttribute("src", "img/ico_mus.png");
  img.setAttribute("class", "imgMus");
  x.setAttribute("type", "checkbox");
  x.setAttribute("id", "c" + dataLength);
  x.setAttribute("onclick", "changeBox(" + dataLength + ")");
  linkA.setAttribute("href", "#");
  linkA.setAttribute("class", "delete" + dataLength);
  label.setAttribute("for", "c" + dataLength);
  label.setAttribute("id", "cs" + dataLength);
  someLink.ul.appendChild(link).appendChild(x);
  someLink.ul.appendChild(link).appendChild(linkA).appendChild(img);
  someLink.ul.appendChild(link).appendChild(label).innerHTML = textFromInput;
}

function deleteLink(s) {
  link                = document.getElementById('delete' + s);
  getAllDate          = TodoStorage.data;
  getAllDate[s].state = 'remove';
  changeSet           = JSON.stringify(getAllDate);
  localStorage.setItem(TodoStorage.storageName, changeSet);
  console.log('[TodoStorage] remove -> ' + getAllDate[s].title);
  window.setTimeout(stateOn, 100);
}

function returnLink(s) {
  link                = document.getElementById('imgRet' + s);
  getAllDate          = TodoStorage.data;
  getAllDate[s].state = 'active';
  changeSet           = JSON.stringify(getAllDate);
  localStorage.setItem(TodoStorage.storageName, changeSet);
  console.log('[TodoStorage] return -> ' + getAllDate[s].title);
  window.setTimeout(stateOn, 100);
}

function TodoSomeList() {
  hash = window.location.hash;
  if (hash === '#active') {
    varForWhile.a = true;
    varForWhile.b = false;
    varForWhile.c = false;
  }
  if (hash === '#done') {
    varForWhile.a = false;
    varForWhile.b = true;
    varForWhile.c = false;
  }
  if (hash === '#remove') {
    varForWhile.a = false;
    varForWhile.b = false;
    varForWhile.c = true;
  }
  TodoStorage.create();
  stateOn(varForWhile.a, varForWhile.b, varForWhile.c);
}
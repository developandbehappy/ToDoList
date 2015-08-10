var active = document.getElementById("active");
var done = document.getElementById("done");
var remove = document.getElementById("remove");
var h1 = document.getElementById("h1");

var a, b, c; // var for while
var act = false,
dn = false,
rem = false;

active.onclick = function () {
  stateOn(true, false, false);
}
done.onclick = function () {
  stateOn(false, true, false);
}
remove.onclick = function () {
  stateOn(false, false, true);
}
function stateOn(one, two, three) {
  if (one === true) {
  act = true;
  dn = false;
  rem = false;
  console.log("Its Active Block");
  h1.innerHTML = "Список заданий";
  active.style.background = "#eee";
  done.style.background = "#fff";
  remove.style.background = "#fff";
  }
  if (two === true) {
  act = false;
  dn = true;
  rem = false;
  console.log("Its Done Block");
  h1.innerHTML = "Выполненные задания";
  active.style.background = "#fff";
  done.style.background = "#eee";
  remove.style.background = "#fff";
  }
  if (three === true) {
  act = false;
  dn = false;
  rem = true;
  console.log("Its remove Block");
  h1.innerHTML = "Удаленные задания";
  active.style.background = "#fff";
  done.style.background = "#fff";
  remove.style.background = "#eee";
  }
  stateIn = TodoStorage.data;
  deleteLabe();
  stateIn.forEach(function (item, i) {
    if (act) {
      if (item.state === "active") {
        labelTak();
      }
    }
    if (dn) {
      if (item.state === "done") {
        labelTak();
        x.setAttribute("checked", true);
        lineThrough(label);
      }
    }
    if (rem) {
      if (item.state === "remove") {
        labelTak();
        imgRet = document.createElement("img");
        imgRet.setAttribute("src", "img/return.png");
        imgRet.setAttribute("class", "ret");
        linkA.setAttribute("id", "imgRet");
        linkA.setAttribute("onclick", "returnLink(" + i + ")");
        ul.appendChild(link).removeChild(linkA).removeChild(img);
        ul.appendChild(link).removeChild(x);
        ul.appendChild(link).appendChild(linkA).appendChild(imgRet);
      }
    }

  function labelTake() {
    link = document.createElement("li");
    x = document.createElement("INPUT");
    label = document.createElement("label");
    img = document.createElement("img");
    img.setAttribute("src", "img/ico_mus.png");
    img.setAttribute("class", "imgMus");
    linkA = document.createElement("a");
    linkA.setAttribute("id", "delete" + i);
    linkA.setAttribute("href", "#");
    linkA.setAttribute("onclick", "deleteLink(" + i + ")");
    x.setAttribute("type", "checkbox");
    label.setAttribute("for", "c" + i);
    label.setAttribute("id", "cs" + i);
    x.setAttribute("id", "c" + i);
    x.setAttribute("onclick", "changeBox(" + i + ")");
    ul.appendChild(link).appendChild(linkA).appendChild(img);
    ul.appendChild(link).appendChild(x);
    ul.appendChild(link).appendChild(label).innerHTML = item.title;
  }
});
}



function TodoSomeList() {
  hash = window.location.hash;
  if (hash === "#active") {
    a = true;
    b = false;
    c = false;
  }
  else if (hash === "#done") {
    a = false;
    b = true;
    c = false;
  }
  else if (hash === "#remove") {
    a = false;
    b = false;
    c = true;
  }
  TodoStorage.create();
  stateOn(a, b, c);
}


function deleteLabel() {
  if (ul.childNodes.length > 0) {
    for (i = 0; i < ul.childNodes.length; i++) {
      x = document.getElementById("c" + i);
      label = document.getElementById("cs" + i);
      ul.removeChild(ul.childNodes[i]);
      deleteLabel();
    }
  }
}

function deleteLink(s) {
  link = document.getElementById("delete" + s);
  getAllDate = TodoStorage.data;
  getAllDate[s].state = "remove";
  changeSet = JSON.stringify(getAllDate);
  localStorage.setItem(TodoStorage.storageName, changeSet);
  console.log("[TodoStorage] remove -> " + getAllDate[s].title);
  window.setTimeout(stateOn, 100);
}


function returnLink(s) {
  link = document.getElementById("imgRet" + s);
  getAllDate = TodoStorage.data;
  getAllDate[s].state = "active";
  changeSet = JSON.stringify(getAllDate);
  localStorage.setItem(TodoStorage.storageName, changeSet);
  console.log("[TodoStorage] return -> " + getAllDate[s].title);
  window.setTimeout(stateOn, 100);
}


var TodoStorage = TodoStorage || undefined;

var someLink = {
  active: document.getElementById('active'),
  done: document.getElementById('done'),
  remove: document.getElementById('remove'),
  h1: document.getElementById('h1'),
  ul: document.getElementById('ul')
};

var activeLink = {
  act: false,
  dn: false,
  rem: false,
  stateIn: undefined,
  getInput: undefined,
  getlabel: undefined
};

var forLabel = {
  link: undefined,
  x: undefined,
  label: undefined,
  linkA: undefined,
  imgRet: undefined,
  imgDelete: undefined
};

var someElForText = {
  press: document.getElementById('add'),
  text: document.getElementById('text')
};

var varForWhile = {
  a: null,
  b: null,
  c: null
};

var actDnRem = {
  act: undefined,
  dn: undefined,
  rem: undefined
};

function deleteLabel() {
  var i = 0;
  if (someLink.ul.childNodes.length > 0) {
    for (i = 0; i < someLink.ul.childNodes.length; i++) {
      activeLink.getInput     = document.getElementById('c' + i);
      activeLink.getlabel     = document.getElementById('cs' + i);
      someLink.ul.removeChild(someLink.ul.childNodes[i]);
      deleteLabel();
    }
  } else {
    return false;
  }
}

function lineThrough(label) {
  label.style.textDecoration = 'line-through';
  label.style.color          = 'rgb(177, 20, 20)';
  label.style.transition     = 'all 1s ease-out 0.5s';
  return label;
}

function stateOn(one, two, three) {
  if (one) {
    activeLink.act                   = true;
    activeLink.dn                    = false;
    activeLink.rem                   = false;
    someLink.active.style.background = '#eee';
    someLink.done.style.background   = '#fff';
    someLink.remove.style.background = '#fff';
    someLink.h1.innerHTML            = 'Список заданий';
    console.log('Its Active Block');
  }
  if (two) {
    activeLink.act                   = false;
    activeLink.dn                    = true;
    activeLink.rem                   = false;
    someLink.active.style.background = '#fff';
    someLink.done.style.background   = '#eee';
    someLink.remove.style.background = '#fff';
    someLink.h1.innerHTML            = 'Выполненные задания';
    console.log('Its Done Block');
  }
  if (three) {
    activeLink.act                   = false;
    activeLink.dn                    = false;
    activeLink.rem                   = true;
    someLink.active.style.background = '#fff';
    someLink.done.style.background   = '#fff';
    someLink.remove.style.background = '#eee';
    someLink.h1.innerHTML            = 'Удаленные задания';
    console.log('Its remove Block');
  }
  activeLink.stateIn = TodoStorage.data;
  deleteLabel();
  activeLink.stateIn.forEach(function (item, i) {
    function labelTake() {
      forLabel.link  = document.createElement('li');
      forLabel.x     = document.createElement('INPUT');
      forLabel.label = document.createElement('label');
      forLabel.imgDelete   = document.createElement('img');
      forLabel.linkA = document.createElement('a');
      forLabel.imgDelete.setAttribute('src', 'img/ico_mus.png');
      forLabel.imgDelete.setAttribute('class', 'imgMus');
      forLabel.linkA.setAttribute('id', 'delete' + i);
      forLabel.linkA.setAttribute('href', '#');
      forLabel.linkA.setAttribute('onclick', 'deleteLink(' + i + ')');
      forLabel.x.setAttribute('type', 'checkbox');
      forLabel.label.setAttribute('for', 'c' + i);
      forLabel.label.setAttribute('id', 'cs' + i);
      forLabel.x.setAttribute('id', 'c' + i);
      forLabel.x.setAttribute('onclick', 'changeBox(' + i + ')');
      someLink.ul.appendChild(forLabel.link).appendChild(forLabel.linkA).appendChild(forLabel.imgDelete);
      someLink.ul.appendChild(forLabel.link).appendChild(forLabel.x);
      someLink.ul.appendChild(forLabel.link).appendChild(forLabel.label).innerHTML = item.title;
    }
    if (activeLink.act) {
      if (item.state === 'active') {
        labelTake();
      }
    }
    if (activeLink.dn) {
      if (item.state === 'done') {
        labelTake();
        forLabel.x.setAttribute('checked', true);
        lineThrough(forLabel.label);
      }
    }
    if (activeLink.rem) {
      if (item.state === 'remove') {
        labelTake();
        forLabel.imgRet = document.createElement('img');
        forLabel.imgRet.setAttribute('src', 'img/return.png');
        forLabel.imgRet.setAttribute('class', 'ret');
        forLabel.linkA.setAttribute('id', 'imgRet');
        forLabel.linkA.setAttribute('onclick', 'returnLink(' + i + ')');
        someLink.ul.appendChild(forLabel.link).removeChild(forLabel.linkA).removeChild(forLabel.imgDelete);
        someLink.ul.appendChild(forLabel.link).removeChild(forLabel.x);
        someLink.ul.appendChild(forLabel.link).appendChild(forLabel.linkA).appendChild(forLabel.imgRet);
      }
    }
  });
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

function linkWithCheck(textFromInput) {
  var dataLength = Math.floor(TodoStorage.data.length - 1);
  forLabel.x          = document.createElement('INPUT');
  forLabel.label      = document.createElement('label');
  forLabel.link       = document.createElement('li');
  forLabel.linkA      = document.createElement('a');
  forLabel.img        = document.createElement('img');
  forLabel.img.setAttribute('src', 'img/ico_mus.png');
  forLabel.img.setAttribute('class', 'imgMus');
  forLabel.x.setAttribute('type', 'checkbox');
  forLabel.x.setAttribute('id', 'c' + dataLength);
  forLabel.x.setAttribute('onclick', 'changeBox(' + dataLength + ')');
  forLabel.linkA.setAttribute('href', '#');
  forLabel.linkA.setAttribute('id', 'delete' + dataLength);
  forLabel.linkA.setAttribute('onclick', 'deleteLink(' + dataLength + ')');
  forLabel.label.setAttribute('for', 'c' + dataLength);
  forLabel.label.setAttribute('id', 'cs' + dataLength);
  someLink.ul.appendChild(forLabel.link).appendChild(forLabel.x);
  someLink.ul.appendChild(forLabel.link).appendChild(forLabel.linkA).appendChild(forLabel.img);
  someLink.ul.appendChild(forLabel.link).appendChild(forLabel.label).innerHTML = textFromInput;
}

function addVisuale(someText) {
  linkWithCheck(someText);
}

function stripTags(str) {
  return str.replace(/<\/?[^>]+>/gi, '');
}

/**
 * @ STATE : active, remove, done
 * @returns {boolean}
 */

function init() {
  if (someElForText.text.value === '' || someElForText.text.value.length > 40) {
    if (someElForText.text.value === '') {
      $.notify('Вы не можете отправить пустую строку', 'warn');
    }
    if (someElForText.text.value.length > 40) {
      $.notify('Вы не можете отправить строку больше 40 символов', 'warn');
    }
    return false;
  }
  if (TodoStorage.data.length > 0) {
    actDnRem.act = true;
    actDnRem.dn  = false;
    actDnRem.rem = false;
    stateOn(true, false, false);
    TodoStorage.addItem({
      title: stripTags(someElForText.text.value.trim()),
      check: false,
      state: 'active'
    });
    addVisuale(stripTags(someElForText.text.value.trim()));
    someElForText.text.value = '';
  } else {
    TodoStorage.create();
    stateOn(true, false, false);
    TodoStorage.addItem({
      title: stripTags(someElForText.text.value.trim()),
      check: false,
      state: 'active'
    });
    addVisuale(stripTags(someElForText.text.value.trim()));
    someElForText.text.value = '';
  }
}

window.changeBox = function(s) {
  var labelS      = document.getElementById('cs' + s);
  var x           = document.getElementById('c' + s);
  var chan        = TodoStorage.data;
  var changeSet   = '';
  if (x.checked) {
    chan[s].check = true;
    chan[s].state = 'done';
    changeSet     = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    lineThrough(labelS);
    console.log('[TodoStorage] done -> ' + chan[s].title);
    window.setTimeout(stateOn, 1000);
  } else {
    chan[s].check = false;
    chan[s].state = 'active';
    changeSet     = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    labelS.style.textDecoration = 'none';
    labelS.style.color = '#fff';
    console.log('[TodoStorage] undone -> ' + chan[s].title);
    window.setTimeout(stateOn, 1000);
  }
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

window.onload = TodoSomeList;
someElForText.press.onclick = init;
someElForText.text.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    init();
  }
});

someLink.active.onclick = function () {
  stateOn(true, false, false);
};

someLink.done.onclick = function () {
  stateOn(false, true, false);
};

someLink.remove.onclick = function () {
  stateOn(false, false, true);
};


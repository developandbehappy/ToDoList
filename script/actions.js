var someLink = {
  active: document.getElementById('active'),
  done: document.getElementById('done'),
  remove: document.getElementById('remove'),
  h1: document.getElementById('h1')
};

var varForWhile = {
  a: null,
  b: null,
  c: null
};

var activeLink = {
  act: false,
  dn: false,
  rem: false
};

var forLabel = {
  link: null,
  x: null,
  label: null,
  linkA: null,
  imgRet: null,
  imgDelete: null
};

function stateOn(one, two, three) {
  if (one === true) {
    activeLink.act                   = true;
    activeLink.dn                    = false;
    activeLink.rem                   = false;
    console.log('Its Active Block');
    someLink.h1.innerHTML            = 'Список заданий';
    someLink.active.style.background = '#eee';
    someLink.done.style.background   = '#fff';
    someLink.remove.style.background = '#fff';
  }
  if (two === true) {
    activeLink.act                   = false;
    activeLink.dn                    = true;
    activeLink.rem                   = false;
    console.log('Its Done Block');
    someLink.h1.innerHTML            = 'Выполненные задания';
    someLink.active.style.background = '#fff';
    someLink.done.style.background   = '#eee';
    someLink.remove.style.background = '#fff';
  }
  if (three === true) {
    activeLink.act                   = false;
    activeLink.dn                    = false;
    activeLink.rem                   = true;
    console.log('Its remove Block');
    someLink.h1.innerHTML            = 'Удаленные задания';
    someLink.active.style.background = '#fff';
    someLink.done.style.background   = '#fff';
    someLink.remove.style.background = '#eee';
  }

  stateIn = TodoStorage.data;
  deleteLabel();
  stateIn.forEach(function (item, i) {
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
        ul.appendChild(forLabel.link).removeChild(forLabel.linkA).removeChild(forLabel.imgDelete);
        ul.appendChild(forLabel.link).removeChild(forLabel.x);
        ul.appendChild(forLabel.link).appendChild(forLabel.linkA).appendChild(forLabel.imgRet);
      }
    }

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
    ul.appendChild(forLabel.link).appendChild(forLabel.linkA).appendChild(forLabel.imgDelete);
    ul.appendChild(forLabel.link).appendChild(forLabel.x);
    ul.appendChild(forLabel.link).appendChild(forLabel.label).innerHTML = item.title;
  }
});
}

someLink.active.onclick = function () {
  stateOn(true, false, false);
};
someLink.done.onclick = function () {
  stateOn(false, true, false);
};
someLink.remove.onclick = function () {
  stateOn(false, false, true);
};
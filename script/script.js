var textBox = [];
var press = document.getElementById('add');
var text = document.getElementById('text');
var block = document.getElementById('block');
var blockOne = document.getElementById('blockOne');
var ul = document.getElementById('ul');

window.onload = TodoStorage.create();
press.onclick = init;

/**
 * @ STATE : active, remove, done
 * @returns {boolean}
 */
function init() {
  if (text.value === '' || text.value.length > 30) {
    alert('Вы не можете вводить пустую строку, или строку которая имеет больше 30 символов!');
    return false;
  } else if (TodoStorage.data.length > 0) {
    TodoStorage.addItem({
      title: stripTags(text.value.trim()),
      check: false,
      state: 'active'
    });
    addVisuale(stripTags(text.value.trim()));
    text.value = '';
  } else {
    TodoStorage.addItem({
      title: stripTags(text.value.trim()),
      check: false,
      state: 'active'
    });
    addVisuale(stripTags(text.value.trim()));
    text.value = '';
  }
}

function addVisuale(text) {
  linkWithCheck();
  dataStorage = Math.floor(TodoStorage.data.length - 1);
  x.setAttribute('id', 'c' + dataStorage );
  x.setAttribute('onclick', 'changeBox(' + dataStorage + ')');
  label.setAttribute('for', 'c' + dataStorage);
  label.setAttribute('id', 'cs' + dataStorage);
  ul.appendChild(link).appendChild(x);
  ul.appendChild(link).appendChild(label).innerHTML = text;
}

function stripTags(str) {
  return str.replace(/<\/?[^>]+>/gi, '');
}

function changeBox(s) {
  var labelS = document.getElementById('cs' + s);
  var x = document.getElementById('c' + s);
  var chan = TodoStorage.data;
  var changeSet = '';
  if (x.checked) {
    chan[s].check = true;
    chan[s].state = 'done';
    changeSet = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    lineThrough(labelS);
    console.log('[TodoStorage] done -> ' + chan[s].title);
  } else {
    chan[s].check = false;
    chan[s].state = 'active';
    changeSet = JSON.stringify(chan);
    localStorage.setItem(TodoStorage.storageName, changeSet);
    labelS.style.textDecoration = 'none';
    labelS.style.color = '#fff';
    console.log('[TodoStorage] undone -> ' + chan[s].title);
  }
}

function lineThrough(label) {
  label.style.textDecoration = 'line-through';
  label.style.color = 'rgb(177, 20, 20)';
  label.style.transition = 'all 1s ease-out 0.5s';
  return label;
}

function linkWithCheck() {
  var x = document.createElement('INPUT');
  var label = document.createElement('label');
  x.setAttribute('type', 'checkbox');
  return {
    x: x,
    label: label
  };
}
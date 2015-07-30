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
    document.location.href = "#active";
  } else {
    TodoStorage.create();
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
  linkWithCheck(text);
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

function linkWithCheck(text) {
  dataLength = Math.floor(TodoStorage.data.length - 1);
  x = document.createElement('INPUT');
  label = document.createElement('label');
  link = document.createElement('li');
  linkA = document.createElement('a');
  img = document.createElement('img');
  img.setAttribute('src','img/ico_mus.png');
  img.setAttribute('class','imgMus');
  x.setAttribute('type', 'checkbox');
  x.setAttribute('id', 'c' + dataLength );
  x.setAttribute('onclick', 'changeBox(' + dataLength + ')');
  linkA.setAttribute('href','#');
  linkA.setAttribute('class','delete' + dataLength);
  label.setAttribute('for', 'c' + dataLength);
  label.setAttribute('id', 'cs' + dataLength);
  ul.appendChild(link).appendChild(x);
  ul.appendChild(link).appendChild(linkA).appendChild(img);
  ul.appendChild(link).appendChild(label).innerHTML = text;
}


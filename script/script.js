var count = 0;
var textBox = [];

var press = document.getElementById("add");
var text = document.getElementById("text");
var block = document.getElementById("block");
var blockOne = document.getElementById("blockOne");
var ul = document.getElementById("ul");

window.onload = Prov;
press.onclick = init;


function init(){
  if(text.value !== ''){
    if(TodoStorage.getAll()){
      TodoStorage.addItem(text.value);
      addVis(text.value);
      text.value = '';

    }
    else
    {
      TodoStorage.create();
      TodoStorage.addItem(text.value);
    }
  }
}



/**
 * Функция для проверки строки на JSON
 * @param str
 * @returns {boolean}
 * @constructor
 */
var IsJsonString = function (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 *
 * @type {{storage: Storage, setObject: Function, setString: Function, get: Function}}
 */
var StorageHelper = {
  storage: window.localStorage,
  setObject: function (name, object) {
    var string = JSON.stringify(object);
    this.storage.setItem(name, string);
  },
  setString: function (name, string) {
    this.storage.setItem(name, string);
  },
  get: function (name) {
    var result = this.storage.getItem(name);
    if (!result) {
      return false;
    }
    if (IsJsonString(result)) {
      return JSON.parse(result);
    }
    return result;
  }
};

var TodoStorage = {
  storageName: 'todo_storage',
  create: function () {
    if (this.getAll()) {
      return false;
    }
    StorageHelper.setObject(this.storageName, []);
  },
  getAll: function () {
    return StorageHelper.get(this.storageName);
  },
  addItem: function (item) {
    var arr = this.getAll();
    arr.push(item);
    StorageHelper.setObject(this.storageName, arr);
  }
};

function Prov(){
  if(TodoStorage.getAll()){
  for(i = 0; i < TodoStorage.getAll().length; i++){
      var link = document.createElement("li");
      var a = document.createElement("a");
      ul.appendChild(link).appendChild(a).innerHTML = TodoStorage.getAll()[i];
  }
}
else
  {
    TodoStorage.create();
  }
}


function addVis(text){
      var link = document.createElement("li");
      var a = document.createElement("a");
      ul.appendChild(link).appendChild(a).innerHTML = text;
}
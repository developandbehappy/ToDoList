var active = document.getElementById('active');
var done = document.getElementById('did');
var remove = document.getElementById('remove');

var act = false,dn = false,rem = false;


active.onclick = function(){
	act = true;
	dn = false;
	rem = false;
	stateOn();
	console.log('Its Active Block');
}

done.onclick = function(){
	act = false;
	dn = true;
	rem = false;
	stateOn();
	console.log('Its Done Block');
}

remove.onclick = function(){
	act = false;
	dn = false;
	rem = true;
	stateOn();
	console.log('Its remove Block');
}

function stateOn(){
  stateIn = TodoStorage.data;
  deleteLabel();
  for (i = 0;i < stateIn.length; i++){
    if (act){
      if(stateIn[i].state == 'active'){
	      labelTake();
  		}
    }
    if (dn){
      if(stateIn[i].state == 'done'){
	      labelTake();
	      x.setAttribute("checked", true);
          lineThrough(label);
  		}
    }
    if (rem){
      if(stateIn[i].state == 'remove'){
	      labelTake();
  		}
    }
      function labelTake(){
		  link = document.createElement("li");
		  x = document.createElement("INPUT");
		  label = document.createElement("label");
		  x.setAttribute("type", "checkbox");
	      label.setAttribute("for", "c" + i);
	      label.setAttribute("id", "cs" + i);
	      x.setAttribute("id", "c" + i);
	      x.setAttribute("onclick", "changeBox(" + i + ")");
	      ul.appendChild(link).appendChild(x);
	      ul.appendChild(link).appendChild(label).innerHTML = stateIn[i].title;
    }
  }
}

function deleteLabel(){
    if(ul.childNodes.length > 0){
  	 for (i = 0;i < ul.childNodes.length; i++){
		 x = document.getElementById("c"+i);
		 label = document.getElementById("cs"+i);
		 ul.removeChild(ul.childNodes[i]);
		 deleteLabel();
	  }
	}
}
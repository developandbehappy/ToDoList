var active = document.getElementById('active');
var done = document.getElementById('did');
var remove = document.getElementById('remove');

var act = false,dn = false,rem = false;


active.onclick = function(){
	act = true;
	dn = false;
	rem = false;
	stateOn();
}

done.onclick = function(){
	act = false;
	dn = true;
	rem = false;
	//deleteLabel();
	stateOn();
}

remove.onclick = function(){
	act = false;
	dn = false;
	rem = true;
	stateOn();
}

function stateOn(){
  stateIn = TodoStorage.data;
  if(ul.childNodes.length > 0){
  	deleteLabel();
	}
  for (i = 0;i < stateIn.length; i++){
    if (act){
      if(stateIn[i].state == 'active' ){
	      labelTake();
	      console.log('Its Active Block');
  		}
    }
    if (dn){
      if(stateIn[i].state == 'done' ){
	      labelTake();
	      x.setAttribute("checked", true);
          lineThrough(label);
	      console.log('Its Done Block');
  		}
    }
    if (rem){
      if(stateIn[i].state == 'remove' ){
	      labelTake();
	      console.log('Its remove Block');
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
  	 for (i = 0;i < ul.childNodes.length; i++){
		 x = document.getElementById("c"+i);
		 label = document.getElementById("cs"+i);
		 ul.removeChild(ul.childNodes[i]);
		 deleteLabel();
	}
}
function goTo(path){
  var formData = new FormData();
  formData.append("path", path);
  var request = new XMLHttpRequest();
  request.open("POST", "/files");
  request.send(formData);
  console.log(path);
  request.onload = function(){
    data=JSON.parse(this.responseText);
    if (data["error"]){
      alert("Directory not available");
    }else{
      var nav = document.getElementById("nav-files");
      nav.innerHTML = data["html"];
    }
  }
}

function switchBreadcrumb(){
  var bcList = document.getElementsByClassName("l-bcList")[0]
  var bcInput = document.getElementsByClassName("l-bcInput")[0]
  if (bcList.className == "l-bcList is-hidden"){
    bcList.setAttribute("class", "l-bcList");
    bcInput.setAttribute("class", "l-bcInput is-hidden");
  }else{
    bcList.setAttribute("class", "l-bcList is-hidden");
    bcInput.setAttribute("class", "l-bcInput");
  }
}

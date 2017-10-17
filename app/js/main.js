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

function goTo(path){
  var formData = new FormData();
  formData.append("path", path);
  var request = new XMLHttpRequest();
  request.open("POST", "/files");
  request.send({"path":path});
  console.log(path);
  request.onload = function(){
    data=JSON.parse(this.responseText);
    if (data["error"]){
      alert("Directory not available");
    }else{
      var nav = document.getElementsById("nav-files");
      nav.innerHTML = data["html"];
    }
  }
}

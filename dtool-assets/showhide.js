function switchShowHide() {
  var showHideList = document.getElementsByClassName("showhide-switch");
  var offset = "15";
  var docWidth = document.body.clientWidth;
  
  for (var i = 0; i < showHideList.length; i++) {
    showHideList[i].onclick = function() {
      var parentNode = this.parentNode;
      if( this.value == '+ Show') {
        this.value = '- Hide';
        this.className += " showhide-switch-open";
        parentNode.className += " showhide-open";
        
        if (parentNode.getBoundingClientRect().right > docWidth) {
            parentNode.style.left = docWidth - parentNode.offsetWidth - offset + document.documentElement.scrollLeft + 'px';
        }
      } else {
        this.value = '+ Show';
        this.className = " showhide-switch";
        parentNode.className = "showhide";
        parentNode.style.left = "auto";
      }
    };
  }
}
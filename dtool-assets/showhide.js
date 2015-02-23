function switchShowHide() {
  var showHideList = document.getElementsByClassName("showhide-switch");
  var offset = "15";
  for (var i = 0; i < showHideList.length; i++) {
    showHideList[i].onclick = function() {
      if( this.value == '+ Show') {
        this.value = '- Hide';
        this.parentNode.className += " showhide-open";
        this.style.width = "100%";
        
        var docWidth = document.body.clientWidth;
        var showHideRect = this.parentNode.getBoundingClientRect();
        var showHideWidth = this.parentNode.offsetWidth;
        
        if( showHideRect.right > docWidth ) {
          var scrollVal = document.documentElement.scrollLeft;
          this.parentNode.style.left = docWidth - showHideWidth - offset + scrollVal + "px";
        }
      } else {
        this.value = '+ Show';
        this.parentNode.className = "showhide";
        this.style.width = "";
        this.parentNode.style.left = "auto";
      }
    };
  }
}
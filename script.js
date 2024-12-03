$(document).ready(function () {
    checkUser();
    modifyCSS(getUser());
    activeNavLink();
    /// FOR the footer 
    $("#current-year").text(new Date().getFullYear());

    /// FOR User Role Session
    $("#user-student").click(function(){
        sessionStorage.setItem("username", "student");
      });
    $("#user-librarian").click(function(){
        sessionStorage.setItem("username", "librarian");
      });
    $("#user-admin").click(function(){
        sessionStorage.setItem("username", "admin");
      });
    $("#test").text(sessionStorage.getItem("username"));
});

function getUser(){
  return sessionStorage.getItem("username");
}

function removeUser(){
  sessionStorage.removeItem("username");
}

function checkUser(){
    var currentHTMLName = document.location.href.match(/[^\/]+$/)[0];
    if (currentHTMLName == "index.html"){
        return;
    }
    var session = getUser();
    if (session != "student" && session != "librarian" && session != "admin"){
        window.location.href = "index.html";
    }
}

function modifyCSS(user){
    if (user == "admin") {
      $("nav").css({
        "background": "linear-gradient(318deg, rgba(234,182,77,1) 0%, rgba(233,200,78,1) 100%)"
      });
      $("footer").css({
          "background": "linear-gradient(318deg, rgba(234,182,77,1) 0%, rgba(233,200,78,1) 100%)"
      });
      $(".bg-gradient-green").css({
          "background": "linear-gradient(318deg, rgba(234,182,77,1) 0%, rgba(233,200,78,1) 100%)"
      });
    } else if (user == "librarian"){
      $("nav").css({
        "background": "linear-gradient(318deg, rgba(61,38,42,1) 0%, rgba(89,54,60,1) 100%)"
      });
      $("footer").css({
          "background": "linear-gradient(318deg, rgba(61,38,42,1) 0%, rgba(89,54,60,1) 100%)"
      });
      $(".bg-gradient-green").css({
          "background": "linear-gradient(318deg, rgba(61,38,42,1) 0%, rgba(89,54,60,1) 100%)"
      });
    
    } else {
      $("nav").css({
        "background": "linear-gradient(318deg, rgba(18,124,86,1) 0%, rgba(31,183,129,1) 100%)"
      });
      $("footer").css({
          "background": "linear-gradient(318deg, rgba(18,124,86,1) 0%, rgba(31,183,129,1) 100%)"
      });
      $(".bg-gradient-green").css({
          "background": "linear-gradient(318deg, rgba(18,124,86,1) 0%, rgba(31,183,129,1) 100%)"
      });
    
    }
}

function activeNavLink() {
  var currentUrl = window.location.href;
  $('.nav-link').each(function() {
      if (this.href === currentUrl) {
          $(this).addClass('active border-top border-white border-3');
      } else {
          $(this).removeClass('active border-top border-white border-3');
      }
  });
}

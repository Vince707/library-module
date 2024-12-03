$(document).ready(function () {
    checkUser();
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

function checkUser(){
    var currentHTMLName = document.location.href.match(/[^\/]+$/)[0];
    if (currentHTMLName == "index.html"){
        return;
    }
    var session = sessionStorage.getItem("username");
    if (session != "student" && session != "librarian" && session != "admin"){
        window.location.href = "index.html";
    }
}
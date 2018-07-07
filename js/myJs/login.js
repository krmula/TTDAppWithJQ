$(document).ready(function(){
    $('#login').click(function(){
        login();
    });
    $('#logout').click(function(){
        logout();
    });
});

function login(){
    var username = $('#firstInput').val();
    if(username === 'venkat.veerareddy@gmail.com'){
        window.location.href = 'admin.html';
    }
}

function logout(){
    window.location.href = 'search.html';
}



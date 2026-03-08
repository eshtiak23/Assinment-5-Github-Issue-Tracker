function login(){

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const defaultUser = "admin";
    const defaultPass = "admin123";

    if(username === defaultUser && password === defaultPass){

   
        window.location.href = "dashboard.html"

    }
    else{

        alert("Invalid Username or Password");

    }

}



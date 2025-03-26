import {getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const HomeButton = document.querySelector('.HomeBtn');

const Key =  getAuth();

const formRegistreren = document.querySelector('.FormRegistreren')

formRegistreren.addEventListener('submit', (event) =>{
    event.preventDefault();

    let email = formRegistreren.email.value;
    let password = formRegistreren.password.value;

    createUserWithEmailAndPassword(Key, email, password).then((cred) =>{
        console.log("User registered!", cred.user)
        formRegistreren.reset();
    })

})

const logUitBtn = document.querySelector('.uitloggen')

logUitBtn.addEventListener('click', ()=>{
    signOut(Key).then(()=>{
        console.log("Je bent uitgelogd...")
    })
})

const formInloggen = document.querySelector('.FormInloggen')

formInloggen.addEventListener('submit', (event) =>{
    event.preventDefault();

    let email = formInloggen.email.value;
    let password = formInloggen.password.value;

    signInWithEmailAndPassword(Key,email,password).then((cred) =>{
        console.log("User logged in!", cred.user)  
        formInloggen.reset();
    })
    .catch((error)=>{
        console.log(error.message)
    })
})

onAuthStateChanged(Key, (user) =>{
    if(user){
        console.log(`Welkom ${user.email}`)
        logUitBtn.style.display = "block";
        HomeButton.style.display = "block";
    }
    else{
        console.log("User logged out!")
        logUitBtn.style.display = "none";
        HomeButton.style.display = "none";
    }
})
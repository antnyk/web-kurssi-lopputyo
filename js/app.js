let hamburgerIcon = document.querySelector('nav .mobile')
let menu = document.querySelector('nav ul')

hamburgerIcon.addEventListener('click', ()=>{
    menu.classList.toggle('show')
})
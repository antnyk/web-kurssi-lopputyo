const hamburgerIcon = document.querySelector('nav .mobile')
const menu = document.querySelector('nav ul')

hamburgerIcon.addEventListener('click', ()=>{
    menu.classList.toggle('show')
})
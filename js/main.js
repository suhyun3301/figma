const btnCall = document.querySelector('.btn-call')
const menuMo = document.querySelector('.menu-mo')

btnCall.addEventListener('click', (e) => {
  e.preventDefault
  btnCall.classList.toggle('on')
  menuMo.classList.toggle('on')
})

const form = document.querySelector('.join form')
const btnSubmit = document.querySelector(`input[type='submit']`)

btnSubmit.addEventListener('click', (e) => {
  if (!isEmail()) e.preventDefault
})

function isEmail() {
  let email = form.querySelector(`input[name='email']`)
  let check = email.value
  if (check.test(email)) {
    return true
  } else {
    return false
  }
}

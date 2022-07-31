const url = 'gallery_data.json'
const gallery = document.querySelector('.gallery')
const galleryListBlog = gallery.querySelectorAll('.gallery-list-blog')
const galleryListTips = gallery.querySelector('.gallery-list-tips')

fetch(url)
  .then((data) => {
    return data.json()
  })
  .then((source) => {
    let tips = source.tips
    let blog = source.blog

    madeItems(blog)
    madeItems(tips)

    const btnShow = gallery.querySelectorAll('a')
    btnShow.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        createSubpage(e)
      })
    })
  })

function madeItems(items) {
  let galleryItemsBlog1 = ''
  let galleryItemsBlog2 = ''
  let galleryItemsTips = ''

  items.forEach((item, i) => {
    const img = item.pic
    const title = item.title
    const desc = item.desc
    const authorImg = item.authorImg
    const author = item.author
    const authorPosition = item.position
    const date = item.date

    if (date) {
      if (i < 5) {
        galleryItemsBlog1 += `
        <article>
         <a href="">
            <div class="content-img blog">
              <img src="${img}" alt="${title} img">
            </div>
            <div class="title">
              <h2>${title}</h2>
              <p>${desc}</p>
            </div>
            <div class="author">
              <div class="pic">
                <img src="${authorImg}" alt="${author} profile img">
              </div>
              <div>
                <strong>${author}</strong>
                <span>${authorPosition}</span>
                <time>${date}</time>
              </div>
            </div>
          </a>
        </article>
       `
        galleryListBlog[0].innerHTML = galleryItemsBlog1
      } else {
        galleryItemsBlog2 += `
        <article>
         <a href="">
            <div class="content-img blog">
              <img src="${img}" alt="${title} img">
            </div>
            <div class="title">
              <h2>${title}</h2>
              <p>${desc}</p>
            </div>
            <div class="author">
              <div class="pic">
                <img src="${authorImg}" alt="${author} profile img">
              </div>
              <div>
                <strong>${author}</strong>
                <span>${authorPosition}</span>
                <time>${date}</time>
              </div>
            </div>
          </a>
        </article>
       `
        galleryListBlog[1].innerHTML = galleryItemsBlog2
      }
    } else {
      galleryItemsTips += `
      <article>
       <a href="">
          <div class="content-img">
            <img src="${img}" alt="${title} img">
          </div>
          <div class="title">
            <h2>${title}</h2>
            <p>${desc}</p>
          </div>
          <div class="author">
            <div class="pic">
              <img src="${authorImg}" alt="${author} profile img">
            </div>
            <div>
              <strong>${author}</strong>
              <span>${authorPosition}</span>
            </div>
          </div>
        </a>
      </article>
     `
      galleryListTips.innerHTML = galleryItemsTips
    }
  })
}
function createSubpage(event) {
  let content = event.target.closest('a').innerHTML
  const aside = document.createElement('aside')
  aside.classList.add('detail-page')
  aside.innerHTML = `
    <div class="wrap">
      <div class="inner">
      ${content}
      </div>
    </div>
    <span class="close">close</span>
  `
  document.body.append(aside)
}

document.body.addEventListener('click', (e) => {
  const subPage = document.querySelector('.detail-page')
  const isClose = e.target.classList.contains('close')
  if (isClose) {
    subPage.remove()
  }
})

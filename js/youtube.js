const key = 'AIzaSyAaw7SL-53OcTGSyG5hgn9LRCZlL5A-rfc'
const playlistId = 'PL_zwLMPR5YRJO52ey7QFRAEoym5jj2bkw'
const num = 14
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`

const youtube = document.querySelector('.youtube')
const videoMain = youtube.querySelector('.video-main')
const videoSecond = youtube.querySelectorAll('.video-second')
const videoList = youtube.querySelector('.video-list')

getData(url)
youtube.addEventListener('click', (e) => {
  e.preventDefault()
  if (!e.target.closest('a')) return
  madePop(e)
  console.log(e.target)
})

document.body.addEventListener('click', (e) => {
  closePop(e)
})

function getData(url) {
  let tit = []
  let desc = []
  let date = []
  let imgSrc = []
  let videoSrc = []

  fetch(url)
    .then((data) => {
      return data.json()
    })
    .then((json) => {
      const items = json.items
      items.forEach((item) => {
        tit.push(item.snippet.title)
        desc.push(item.snippet.description)
        date.push(item.snippet.publishedAt.split('T')[0])
        imgSrc.push(item.snippet.thumbnails.maxres.url)
        videoSrc.push(item.snippet.resourceId.videoId)
      })

      createMainVideo(tit, desc, date, imgSrc, videoSrc)
      createSecondVideo(tit, desc, date, imgSrc, videoSrc)
      createListVideo(tit, desc, date, imgSrc, videoSrc)
    })
}

function createMainVideo(tit, desc, date, imgSrc, videoSrc) {
  let videoMainContent = `
  <div class="text">
    <div>
      <h2>${tit[0]}</h2>
      <p>${desc[0]}</p>
    </div>
    <span>${date[0]}</span>
  </div>
  <div class="pic">
    <i class="fab fa-youtube"></i>
    <img src="${imgSrc[0]}" alt="">
  </div>
  `
  videoMain.innerHTML = videoMainContent
  videoMain.setAttribute('data-video', `${videoSrc[0]}`)
}

function createSecondVideo(tit, desc, date, imgSrc, videoSrc) {
  videoSecond.forEach((video, i) => {
    let videoContent = `
      <div class="pic">
        <img src="${imgSrc[i + 1]}" alt="">
      </div>
      <div class="text">
        <h2>${tit[i + 1]}</h2>
        <p>${desc[i + 1]}</p>
        <span>${date[i + 1]}</span>
      </div>
    `
    video.innerHTML = videoContent
    video.setAttribute('data-video', `${videoSrc[i + 1]}`)
  })
}

function createListVideo(tit, desc, date, imgSrc, videoSrc) {
  let videoContent = ''

  for (let i = 5; i < num; i++) {
    videoContent += `
      <div class="col-lg-4 col-md-6 col-sm-4">
      <a href="" class="video-list-item" href="#" data-video=${videoSrc[i]}>
        <div class="pic">
          <img src="${imgSrc[i]}" alt="">
        </div>
        <div class="text">
          <h2>${tit[i]}</h2>
          <p>${desc[i]}</p>
          <span>${date[i]}</span>
        </div>
        </a>
      </div>
    `
    videoList.innerHTML = videoContent
  }
}

function madePop(event) {
  let videoId = event.target.parentElement.getAttribute('data-vid')
  console.log(event.target.parentElement)
  let pop = document.createElement('aside')
  pop.classList.add('pop-video')
  pop.innerHTML = `
  <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen"></iframe>
  <span class="close">close</span>
  `
  document.body.append(pop)
}

function closePop(event) {
  const pop = document.querySelector('.pop-video')
  if (pop) {
    const close = pop.querySelector('span')
    if (event.target == close) pop.remove()
  }
}

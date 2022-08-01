//서울특별시 용산구 대사관로 35, 2층 매거진B / 37.533763975958934, 127.00213270002563
//서울시 금천구 한내로 62 4-902 CA매거진 /  37.45639107684719, 126.88806112439586
// 서울시 중구 동호로 272 ㈜ 디자인하우스 /  37.559293744856966, 127.00367832323184

const mapContainer = document.getElementById('map')
const mapOptions = {
  center: new kakao.maps.LatLng(37.533763975958934, 127.00213270002563),
  level: 3,
}
const map = new kakao.maps.Map(mapContainer, mapOptions)
const mapTypeControl = new kakao.maps.MapTypeControl()
const zoomControl = new kakao.maps.ZoomControl()
const btnsLocation = document.querySelectorAll('.location-list li')
const infoList = document.querySelectorAll('.info-list dl')
const positions = [
  {
    title: '매거진 B',
    latlng: new kakao.maps.LatLng(37.533763975958934, 127.00213270002563),
    button: btnsLocation[0],
    imageOption: { offset: new kakao.maps.Point(20, 48) },
  },
  {
    title: 'CA매거진',
    latlng: new kakao.maps.LatLng(37.45639107684719, 126.88806112439586),
    button: btnsLocation[1],
    imageOption: { offset: new kakao.maps.Point(13, 28) },
  },
  {
    title: '디자인하우스',
    latlng: new kakao.maps.LatLng(37.559293744856966, 127.00367832323184),
    button: btnsLocation[2],
    imageOption: { offset: new kakao.maps.Point(20, 33) },
  },
]

var imageSrc = 'img/marker.png'

for (var i = 0; i < positions.length; i++) {
  const imageSize = new kakao.maps.Size(30, 'auto')
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    positions[i].imageOption
  )

  var marker = new kakao.maps.Marker({
    map: map,
    position: positions[i].latlng,
    title: positions[i].title,
    image: markerImage,
  })

  btnsLocation.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()

      classOn(btnsLocation, i)
      classOn(infoList, i)

      map.setCenter(positions[i].latlng)
    })
  })
}

window.addEventListener('resize', (e) => {
  const active = document.querySelector('.location-list li.on')
  const btns = Array.from(btnsLocation)
  const index = btns.indexOf(active)
  map.setCenter(positions[index].latlng)
})

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT)
map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT)

function classOn(list, i) {
  for (let item of list) {
    item.classList.remove('on')
  }
  list[i].classList.add('on')
}

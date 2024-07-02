'use strict'

const nav = document.querySelector('nav')
const navList = document.querySelector('.nav-list')
const subnavList = document.querySelector('.subnav-list')
const subnavItems = document.querySelectorAll('.subnav-item')
const dataImg = document.querySelector('.data-img')
const dataDescription = document.querySelector('.data-description')

const BASE_URL = '../jsons/data.json'
let isShow = false

const replaceData = function (img, content) {
	dataImg.innerHTML = img
	dataDescription.innerHTML = content
}

const displayDestination = function (data) {
	const img = `<img src="${data.images.png}" alt="${data.name}">`
	const content = `
    <h1 class="subtitle upper">${data.name}</h1>
    <p class="content barlow purple">${data.description}</p>
    <div class="planet-data upper">
			<div class="distance">
      	<p class="subheading barlow purple">Avg. distance</p>
      	<p class="subcontent">${data.distance}</p>
    	</div>
    	<div class="travel">
      	<p class="subheading barlow purple">Est. travel time</p>
      	<p class="subcontent">${data.travel}</p>
			</div>
    </div>
	`
	replaceData(img, content)
}

const displayCrew = function (data) {
	const img = `<img src="${data.images.png}" alt="${data.name}">`
	const content = `
    <h2 class="subheading upper">${data.role}</h2>
    <h1 class="heading upper">${data.name}</h1>
    <p class="content barlow purple">${data.bio}</p>
	`
	replaceData(img, content)
}

const dispalyTechnology = function (data) {
	const img = `<img src="${data.images.portrait}" alt="${data.name}">`

	const content = `
	  <h1 class="heading upper">
      <span class="block small-title purple">The terminology...</span>
      ${data.name}
    </h1>
    <p class="content barlow purple">${data.description}</p>
	`

	replaceData(img, content)
}

const getData = async function (dataGroup, dataName) {
	try {
		const res = await fetch(BASE_URL)
		if (!res.ok) throw new Error('Something went wrong')
		const data = await res.json()
		if (!data) throw new Error('Data not found')

		const group = data[dataGroup]
		const activeData = group.filter((g) => g.name === dataName)

		if (dataGroup === 'destinations') displayDestination(...activeData)
		if (dataGroup === 'crew') displayCrew(...activeData)
		if (dataGroup === 'technology') dispalyTechnology(...activeData)
	} catch (err) {
		console.error(err)
	}
}

nav.addEventListener('click', (e) => {
	const btn = e.target.closest('.nav-btn')
	if (!btn) return

	if (isShow) {
		navList.classList.add('fade-out')
		navList.classList.remove('fade-in')
		navList.style.display = 'none'
	} else {
		navList.classList.add('fade-in')
		navList.classList.remove('fade-out')
		navList.style.display = 'flex'
	}
	isShow = !isShow
})

subnavList?.addEventListener('click', (e) => {
	const page = e.target.closest('.subnav-item')
	if (!page) return

	const name = page.dataset.name
	const group = page.dataset.group

	getData(group, name)

	subnavItems.forEach((item) => item.classList.remove(`active-${group}`))
	page.classList.add(`active-${group}`)
})

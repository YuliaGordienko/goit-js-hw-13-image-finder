import NewFindingsApi  from '/apiService.js';
import './sass/main.scss';
import makeOneImageNbs from './templates/image-card.hbs'
const listForImages = document.querySelector('.gallery')

const formSearch = document.getElementById('search-form');

const btnLoadMore = document.querySelector('.load-more');


btnLoadMore.classList.add('is-hidden')

formSearch.addEventListener('submit', onSearch)
const newFindingsApi = new NewFindingsApi()

function onSearch(event) {
    event.preventDefault();
    newFindingsApi.query = event.currentTarget.elements.query.value
    newFindingsApi.resetPage()
    clearGallery()
    newFindingsApi.fetchArticles().then(randerImages)
   btnLoadMore.classList.remove('is-hidden')
 
}


btnLoadMore.addEventListener('click', onLoadMore)
function onLoadMore(event) {
    newFindingsApi.fetchArticles().then(hits => {
        randerImages(hits);
        const element = document.getElementById('btn-load-more')
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    })
    
    
}

function randerImages(hits) {
    
    listForImages.insertAdjacentHTML('beforeend', makeOneImageNbs(hits))
}
function clearGallery() {
    listForImages.innerHTML = '';
 }
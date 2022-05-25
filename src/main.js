// const axios = require('axios').default;
// import axios from "axios";
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  "Content-Type": "application/json;chartset=utf-8",
  params: {
    api_key: "a6eb2eae3c9a0f7d73200947932b5497",
  }
})

async function createMovie(movies, container) {
  container.innerHTML = ''

  movies.forEach(movie => {
    // const trendingMoviesPreviewList = $("#trendingPreview .trendingPreview-movieList")
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie-container')
    const movieImg = document.createElement('img')
    movieImg.classList.add('movie-img')
    movieImg.alt = movie.title
    movieImg.src = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    movieContainer.appendChild(movieImg)
    container.appendChild(movieContainer)
  });
}

async function createCategory(categories, container) {
  container.innerHTML = ''

  categories.forEach(category => {
    const categoryContainer = document.createElement('div')
    categoryContainer.classList.add('category-container')
    const categoryTitle = document.createElement('h3')
    categoryTitle.classList.add('category-title')
    categoryTitle.id = "id" + category.id
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`
    })
    const categoryTitleText = document.createTextNode(category.name)
    // const categoryTitleText = document.textContent(category.name)
    categoryTitle.appendChild(categoryTitleText)
    categoryContainer.appendChild(categoryTitle)
    container.appendChild(categoryContainer)
  });
}

async function getTrendingMoviesPreview() {
  const { data } = await api("/trending/movie/day")
  const movies = data.results

  createMovie(movies, trendingMoviesPreviewList)
}

async function getCategegoriesPreview() {
  const { data} = await api(`/genre/movie/list`)
  const categories = data.genres

  createCategory(categories, categoriesPreviewList)
}

async function getMoviesByCategory(id) {
  const { data } = await api("/discover/movie", {
    params: {
      with_genres: id,
    },
  })
  const movies = data.results

  createMovie(movies, genericSection)
}

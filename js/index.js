// javascript for index.html

const container = document.querySelector('div.blogs');
const searchForm = document.querySelector('.search');

const renderPosts = async (term) => {

  // _sort=likes: order by likes
  // _order=desc: reverse order

  let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';

  if (term) {
    uri += `&q=${term}`
  }

  const response = await fetch(uri);
  const posts = await response.json();

  let template = '';
  posts.forEach(post => {
    template += `
      <div class="post">
        <h2>${post.title}</h2>
        <p><small>${post.likes} likes</small></p>
        <p>${post.body.slice(0, 200)}</p>
        <a href="details.html?id=${post.id}">read more...</a>
      </div>
    `
  })

  container.innerHTML = template;

};

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPosts(searchForm.term.value);
})
window.addEventListener('DOMContentLoaded', () => renderPosts());
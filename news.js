$(document).ready(function () {

  const apiKey = 'pub_194458f4ec695a264a5919a9654a5e1b2a2cb';
  const query = 'cyber-attacks';
  const url = `https://newsdata.io/api/1/news?apikey=pub_194458f4ec695a264a5919a9654a5e1b2a2cb&q=Cyber%20Attacks `;

  axios.get(url)
    .then(response => {
      const articles = response.data.results;

      console.log(response)

      articles.forEach(article => {
        const { title, description, image_url } = article;

        if (description && description.split(' ').length > 100) {
          return;
        }

        if (title.toLowerCase().includes("live updates") || title.toLowerCase().includes("live update")) {
          return;
        }

        let articleMarkup = `
          <div class="card mb-2">
            <div class="row no-gutters">
        `;

        if (image_url !== null) {
          articleMarkup += `
              <div class="col-md-4">
                <img src="${image_url}" class="card-img" alt="${title}">
              </div>
          `;
        }

        articleMarkup += `
              <div class="col-md-8">
                <div class="card-body">
                  <h4 class="card-title">${title}</h4>
        `;

        if (description !== null) {
          articleMarkup += `
                  <p class="card-text">${description}</p>
          `;
        }

        articleMarkup += `
        <a href="${article.link}" class="btn btn-primary" target="_blank">Read More</a>
        </div>
              </div>
            </div>
          </div>
        `;

        $('#news-container').append(articleMarkup);
      });
    })
    .catch(error => {
      console.error(error);
    });
});

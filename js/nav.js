document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  let page = window.location.hash.substr(1);

  if (page === '') page = 'all';

  const loadPage = (pages) => {
    // fetch('pages/' + page + '.html');
    fetch(`pages/${pages}.html`)
      .then((response) => {
        const responseText = response.text();
        return responseText;
      })
      .then((html) => {
        const content = document.querySelector('#body-content');
        content.innerHTML = html;
      });
  };
  loadPage(page);

  const loadNav = () => {
    fetch('nav.html')
      .then((response) => {
        // console.log(response.status);
        const responseText = response.text();
        // if (response.status !== 200) return response.status;
        return responseText;
        // console.log(response.text());
      })
      .then((html) => {
        document.querySelectorAll('.topnav, .sidenav').forEach((elm) => {
          const navLink = elm;
          navLink.innerHTML = html;
        });

        document.querySelectorAll('.sidenav a, .topnav a').forEach((elm) => {
          elm.addEventListener('click', (e) => {
            const sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            page = e.target.getAttribute('href').substr(1);
            loadPage(page);
          });
        });
      });
  };
  loadNav();
});

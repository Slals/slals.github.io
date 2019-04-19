document.addEventListener("scroll", function (evt) {
  const top = document.documentElement.scrollTop;
  const nav = document.querySelector('#nav');
  if (top > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

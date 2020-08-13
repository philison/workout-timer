export { insertHTML };

const insertHTML = function (html) {
  let pageContainer = document.querySelector('#page-container');
  //console.log(pageContainer.innerHTML);
  pageContainer.innerHTML = '';
  pageContainer.innerHTML = html;
};

const searchWrapper = document.querySelector('.search');
const inputBox = searchWrapper.querySelector('input');
const sugestBox = searchWrapper.querySelector('.list');
const icon = searchWrapper.querySelector('.icon');
let linkTag = searchWrapper.querySelector('a');
let webLink;

inputBox.onkeyup = (e) => {
  let userData = e.target.value;
  let emptyArray = [];

  if (e.key === 'Enter') {
    if (userData) {
      window.open(`https://www.google.com/search?q=${userData}`, '_blank');
    }
  }

  if (userData) {
    icon.onclick = () => {
      webLink = `https://www.google.com/search?q=${userData}`;
      linkTag.setAttribute('href', webLink);
      linkTag.click();
    };

    emptyArray = sugestoes.filter((data) =>
      data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())
    );

    emptyArray = emptyArray.map((data) => `<li>${data}</li>`);

    searchWrapper.classList.add('active');
    ShowSuggestions(emptyArray);
    let allList = sugestBox.querySelectorAll('li');
    for (let i = 0; i < allList.length; i++) {
      allList[i].setAttribute('onclick', 'select(this)');
    }
  } else {
    searchWrapper.classList.remove('active');
  }
};

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    searchWrapper.classList.remove('active');
  }
});

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = () => {
    webLink = `https://www.google.com/search?q=${selectData}`;
    linkTag.setAttribute('href', webLink);
    linkTag.click();
  };

  searchWrapper.classList.remove('active');
}

function ShowSuggestions(list) {
  let listData;
  if (!list.length) {
    listData = `<li>${inputBox.value}</li>`;
  } else {
    listData = list.join('');
  }

  sugestBox.innerHTML = listData;
}

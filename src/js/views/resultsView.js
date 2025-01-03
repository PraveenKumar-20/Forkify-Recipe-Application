import View from './View';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again :)';
  _Message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupView).join('');
  }

  _generateMarkupView(result) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated ${
                  result.key ? '' : 'hidden'
                }">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultsView();

import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(direction, curPage) {
    return `
      <button data-goto ="${
        direction === 'prev' ? curPage - 1 : curPage + 1
      }" class="btn--inline pagination__btn--${direction}}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      direction === 'prev' ? 'left' : 'right'
    }"></use>
            </svg>
            <span>Page ${
              direction === 'prev' ? curPage - 1 : curPage + 1
            }</span>
          </button>
      `;
  }

  _generatePageNumbers() {
    return `
    <div class="pagination-page_display">
    <span>${this._data.page}/${Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    )}</span>
</div>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `${
        this._generateMarkupButton('next', curPage) +
        this._generatePageNumbers()
      }`;
    }

    //Last Page
    if (curPage === numPages && numPages > 1) {
      return `${
        this._generateMarkupButton('prev', curPage) +
        this._generatePageNumbers()
      }`;
    }
    //Other Page
    if (curPage < numPages) {
      return `
      ${
        this._generateMarkupButton('prev', curPage) +
        this._generatePageNumbers() +
        this._generateMarkupButton('next', curPage)
      }
      `;
    }

    //Page 1, and there are NO pages
    return '';
  }
}
export default new PaginationView();

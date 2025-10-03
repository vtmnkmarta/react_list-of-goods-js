import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FILED_ALPHABETYCALY = 'alphabetically';
const SORT_FILED_LENGTH = 'length';

function getPreparedGoods(goods, { sortFiled, reversed }) {
  let preparedGoods = [...goods];

  if (sortFiled) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFiled) {
        case SORT_FILED_ALPHABETYCALY:
          return good1.localeCompare(good2);

        case SORT_FILED_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortFiled, setSortFiled] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibileGoods = getPreparedGoods(goodsFromServer, {
    sortFiled,
    reversed,
  });

  const handleReset = () => {
    setSortFiled('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortFiled(SORT_FILED_ALPHABETYCALY)}
          className={cn('button', 'is-info', {
            'is-light': sortFiled !== SORT_FILED_ALPHABETYCALY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortFiled(SORT_FILED_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortFiled !== SORT_FILED_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button', 'is-is-warning', {
            'is-light': reversed === false,
          })}
        >
          Reverse
        </button>

        {(sortFiled !== '' || reversed !== false) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibileGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

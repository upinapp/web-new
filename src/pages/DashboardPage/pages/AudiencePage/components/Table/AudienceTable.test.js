import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import AudienceTable from './AudienceTable';
import { store } from '../../../../../../utils/index';

configure({ adapter: new Adapter() });

const audienceByDateFromStore = store.getState()['audienceByDate'];

let renderedComponent;
const classes = {};
beforeEach(() => {
  // рендерим компонент
  renderedComponent = mount(
    <AudienceTable data={audienceByDateFromStore}/>
  );

  // получаем его коллекцию классов
  for (let key in renderedComponent.find('AudienceTable').props().classes) {
    classes[key] = '.' + renderedComponent.find('AudienceTable').props().classes[key];
  }
});

function transformArray(audienceByDate) {
  let allDataToPeriod = {
    users: 0,
    newUsers: 0,
    session: 0,
  };
  audienceByDate.forEach(item => {
    allDataToPeriod.users += item.users;
    allDataToPeriod.newUsers += item.newUsers;
    allDataToPeriod.session += item.session;
  });
  return allDataToPeriod;
}

describe('Table:', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <AudienceTable data={audienceByDateFromStore}/>
      </Provider>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // проверки на присутствие нужных элементов
  it('Component should have a title', () => {
    expect(renderedComponent.find(classes.tableTitle).length).to.equal(1);
  });

  it('Component should have a table', () => {
    expect(renderedComponent.find('Table' + classes.table).length).to.equal(1);
  });

  // проверка правильности выводимых значений
  it('TableCell contain the correct values', () => {
    let iteratorOfRow = -1; // чтоб потом не отнимать каждый раз единичку

    // перебираем всте строчки таблицы
    renderedComponent.find('TableBody').find('TableRow').forEach((row) => {

      // if нужен, т к первая строка в таблице отображает суммарные значения
      if (iteratorOfRow !== -1) {
        let iteratorOfColumn = 0;

        expect(row.find('TableCell > th').contains(audienceByDateFromStore[iteratorOfRow].date)).to.equal(true);

        row.find('td').forEach(cell => {
          switch (iteratorOfColumn) {
            case 3:
              expect(cell.contains(audienceByDateFromStore[iteratorOfRow].users)).to.equal(true);
              break;
            case 4:
              expect(cell.contains(audienceByDateFromStore[iteratorOfRow].newUsers)).to.equal(true);
              break;
            case 5:
              expect(cell.contains(audienceByDateFromStore[iteratorOfRow].session)).to.equal(true);
              break;
            default:
              break;
          }
          iteratorOfColumn++;
        });

      } else {
        let iteratorOfColumn = 0;
        let sumAllUser = transformArray(audienceByDateFromStore);

        expect(row.find('TableCell > th').contains('Всего')).to.equal(true);

        row.find('td').forEach(cell => {
          switch (iteratorOfColumn) {
            case 3:
              expect(cell.contains(sumAllUser.users)).to.equal(true);
              break;
            case 4:
              expect(cell.contains(sumAllUser.newUsers)).to.equal(true);
              break;
            case 5:
              expect(cell.contains(sumAllUser.session)).to.equal(true);
              break;
            default:
              break;
          }
          iteratorOfColumn++;
        });
      }
      iteratorOfRow++;
    });
  });

});

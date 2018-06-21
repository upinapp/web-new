export const RETENTION = [
  {
    date: new Date(),
    retention: [
      { percent: '100', number: '1000', holiday: false},
      { percent: '60', number: '600', holiday: false},
      { percent: '55', number: '550', holiday: false},
      { percent: '50', number: '500', holiday: true},
      { percent: '45', number: '450', holiday: true},
      { percent: '40', number: '400', holiday: false},
      { percent: '35', number: '350', holiday: false},
      { percent: '30', number: '300', holiday: false},
      { percent: '25', number: '250', holiday: false},
      { percent: '20', number: '200', holiday: false},
      { percent: '15', number: '150', holiday: true},
      { percent: '10', number: '100', holiday: true},
      { percent: '5', number: '50', holiday: false},
      { percent: '1', number: '10', holiday: false},
    ]
  },
  {
    date: new Date().setDate(new Date().getDate() - 1),
    retention: [
      { percent: '100', number: '1000', holiday: false},
      { percent: '60', number: '600', holiday: false},
      { percent: '55', number: '550', holiday: true},
      { percent: '50', number: '500', holiday: true},
      { percent: '45', number: '450', holiday: false},
      { percent: '40', number: '400', holiday: false},
      { percent: '35', number: '350', holiday: false},
      { percent: '30', number: '300', holiday: false},
      { percent: '25', number: '250', holiday: false},
      { percent: '20', number: '200', holiday: true},
      { percent: '15', number: '150', holiday: true},
      { percent: '10', number: '100', holiday: false},
      { percent: '5', number: '50', holiday: false},
      { percent: '1', number: '10', holiday: false},
    ]
  },
  {
    date: new Date().setDate(new Date().getDate() - 2),
    retention: [
      { percent: '100', number: '1000', holiday: false},
      { percent: '60', number: '600', holiday: true},
      { percent: '55', number: '550', holiday: true},
      { percent: '50', number: '500', holiday: false},
      { percent: '45', number: '450', holiday: false},
      { percent: '40', number: '400', holiday: false},
      { percent: '35', number: '350', holiday: false},
      { percent: '30', number: '300', holiday: false},
      { percent: '25', number: '250', holiday: true},
      { percent: '20', number: '200', holiday: true},
      { percent: '15', number: '150', holiday: false},
      { percent: '10', number: '100', holiday: false},
      { percent: '5', number: '50', holiday: false},
      { percent: '1', number: '10', holiday: false},
    ]
  },
  {
    date: new Date().setDate(new Date().getDate() - 3),
    retention: [
      { percent: '100', number: '1000', holiday: true},
      { percent: '60', number: '600', holiday: true},
      { percent: '55', number: '550', holiday: false},
      { percent: '50', number: '500', holiday: false},
      { percent: '45', number: '450', holiday: false},
      { percent: '40', number: '400', holiday: false},
      { percent: '35', number: '350', holiday: false},
      { percent: '30', number: '300', holiday: true},
      { percent: '25', number: '250', holiday: true},
      { percent: '20', number: '200', holiday: false},
      { percent: '15', number: '150', holiday: false},
      { percent: '10', number: '100', holiday: false},
      { percent: '5', number: '50', holiday: false},
      { percent: '1', number: '10', holiday: false},
    ]
  },
];

export const MOCK_ALL = new Array(13).fill(1);

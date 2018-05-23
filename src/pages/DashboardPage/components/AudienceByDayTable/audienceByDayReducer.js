import {fromJS} from 'immutable';


// Initial routing state
const audienceByDayState = fromJS([
	{
		date: '22 марта',
		users: 1,
		newUsers: 7,
		session: 4,
	},
	{
		date: '23 марта',
		users: 2,
		newUsers: 3,
		session: 9,
	},
	{
		date: '24 марта',
		users: 3,
		newUsers: 4,
		session: 8,
	},
]);

/**
 * Merge route into the global application state
 */
export function audienceByDateReducer(state = audienceByDayState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
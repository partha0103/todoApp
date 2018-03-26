function createStore(reducer) {
	let state;
	let listeners= [];

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter((l) => listener !== l)
		}
	}

	const getState = () => state

	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach((listener) => listener())
	}

	return{
		getState,
		subscribe,
		dispatch
	}
}

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function todos(state = [], action){
	if(action.type === ADD_TODO){
		return state.concat([action.todo]);
	}
	else if(action.type === REMOVE_TODO){
		return state.filter((todo) => todo.id !== action.id)
	}
	else if(action.type === TOGGLE_TODO){
		return state.map((todo) => todo.id !== action.id ? todo : 
			Object.assign({}, todo, {complete: !todo.complete}))
	}
	else{
		return state;
	}
}

function goals(state = [], action){
	switch(action.type){
		case ADD_GOAL:
			return state.concat([action.goal])
		case REMOVE_GOAL:
			return state.filter((goal) => goal.id !== action.id)
		default:
			return state;
	}
}

function app(state = {}, action){
	return {
		todos: todos(state.todos, action),
		goals: goals(state.goals, action)
	}
}

function addTodoAction(todo){
	return{
		type: 'ADD_TODO',
		todo
	}
}
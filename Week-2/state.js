export let state = {
    employees: [
        { id: 1, name: "John", score: 70, present: true },
        { id: 2, name: "Sara", score: 85, present: false }
    ],
    allEmployees: []
};

state.allEmployees = [...state.employees];

let listeners = [];
export function subscribe(listener) {
    listeners.push(listener);
}

export function setState(newState) {
    const nextState = { ...state, ...newState };
    if (newState.employees && !Object.prototype.hasOwnProperty.call(newState, "allEmployees")) {
        nextState.allEmployees = state.allEmployees;
    }
    state = nextState;
    listeners.forEach(l => l());
}
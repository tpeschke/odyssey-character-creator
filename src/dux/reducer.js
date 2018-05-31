const initialState = {
    bp: 40,
    species: null,
    scores: [{id: 1, title: 'STR', score: '13.4'}, {id: 2, title: 'INT', score: '8.56'},{id: 3, title: 'WIS', score: '10.05'},{id: 4, title: 'DEX', score: '13.6'},{id: 5, title: 'CON', score: '6.75'},{id: 6, title: 'CHA', score: '6.76'}, {id: 7, title: 'LKS', score: '18.89'}],
    background: null
}

const SET_BACKGROUND = 'SET_BACKGROUND'
    , SET_BP = "SET_BP"
    , SET_SPECIES = "SET_SPECIES"
    , SET_SCORES = 'SET_SCORES'
    , ADD_BP = "ADD_BP"
    , DEDUCT_BP = "DEDUCT_BP"

export function SETBACKGROUND (background) {
        return {
            type: SET_BACKGROUND,
            payload: background
        }
    }
    
export function SETBP (amount) {
    return {
        type: SET_BP,
        payload: amount
    }
}

export function SETSPECIES (alien) {
    return {
        type: SET_SPECIES,
        payload: alien
    }
}

export function SETSCORES (scores) {
    return {
        type: SET_SCORES,
        payload: scores
    }
} 

export function DEDUCTBP (amount) {
    return {
        type: DEDUCT_BP,
        payload: amount
    }
}

export function ADDBP (amount) {
    return {
        type: ADD_BP,
        payload: amount
    }
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_BACKGROUND:
            return Object.assign({}, state, {background: action.payload})
        case SET_BP: 
            return Object.assign({}, state, {bp: action.payload})
        case SET_SPECIES:
            return Object.assign({}, state, {species: action.payload})
        case SET_SCORES:
            return Object.assign({}, state, {scores: action.payload})
        case DEDUCT_BP:
            return Object.assign({}, state, {bp: state.bp - action.payload})
        case ADD_BP:
            return Object.assign({}, state, {bp: state.bp + action.payload})
        default: return state
    }
}
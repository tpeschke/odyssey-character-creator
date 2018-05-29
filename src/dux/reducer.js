const initialState = {
    bp: null
}

const SET_BP = "SET_BP"


export function SETBP () {
    return {
        type: SET_BP
    }
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_BP: 
            return Object.assign({}, state, {bp: 40})
        default: return state
    }
}
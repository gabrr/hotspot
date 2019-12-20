const INITIAL_STATE = {
    hotspots: []
}

const ReducerSpotCreator = (state = INITIAL_STATE, action) => {
    const id = action.id
    switch (action.type) {
        case "CREATING_SPOT":
            return { hotspots: [...state.hotspots, ...action.hotspots] };
        case "DELETING_SPOT":
            const newState = [...state.hotspots.slice(0, id), ...state.hotspots.slice(id + 1)]
            return { hotspots: [...newState] }
        default:
            return state
    }
}

export default ReducerSpotCreator
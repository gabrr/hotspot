const spotUpdater = (id, field, value, ) => {
    return {
        type: "UPDATING_SPOT",
        id,
        field,
        value
    }
}

export default spotUpdater
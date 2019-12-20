const spotCreator = (title, body, x, y, id) => {
    return {
        type: "CREATING_SPOT",
        hotspots: [{
            title,
            body,
            x,
            y,
            id
        }]
    }
}

export default spotCreator
const spotCreator = (hotspots) => {
    return {
        type: "CREATING_SPOT",
        hotspots: [...hotspots]
    }
}

export default spotCreator
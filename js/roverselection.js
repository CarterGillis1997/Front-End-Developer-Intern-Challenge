function loadRoverInfo() {
    let rov = ["curiosity", "opportunity", "spirit"]
    for (let i = 0; i < 3; i++) {
        fetch("https://api.nasa.gov/mars-photos/api/v1/manifests/" + rov[i] + "?api_key=LOYVbItd9baLQ2ROFdMaZKF9ZWdFpEXazdCzM62z")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                $("#" + rov[i] + "U").append($("<li>Launch date: " + data.photo_manifest.launch_date + "</li>"), $("<li>Landing Date: " + data.photo_manifest.landing_date + "</li>"), $("<li>Status: " + data.photo_manifest.status + "</li>"))
            })
    }
}

function goToSelectedRover(thisOne) {
    roverF = thisOne.title
    $("#roverSelScreen").remove()
    runPage()
}
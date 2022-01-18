fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=DEMO_KEY")
.then((resp) => resp.json())
.then(function(data){
    console.log(data)
    for(let i = 0;i<data.photos.length;i++){
    let img = $("<img>").attr("src",data.photos[i].img_src)
    $("#main").append(img)
    }
})
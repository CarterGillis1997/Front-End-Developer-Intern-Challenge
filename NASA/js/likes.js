//https://api.nasa.gov/EPIC/archive/natural/
function runPage(){
    if(localStorage.key(0) !== null){
    for(let i = 0; i<localStorage.length;i++){
let v = JSON.parse(localStorage.getItem(localStorage.key(i)))
console.log(v)
let imgDiv = $("<div></div>")
$(imgDiv).addClass("imgContainers")
let cap = $("<p class='capText'></p>").text(v.rover + " - " + v.camera.slice(0,v.camera.indexOf(":")))
let cap2 = $("<p class='capText'></p>").text("[" + v.imgDate + "]")
let info = $("<p class='info'></p>").text(JSON.stringify(v))
let image = $("<img class='spaceImg'>").attr("src",v.imgSrc)
$(image).addClass("spaceWidth")
$(imgDiv).append(image, cap , cap2, info)
$(imgDiv).attr("onclick","openImage(this)")
$('#main').append(imgDiv)
}
    }
    else{
        let likesText = $("<p></p>").text("No liked images :(")
        let likeImg = $("<img>").attr("src","assets/NoLikes.png")
        $(likeImg).addClass("noLikesImg")
        $(likesText).addClass("noLikes")
        $("#main").append(likeImg)
        $("#main").append(likesText)
    }
}
var active = ""
  function openImage(sourceImg){
        active = sourceImg
    document.getElementById("imageScreen").style.display = "block"
    let newImageContainer = $(sourceImg).clone()
    let newImage = $(newImageContainer).children()[0]
    let newCap = $(newImageContainer).children()[1]
    console.log(JSON.parse(localStorage.getItem(localStorage.key(0))))
    if(localStorage.key(0) !== null){
        for(let q = 0; q<localStorage.length;q++){
             let v = JSON.parse(localStorage.getItem(localStorage.key(q)))
             console.log($(active).children()[3])
             let z = JSON.parse($(active).children()[3].innerHTML)
             console.log(z)
             console.log(v.imgSrc +" : "+ z.img_src)
            // console.log(v.imgName + " : " + $(active).children()[0].src.slice($(active).children()[0].src.indexOf("/png/") + 5,$(active).children()[0].src.indexOf("?api_key")))
                 var likeButton = $('<button onclick="unlike(this)" class="likeButton"></button>').text('Unlike')
    }
}
else{
    console.log("qwuibnbqugbino")
    var likeButton = $('<button onclick="like()" class="likeButton"></button>').text('Like')
}
    $(newImageContainer).removeAttr("onclick")
    $(newImageContainer).removeClass("imgContainers")
    $(newImageContainer).addClass("imageContainer")
    $(newImage).removeClass("spaceWidth")
    $(newCap).removeClass("capText")
    $(newCap).addClass("newCap")
    $(newImageContainer).attr("id","removeMe")
    $(newImageContainer).append(likeButton)
    $('#imageScreen').append(newImageContainer)
    let qp = $('<div id="test"></div>')
    $(qp.attr("onclick","closeScreen()"))
    $('#imageScreen').append(qp)
}
var a = ["1","2","3","4","5","6","7","8","9","0"]
var b = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var id = []
function like(button){
    console.log(button)
    $(button).addClass("likeAnim")
    button.addEventListener('animationend', () => {
        $(button).removeClass("likeAnim")
    });
    console.log($(active).children()[3])
    let info = JSON.parse($(active).children()[3].innerHTML)
    save = {
        'imgDate': info.earth_date,
        'rover': info.rover.name,
        'imgSrc': info.img_src,
        'camera': info.camera.name + ":" + info.camera.full_name,
        'roverLandD': info.rover.landing_date,
        'roverLaunchD' : info.rover.launch_date
    }
    console.log(save)
    for(let g = 0; g<2;g++){
    for(let i = 0; i<21;i++){
        let p = Math.floor(Math.random()*10)
        if(p < 5){
            max = 25;
        }
        else{
            max = 9
        }
        min = Math.ceil(0);
        console.log(max)
    let qSelections = Math.floor(Math.random()* (max - min + 1) + min);
    if(max == 25){
        id.push(b[qSelections])
        console.log(b[qSelections])
    }
    else{
        id.push(a[qSelections])
        console.log(a[qSelections])
    }
    console.log(id)
    }
    id = id.toString()
    id = id.replace(/,/g,'') 
    console.log(id)
    for(let k = 0; k < localStorage.key.length;k++){
        if(id == localStorage.key(k)){
            g = 0
        }
        else{
            g = 50
        }
    }
}
    $(button).text("Unlike")
    $(button).attr("onclick","unlike(this)")
    localStorage.setItem(id, JSON.stringify(save))
    console.log(localStorage.key(0))
}

function closeScreen(){
    console.log("hello")
    id = []
    active = ""
    $("#imageScreen").empty()
    $("#imageScreen").hide()
}

function unlike(button){
    for(let i = 0; i<localStorage.length;i++){
        let aObj = JSON.parse($(button).parent().children()[3].innerHTML)
        let obj = JSON.parse(localStorage.getItem(localStorage.key(i)))
        console.log(obj.imgSrc + " : " + aObj.img_src)
        if(obj.imgSrc == aObj.imgSrc){
            console.log("at: " + i)
            localStorage.removeItem(localStorage.key(i))
            $(button).attr("onclick","like(this)")
            $(button).text("Like")
            id = []
            break
        }
    }
    closeScreen()
    $("#main").empty()
    runPage()
}
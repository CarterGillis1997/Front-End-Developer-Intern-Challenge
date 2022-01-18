//api call "natural/yyyy/mm/dd/png/image?api_Key="
var page=1
function nextPage(){
    $("#main").empty()
    page++
    if(page > 3){
    reorderNums()
    }
    $(".activePage").removeClass("activePage")

    runPage()
}
function lastPage(){
    $("#main").empty()
    page-= 1
    if(page > 3){
        reorderNums()
        }
    $(".activePage").removeClass("activePage")
    runPage()
}
function goToPage(pageNum){
    $("#main").empty()
    page = pageNum.innerHTML
    console.log(page)
    if(pageNum.innerHTML > 3){
    reorderNums(page)
    }
    $(".activePage").removeClass("activePage")
    runPage()
}
function reorderNums(activePage){
    let nums = $(".pageNumber")
    console.log((activePage))
    nums[0].innerHTML = parseInt((activePage)) -2
    nums[1].innerHTML = parseInt((activePage)) -1
    nums[2].innerHTML = parseInt((activePage))
    nums[3].innerHTML = parseInt((activePage)) +1
    nums[4].innerHTML = parseInt((activePage)) +2
}
var rov = ["curiosity","opportunity","spirit"]
function roverSelect(){
    for(let i = 0;i<3;i++){
    fetch("https://api.nasa.gov/mars-photos/api/v1/manifests/"+ rov[i] +"?api_key=LOYVbItd9baLQ2ROFdMaZKF9ZWdFpEXazdCzM62z")
    .then((resp)=>resp.json())
    .then((data)=>{
        console.log(data)
        $("#" + rov[i] + "U").append($("<li>Launch date: "+ data.photo_manifest.launch_date +"</li>") ,$("<li>Landing Date: " + data.photo_manifest.landing_date+ "</li>"), $("<li>Status: "+ data.photo_manifest.status +"</li>"))
    })
}
}
function rovSel(thisOne){
    roverF = thisOne.title
    $("#roverSelScreen").remove()
    runPage()
}
var link = "https://api.nasa.gov/mars-photos/api/v1/rovers/"
var roverF = "curiosity"
var photosF = "/photos"
var dateF = "sol=1000"
var cameraF = ""
var pageF = "&page="
var key = "&api_key=LOYVbItd9baLQ2ROFdMaZKF9ZWdFpEXazdCzM62z"
function runPage(){
    for(let i = 0; i <5;i++){
        if($(".pageNumber")[i].innerHTML == page.toString()){
            $(".pageNumber")[i].className = "pageNumber activePage"
        }
    }
    console.log(link + roverF + photosF + "?" + dateF + cameraF + pageF + page + key)
    //"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2012-08-06&page=1&api_key=DEMO_KEY" 
fetch( link + roverF + photosF + "?" + dateF + cameraF + pageF + page + key)
.then((resp) => resp.json())
.then(function(data){
    if(data.photos !== undefined){
    console.log(data.photos)
    for(let i = 0; i<data.photos.length;i++){
        // let year = data[i].date.slice(0,4)
        // let month = data[i].date.slice(5,7)
        // let day = data[i].date.slice(8,10)
        let imgDiv = $("<div></div>")
        $(imgDiv).addClass("imgContainers")
         let cap = $("<p class='capText'></p>").text(data.photos[i].rover.name + " - " + data.photos[i].camera.name)
         let cap2 = $("<p class='capText'></p>").text("[" + data.photos[i].earth_date + "]" + " Sol:" + data.photos[i].sol)
         let info = $("<p class='info'></p>").text(JSON.stringify(data.photos[i]))
    let image = $("<img class='spaceImg'>").attr("src",data.photos[i].img_src   /*api_key=LOYVbItd9baLQ2ROFdMaZKF9ZWdFpEXazdCzM62z*/)
    $(image).addClass("spaceWidth")
    $(imgDiv).append(image, cap,cap2,info)
    $(imgDiv).attr("onclick","openImage(this)")
    $('#main').append(imgDiv)
    }
}
else{
    let likesText = $("<p></p>").text("No images :(")
    let likeImg = $("<img>").attr("src","assets/NoLikes.png")
    $(likeImg).addClass("noLikesImg")
    $(likesText).addClass("noLikes")
    $("#main").append(likeImg)
    $("#main").append(likesText)
}
    console.log("hello")
})
.catch((error)=>{
    console.log(error)
})
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
         if(v.imgSrc == z.img_src){
             var likeButton = $('<button onclick="unlike(this)" class="likeButton"></button>').text('Unlike')
             break
         }
         else{
         }
        var likeButton = $('<button onclick="like(this)" class="likeButton"></button>').text('Like')
    }
}
else{
    console.log("qwuibnbqugbino")
    var likeButton = $('<button onclick="like(this)" class="likeButton"></button>').text('Like')
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
        console.log(obj)
        if(obj.imgSrc == aObj.img_src){
            console.log("at: " + i)
            localStorage.removeItem(localStorage.key(i))
            $(button).attr("onclick","like(this)")
            $(button).text("Like")
            id = []
            break
        }
    }
}
function switchDate(){
    if($("#dateType").children()[0].innerHTML == "Earth Date"){
        $("#dateType").empty()
        let title = $("<h4 id='dateTitle'>Sol</h4>")
        $(title).css("display","inline")
        let dButton = $(`<button>&rlarr;<span class="buttonText">Switch date type</span></button>`)
        $(dButton).attr("onclick","switchDate()")
        $(dButton).addClass("dButton")
        let inputRange = $("<input>")
        $(inputRange).attr({"type":"number","id":"dateM"})
        $(inputRange).css("width","5em")
        $("#dateType").append(title, dButton, $("<br>") , inputRange)
    }
    else if($("#dateType").children()[0].innerHTML == "Sol"){
        $("#dateType").empty()
        let title = $("<h4 id='dateTitle'>Earth Date</h4>")
        $(title).css("display","inline")
        let dButton = $(`<button>&rlarr;<span class="buttonText">Switch date type</span></button>`)
        $(dButton).attr("onclick","switchDate()")
        $(dButton).addClass("dButton")
        let inputRange = $("<input>")
        $(inputRange).attr({"type":"date","id":"dateM"})
        $("#dateType").append(title, dButton, $("<br>") , inputRange)
    }
}
var used = 0
function rover(rover){
    console.log(rover)
    if(used = 1){
        $(".cameraAnims").removeClass("cameraAnims")
        $(".red").removeClass("red")
    }
    $(rover).addClass("red")
    $("#" +rover.innerHTML +"Cameras").addClass("cameraAnims")
    used = 1
}
var activeCam = ""
var cUsed = 0
function cameraSelect(cameraSel){
    if(cUsed = 1){
        $(".redCamera").removeClass("redCamera")
    }
    if(activeCam == cameraSel){
        $(cameraSel).removeClass("redCamera")
        cUsed = 0
    }
    else{
    activeCam = cameraSel
    $(cameraSel).addClass("redCamera")
    cUsed = 1
    }
}
function filter(){
    $("#main").empty()
    roverF = $(".red").text()
    if(document.querySelector(".redCamera") !== null){
        cameraF = "&camera="
        cameraF += $(".redCamera").text().slice(0,$(".redCamera").text().indexOf("-")-1)
    }
    else{
        cameraF = ""
    }
    if($("#dateTitle").text() == "Earth Date" && $("#dateM").val() !== ""){
        dateF = "earth_date="
    }
    else if($("#dateTitle").text() == "Sol" && $("#dateM").val() !== ""){
        dateF = "sol="
    }
    dateF += $("#dateM").val()
    console.log(dateF)
    $(".activePage").removeClass("activePage")
    page = 1
    let nums = $(".pageNumber")
    nums[0].innerHTML = 1
    nums[1].innerHTML = 2
    nums[2].innerHTML = 3
    nums[3].innerHTML = 4
    nums[4].innerHTML = 5
    runPage()
}
function openFilter(){
    if($("#filterButtonImg").attr("src") == "assets/OpenFilter.png"){
        $(".filters").addClass("filterAnim")
    $("#filterButtonImg").attr("src","assets/CloseFilter.png")
    }
    else if($("#filterButtonImg").attr("src") == "assets/CloseFilter.png"){
        $("#filterButtonImg").attr("src","assets/OpenFilter.png")
        $(".filters").addClass("filterAnimReverse")
        console.log("huej")
    }
}

$(".filters").on("animationend", () =>{
    if($("#filterButtonImg").attr("src") == "assets/OpenFilter.png"){
    $(".filters").removeClass("filterAnimReverse")
    $(".filters").removeClass("filterAnim")
    }
})

function pageSearch(){
    let e = window.prompt("Page")
}
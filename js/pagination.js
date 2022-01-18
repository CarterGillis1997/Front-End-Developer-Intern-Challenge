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
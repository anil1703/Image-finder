let Myform = document.getElementById("myForm");
let SearchInput = document.getElementById("inputSearch");
let butnSearch = document.getElementById("BtnSearch");
let butnSeeMore = document.getElementById("btnSeeMore");

let mainCont = document.getElementById("rowCont");


function addImagestoCont(imageUrl, downloadLink) {

    let divCont = document.createElement("div");
    divCont.classList.add("col-xs-12", "col-md-6", "col-lg-4");
    mainCont.appendChild(divCont);

    let anchorEle = document.createElement("a");
    anchorEle.href = downloadLink;
    anchorEle.target = "_blank";
    divCont.appendChild(anchorEle);

    let imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.classList.add("w-100", "mr-3", "mb-3", "imgStye");
    anchorEle.appendChild(imgElement);


}

let page = 0;

function findImagesInUrlt() {
    let imgName = SearchInput.value;


    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${imgName}&client_id=sRZg3Isi6oAvCW6ysYtKfDhWNhjryjRIPxo95IlkYoI&per_page=11`;
    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsondata) {
            addImagestoCont(jsondata);
            let dataItem = jsondata.results;
            dataItem.map((result) => {
                console.log(result);
                let imageUrl = result.urls.small;
                let downloadLink = result.links.download;
                console.log(imageUrl);
                addImagestoCont(imageUrl, downloadLink);
                butnSeeMore.classList.remove("d-none");
            });
        });





}


butnSearch.onclick = function() {
    if (SearchInput.value === "") {
        alert("Please Enter a valid KeyWord");
    } else {
        page = 1;
        mainCont.textContent = "";
        findImagesInUrlt();
        butnSeeMore.classList.remove("d-none");
    }
}

butnSeeMore.onclick = function() {
    page++;
    findImagesInUrlt();
}





Myform.addEventListener("submit", function(event) {
    event.preventDefault();
});
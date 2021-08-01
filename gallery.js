// Expanding tab
var content = document.getElementById("index-gallery");
var button = document.getElementById("show-more");

button.onclick = function(){

  if(content.className == "open"){
    //shrink box
    content.className = "";
    button.innerHTML = "Show More";
  } else {
    //Expand box
    content.className ="open";
    button.innerHTML = "Show Less";
  }
};



//gallery _____________________________________________________
// Sets up galleryimages to be the number of gallery-img that it can find. In this case the images
let galleryImages = document.querySelectorAll(".gallery-img");
// Going to let java know what image has been clicked on but right now it's just setting up the name.
let getLatestOpenedImg;
let windowWidth = window.innerWidth;


if(galleryImages){
  //the if statment applies the onclick function to every image
  galleryImages.forEach(function(image, index){
    //the onclick button
    image.onclick = function(){
      //gets the image box
      let getElementCss = window.getComputedStyle(image);
      //gets the image
      let getFullImgUrl = getElementCss.getPropertyValue('background-image');
      //Only takes the last location of the image because that's all that's needed.
      let getImgUrlPos = getFullImgUrl.split("/img/Thumbnails/");
      let setNewImgUrl = getImgUrlPos[1].replace('")', '');

      getLatestOpenedImg = index + 1;

      let container = document.body;
      let newImgWindow = document.createElement("div");
      container.appendChild(newImgWindow);
      newImgWindow.setAttribute("class", "img-window");
      newImgWindow.setAttribute("onclick", "closeImg()");

      let newImg = document.createElement("img");
      newImgWindow.appendChild(newImg);
      newImg.setAttribute("src","img/Gallery/" + setNewImgUrl);
      newImg.setAttribute("id","current-img");

      //I think you don't need this line
      newImg.onload = function(){
        let imgWidth = this.width;
        // let calcImgToEdge = ((windowWidth - imgWidth)/2) - 80;

        let newPrevBtn = document.createElement("a");
        let btnPrevText = document.createTextNode("Prev")
        newPrevBtn.appendChild(btnPrevText);
        container.appendChild(newPrevBtn);
        newPrevBtn.setAttribute("class", "img-btn-prev");
        newPrevBtn.setAttribute("onclick", "changeImg(0)");
        // newPrevBtn.style.cssText = "left:" + "100" + "px;";

        let newNextBtn = document.createElement("a");
        let btnNextText = document.createTextNode("Next")
        newNextBtn.appendChild(btnNextText);
        container.appendChild(newNextBtn);
        newNextBtn.setAttribute("class", "img-btn-next");
        newNextBtn.setAttribute("onclick", "changeImg(1)");
        // newNextBtn.style.cssText = "right:" + "100" + "px;";
      }

    }
  });
}

function closeImg(){
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-prev").remove();
}
function changeImg(changeDir) {
  document.querySelector("#current-img").remove();

  let getImgWindow = document.querySelector(".img-window");
  let newImg = document.createElement("img");
  getImgWindow.appendChild(newImg);

  let calcNewImg;
  if(changeDir === 1) {
      calcNewImg = getLatestOpenedImg + 1;
      if(calcNewImg > galleryImages.length) {
          calcNewImg = 1;
      }
  }
  else if(changeDir === 0) {
      calcNewImg = getLatestOpenedImg - 1;
      if(calcNewImg < 1) {
          calcNewImg = galleryImages.length;
      }
  }
  newImg.setAttribute("src", "img/gallery/img" + calcNewImg + ".jpg");
  newImg.setAttribute("id", "current-img");

  getLatestOpenedImg = calcNewImg;


}

//selecting all required elements
const dropArea = document.querySelector(".drag-area")
const header = document.getElementById('head')
var imgdiv = document.getElementById('img')
const imgArea = document.querySelector(".functions"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input");
  const canvas = document.getElementById('canvas');
let extension = document.querySelector('.extensions')
let cropcontainer=document.querySelector('.cropimage')
let rotatecontainer=document.querySelector('.rotateimage')
let outputfile
let file; //this is a global variable and we'll use it inside multiple functions
let imgextension = ["image/jpeg", "image/jpg", "image/png", "image/PSD", "image/tiff", "image/tif", "image/PSD", "image/XCD", "image/AI", "image/ico", "image/bmp", "image/CDR"]
let docextension = ["application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
let audioextension = ["audio/ogg", "audio/mpeg", "audio/wav", "audio/wav"]  //mpeg is mp3

function download() {
  console.log("download")
  console.log(outputfile, "output")

}
button.onclick = () => {
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  console.log(file, "file drop")
  console.log(file, "file button")
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  console.log(event.dataTransfer.files[0])
  outputfile = URL.createObjectURL(event.dataTransfer.files[0])
  console.log(file, "file drop")
  showFile(); //calling function
});

async function showFile() {
  console.log('show')
  let fileType = file.type; //getting selected file type
  if (imgextension.includes(fileType)) {
    console.log("Includes Image")
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = async () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
      let imgTag = `<img src="${fileURL}" alt="image" class='fileimg'>`;
      //creating an img tag and passing user selected file source inside src attribute
      imgArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
      dropArea.style.display = 'none'
      let a = document.createElement('a')
      a.setAttribute('class', 'actionbtn')

      outputfile = await downloadImage(fileURL)
      a.href = outputfile
      a.download = file.name

      a.textContent = 'Download'
      console.log(extension, "exte")
      extension.appendChild(a)
      header.style.display = 'none'
      imgdiv.style.display = 'block'
    }
    fileReader.readAsDataURL(file);

  }
  else if (docextension.includes(fileType)) {
    console.log("Includes Document")
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // showing document data
    }
    fileReader.readAsDataURL(file);

  }
  else if (audioextension.includes(fileType)) {
    console.log("Includes Audio")
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // showing document data
    }
    fileReader.readAsDataURL(file);

  }




}
async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  return imageURL
}

function Crop(){
  cropImg()
}
function cropImg(){
 cropcontainer.style.display='flex'
 cropcontainer.style.flexDirection='column'
  const ctx = canvas.getContext('2d');

  var image = new Image();
  // image.src = "https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=725&q=80"; 
  image.src=outputfile
  image.onload = function(){
    ctx.drawImage(image, 150, 200, 500, 300, 60,60, 500, 300);
  }
}

function rotateImg(){
  rotatecontainer.style.display='flex'
  rotatecontainer.style.flexDirection='column'
}
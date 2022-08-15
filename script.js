//selecting all required elements
const dropArea = document.querySelector(".drag-area")
const header = document.getElementById('head')
var imgdiv = document.getElementById('img')
var docdiv = document.getElementById('doc')
var videodiv = document.getElementById('video')
var audiodiv = document.getElementById('audio')
var errordiv=document.getElementById('error')
const imgArea = document.querySelector(".functions"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input");
const canvas = document.getElementById('canvas1');
let extension = document.querySelector('.extensions')
let doccontainer = document.querySelector('.extensionsdoc')
let vidcontainer = document.querySelector('.extensionsvideo')
let audcontainer = document.querySelector('.extensionsaudio')
let cropcontainer = document.querySelector('.cropimage')
let rotatecontainer = document.querySelector('.rotateimage')
let outputfile

let file; //this is a global variable and we'll use it inside multiple functions

let imgextension = ["image/jpeg", "image/jpg", "image/png", "image/PSD", 'image/gif', "image/tiff", "image/tif", "image/PSD", "image/XCD", "image/AI", "image/ico", "image/bmp", "image/CDR"]
let docextension = ["application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
let audioextension = ["audio/ogg", "audio/mpeg", "audio/wav",]  //mpeg is mp3
let videoextension = ["video/x-matroska", "video/mp4","video/mov"]


button.onclick = () => {
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
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
  outputfile = URL.createObjectURL(event.dataTransfer.files[0])
  showFile(); //calling function
});

async function showFile() {
  let fileType = file.type; //getting selected file type
  if (imgextension.includes(fileType)) {
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
      extension.appendChild(a)
      let iname = document.getElementById('imgname')
      iname.innerHTML = "Image Name: " + file.name
      header.style.display = 'none'
      imgdiv.style.display = 'block'
    }
    fileReader.readAsDataURL(file);

  }
  else if (docextension.includes(fileType)) {
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = async () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // showing document data
      let a = document.createElement('a')
      a.setAttribute('class', 'actionbtn')

      outputfile = await downloadImage(fileURL)
      a.href = outputfile
      a.download = file.name

      a.textContent = 'Download'
      doccontainer.appendChild(a)
      let iname = document.getElementById('docname')
      iname.innerHTML = "Document Name: " + file.name
      dropArea.style.display = 'none'
      header.style.display = 'none'
      docdiv.style.display = 'block'
    }
    fileReader.readAsDataURL(file);

  } else if (videoextension.includes(fileType)) {
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = async () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // showing document data
      let vidArea=document.getElementById('vid')
      let imgTag = `<video width="620" height="240" controls>
      <source src="${fileURL}" >
    Your browser does not support the video tag.
    </video>`;
      vidArea.innerHTML = imgTag
    
      let a = document.createElement('a')
      a.setAttribute('class', 'actionbtn')

      outputfile = await downloadImage(fileURL)
      a.href = outputfile
      a.download = file.name

      a.textContent = 'Download'
      vidcontainer.appendChild(a)
      dropArea.style.display = 'none'
      header.style.display = 'none'
      let iname = document.getElementById('vidname')
      iname.innerHTML = "Video Name: " + file.name
      videodiv.style.display = 'block'
    }
    fileReader.readAsDataURL(file);

  }
  else if (audioextension.includes(fileType)) {
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = async () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // showing document data
      let a = document.createElement('a')
      a.setAttribute('class', 'actionbtn')
      outputfile = await downloadImage(fileURL)
      a.href = outputfile
      a.download = file.name

      a.textContent = 'Download'
      audcontainer.appendChild(a)
      dropArea.style.display = 'none'
      let iname = document.getElementById('audname')
      iname.innerHTML = "Document Name: " + file.name
      header.style.display = 'none'
      audiodiv.style.display = 'block'
    }
    fileReader.readAsDataURL(file);

  }
  else{
    dropArea.style.display = 'none'
    header.style.display = 'none'
      errordiv.style.display = 'block'
  }




}
async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  return imageURL
}

function Crop() {
  cropImg()
}
function cropImg() {
  cropcontainer.style.display = 'flex'
  cropcontainer.style.flexDirection = 'column'
  const ctx = canvas.getContext('2d');

  var image = new Image();
  image.src = outputfile
  image.onload = function () {
    ctx.drawImage(image, 150, 200, 500, 300, 60, 60, 500, 300);
  }
}

function rotateImg() {
  rotatecontainer.style.display = 'flex'
  rotatecontainer.style.flexDirection = 'column'
  let imagetag = document.createElement('img')
  imagetag.setAttribute('src', outputfile)
  imagetag.setAttribute('class', 'rotate')
  rotatecontainer.appendChild(imagetag)
}




function ChangeExtension(replaces) {
  let current
  let newr
  if (replaces.value.includes('audio')) {
    current = 'data:' + file.type
    let fileReader = new FileReader()
    newr = 'data:audio/' + replaces.value


    fileReader.onload = async () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // console.log(fileURL,"fileURlss")
      // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
      let a = document.createElement('a')
      a.setAttribute('class', 'actionbtn')
      let ay = fileURL.replace(current, newr)
      outputfile = await downloadImage(ay)
      a.href = outputfile
      // replaces whatever is after . then add the new extension
      a.download = 'audio.' + replaces.value.split('/')[1]
      a.click()


    }
    fileReader.readAsDataURL(file);

  }
  else if (replaces.value.includes('video')) {
    // console.log('In AUdio', replaces, "dsd", replaces.value.split('/')[1])
    current = 'data:' + file.type
    // console.log(replaces.value, replaces.label, "option Extension")
    let fileReader = new FileReader()
    newr = 'data:video/' + replaces.value


    fileReader.onload = async () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // console.log(fileURL,"fileURlss")
      // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
      let a = document.createElement('a')
      a.setAttribute('class', 'actionbtn')
      let ay = fileURL.replace(current, newr)
      outputfile = await downloadImage(ay)
      a.href = outputfile
      // replaces whatever is after . then add the new extension
      a.download = 'video.' + replaces.value.split('/')[1]
      a.click()


    }
    fileReader.readAsDataURL(file);

  }
  else if (replaces.value.includes('application')) {
    current = 'data:' + file.type
    let fileReader = new FileReader()
    newr = 'data:application/' + replaces.value


    fileReader.onload = async () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // console.log(fileURL,"fileURlss")
      // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
      let a = document.createElement('a')
      a.setAttribute('class', 'actionbtn')
      let ay = fileURL.replace(current, newr)
      outputfile = await downloadImage(ay)
      a.href = outputfile
      // replaces whatever is after . then add the new extension
      a.download = 'document.' + replaces.value.split('/')[1]
      a.click()


    }
    fileReader.readAsDataURL(file);

  }



  else {
    current = 'data:' + file.type
    let fileReader = new FileReader()
    newr = 'data:image/' + replaces.value


    fileReader.onload = async () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // console.log(fileURL,"fileURlss")
      // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
      let a = document.createElement('a')
      a.setAttribute('class', 'actionbtn')
      let ay = fileURL.replace(current, newr)
      outputfile = await downloadImage(ay)
      a.href = outputfile
      // replaces whatever is after . then add the new extension
      a.download = 'pic.' + replaces.value
      a.click()


    }
    fileReader.readAsDataURL(file);
  }








}

window.onload = function () {

  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio1");

  file.onchange = function () {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + (25 * (i / bufferLength));
        var g = 250 * (i / bufferLength);
        var b = 50;

        ctx.fillStyle = "#000CFF";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  };
};
const colors = ["#3DB2FF","#FFB830","#FF2442","#FF7600","#185ADB","#0A1931","#99154E"];

var noiseRes;
var particleNo;
var speedMultiplier;
var imgThreshold;

const originalPic = './img/img.jpg'
var currentPic;

var noisePosition;
var img;
var effectors = [];
var particles = [];
var particleSize;
var maxR;



/////////////////////////////STATIC PART
function setup() {
	createCanvas(windowWidth, windowHeight);
	document.getElementsByClassName('thresholdSlider')[0].value = 0.1;

	loadImg(originalPic)
	var timeout;

	window.addEventListener('resize', (e) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			resizeCanvas(windowWidth,windowHeight)
			loadImg(currentPic)
		}, 100)
	})
}

function loadImg(path) {
	const prevHolder = document.getElementsByClassName('imgPrev')[0]
	const overlayPreview = document.getElementsByClassName('overlay')[0]
	img = loadImage(path, () => {
		initCanvas();
		prepImg();

		prevHolder.style.backgroundImage = "url('" + path + "')"
		overlayPreview.style.backgroundImage = "url('" + path + "')"
		currentPic = path
	})
}

function uploadImg(file) {
	const reader = new FileReader()

	reader.onload = (e) => {
		let newImg = e.target.result
		loadImg(newImg)
	}

	if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
		reader.readAsDataURL(file)
	}
}

function saveImg() {
	saveCanvas('img','jpg')
}

function prepImg() {
	effectors = []
	img.loadPixels()
	img.resize(width, height)
	img.filter(THRESHOLD, float(imgThreshold))
	img.loadPixels()

for(let y = 0; y < height; y++) {
	let row = []
	for(let x = 0; x < width; x++) {
		var index = (x + y * width)*4;
		let pixel = img.pixels[index];
		row.push(pixel)
		}
	effectors.push(row)
	}
	//image(img,0,0)
}

function changeParam(type) {
	if(type === 'size') {
		particleSize = document.getElementsByClassName('sizeSlider')[0].value
	} else if (type === 'amount') {
		particleNo = document.getElementsByClassName('particleSlider')[0].value
	} else if (type === 'noise') {
		noiseRes =  document.getElementsByClassName('noiseSlider')[0].value
	} else if (type === 'speed') {
		speedMultiplier = document.getElementsByClassName('speedSlider')[0].value
	} else if (type === 'threshold') {
		imgThreshold = document.getElementsByClassName('thresholdSlider')[0].value
		
		loadImg(currentPic)
		
	}

}


function initCanvas() {
	background('#ffffff')
	particles = []
	noisePosition = int(random(0,1000000))
	particleSize = document.getElementsByClassName('sizeSlider')[0].value
	speedMultiplier = document.getElementsByClassName('speedSlider')[0].value
	particleNo = document.getElementsByClassName('particleSlider')[0].value
	noiseRes =  document.getElementsByClassName('noiseSlider')[0].value
	imgThreshold = document.getElementsByClassName('thresholdSlider')[0].value
	maxR = width

}

/////////////////////////////DYNAMIC PART
function draw() {
	translate(width/2, height/2)
	noStroke()
	initParticles()
	
	if(particleSize > 1) {
		if(particles.length != 0) {
			for(let i = 0; i < particles.length; i++) {
				var p = particles[i]
				p.show()
				p.move()
				
				if(p.isDead()) particles.splice(i, 1)
			}
		}
	}
}

function initParticles() {
	let color = colors[int(random(colors.length))]
	
	for(let i = 0; i < particleNo; i++) {
		particles.push(new Particle(maxR, particleSize, color))
	}
}


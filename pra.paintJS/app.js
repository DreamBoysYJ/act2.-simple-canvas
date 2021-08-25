const canvas = document.getElementById("jsCanvas");
const range = document.getElementById("jsRange");
const ctx = canvas.getContext("2d");
const mode = document.getElementById("jsMode");
const colors = document.getElementsByClassName("jsColor")
const save = document.getElementById("jsSave");



const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c"  /// 같은 걸 두번 이상 쓸거면 대문자로 재정의를 해주면 오류를 쉽게 잡는다.

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;   /// css에서 말고도 사이즈를 다시 정의 해줘야 한다.

ctx.fillStyle = "white";

let fill = ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.lineWidth = 2.5;            

let painting = false;
let filling = false;  ///이시발 새끼가 있음으로써 바꿀 수 있게 해줌





function handleSaveClick() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "pra.paintJS";
    link.click();
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";

    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}


function handleCanvasClick() {
    if(filling){
        fill;
    }
}



function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleCM(event){
    event.preventDefault();
}

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function OnMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;


}

//// 도대체 왜 씨발 도대체 왜 씨발 맞는데 왜 색이 안바뀌어

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));




if(canvas) {
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("moseleave", stopPainting);
    canvas.addEventListener("mousemove", OnMouseMove);
    canvas.addEventListener("contextmenu", handleCM);
    canvas.addEventListener("click", handleCanvasClick);
}


if(save) {
    save.addEventListener("click", handleSaveClick);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(range) {
    range.addEventListener("input", handleRangeChange);
}


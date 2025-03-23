//30mins + 5,30 pm+

const canvas = document.getElementById("canvas");
const btn = document.getElementById("go");
const ctx = canvas.getContext("2d");
const h = canvas.clientHeight;
const w = canvas.clientWidth;

ctx.fillStyle = "lavender";
ctx.fillRect(0,0,canvas.clientHeight,canvas.clientWidth);

const pi = Math.PI;
const r = w/2;

function WriteNumbers(){   
    ctx.lineWidth = 1;
    var len = r*.90;
    for (let i = 1; i < 13; i++){
        let angle = (i * pi/6) - pi/2;
        let x = w/2 + (len * Math.cos(angle))
        let y = h/2 + (len * Math.sin(angle))
        ctx.fillStyle = "white";
        ctx.font = "13px Arial";
        ctx.fillText(i, (x*.985),(y*1.02));

        angle += pi/12;
        x = w/2 + ((r) * Math.cos(angle))
        y = h/2 + ((r) * Math.sin(angle))

        let x0 = x + 0.08*(h/2-x);
        let y0 = y + 0.08*(w/2-y);
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.moveTo(x0, y0);
        ctx.lineTo(x,y);
        ctx.stroke(); 
    }
}

function DrawClock(){
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(h/2,w/2,h/2,0,Math.PI*2);
    ctx.fill();
    WriteNumbers();
}

class Time{
    constructor(hrs, mins, secs, millis){
        this.hrs = hrs;
        this.mins = mins;
        this.secs = secs;
        this.millis = millis;
    }

    edit(h,m,s){
        this.hrs = h;
        this.mins = m;
        this.secs = s;
        this.millis = 0;
    }
}

class TimeCalc{
    static currenttimer = new Time(1,50,30,0);

    count(){
        TimeCalc.currenttimer = this.add(TimeCalc.currenttimer, sec)
        this.printTime();
    }
    
    add(t1,t2){
        
        let millis = t1.millis + t2.millis;
        
        let secs = t1.secs + t2.secs;
        if (millis > 99){
            millis -= 100;
            secs += 1;
        }

        let mins = t1.mins + t2.mins;

        if (secs > 59){
            mins++;
            secs -= 60;
        }

        let hrs = t1.hrs + t2.hrs;

        if (mins > 59){
            hrs++;
            mins -= 60;
        }

        return new Time(hrs,mins,secs,millis);
    }
    printTime(time){
        if (arguments.length === 0){
            let str = `${String(TimeCalc.currenttimer.hrs)}:${String(TimeCalc.currenttimer.mins)}:${String(TimeCalc.currenttimer.secs)}:${String(TimeCalc.currenttimer.millis)}`;
        }
    }
}


function updateClock(){
    var len = w/2;
    function hour(){
        let time = TimeCalc.currenttimer;
        let angle = (time.hrs * pi/6) - pi/2;

        let x = w/2 + ((len * 0.65) * Math.cos(angle));
        let y = h/2 + ((len * .65) * Math.sin(angle));

        ctx.beginPath();
        ctx.strokeStyle = "pink";
        ctx.lineWidth = 2.5;
        ctx.moveTo(h/2,w/2);
        ctx.lineTo(x,y);
        ctx.stroke(); 
    }

    function minute(){
        let time = TimeCalc.currenttimer;
        let angle = (time.mins * pi/30) - pi/2;

        let x = w/2 + ((len * .80) * Math.cos(angle));
        let y = h/2 + ((len * .80) * Math.sin(angle));

        ctx.beginPath();
        ctx.strokeStyle = "#ff073a";
        ctx.moveTo(h/2,w/2);
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    function second(){
        let time = TimeCalc.currenttimer;
        let angle = (time.secs * pi/30) - pi/2;
        let x = w/2 + ((len * .93) * Math.cos(angle));
        let y = h/2 + ((len * .93) * Math.sin(angle));

        ctx.strokeStyle = "#ffff33";
        ctx.beginPath();
        ctx.moveTo(h/2,w/2);
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    DrawClock();
    hour();
    minute();
    second();
}


const timecalc = new TimeCalc();
const sec = new Time(0,0,1,0);

setInterval(()=>{
    timecalc.count();
    updateClock();
},1000);

var hh = document.getElementById("hh");
var mm = document.getElementById("mm");
var ss = document.getElementById("ss");


function HandleUser(){
    let hhh = Number(hh.value);
    let mmm = Number(mm.value);
    let sss = Number(ss.value);

    if (sss == 0){
        sss -= 1;
    }
    
    TimeCalc.currenttimer.edit(hhh,mmm,sss);
}

btn.addEventListener('click', ()=>{
    HandleUser();
})


mm.addEventListener('keydown', (e)=>{
    if (e.key == 'Enter'){
        HandleUser();
    }
})
ss.addEventListener('keydown', (e)=>{
    if (e.key == 'Enter'){
        HandleUser();
    }
})
hh.addEventListener('keydown', (e)=>{
    if (e.key == 'Enter'){
        HandleUser();
    }
})

let apikey = "43578aa1a901dd079b5746d035a876bfef61be997f1a3a3429f38721";

fetch(`https://api.ipdata.co?api-key=${apikey}`).then((res)=>res.json()).then((res)=>{(setCurrentTime(res.time_zone.current_time))});

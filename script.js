// BURGER MENU
const burger=document.getElementById('burger');
const navLinks=document.getElementById('navLinks');
burger.addEventListener('click',()=>navLinks.classList.toggle('active'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('active')));

// SCROLL REVEAL with direction
let lastScroll=0, scrollDir='down';
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  scrollDir = y>lastScroll?'down':'up';
  lastScroll=y;
});
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.remove('up');
      if(scrollDir==='up') e.target.classList.add('up');
      e.target.classList.add('visible');
    } else {
      e.target.classList.remove('visible');
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// PROJECT INTERACTION
const stage=document.getElementById('projectStage');
const center=stage.querySelector('.center');
const sides=stage.querySelectorAll('.side');
let opened=false;
center.addEventListener('click',(e)=>{
  e.stopPropagation();
  if(!opened){stage.classList.add('open');opened=true;}
  else if(!center.classList.contains('zoomed')){center.classList.add('zoomed');}
  else{window.open(center.dataset.link,'_blank');}
});
sides.forEach(s=>{
  s.addEventListener('click',(e)=>{
    e.stopPropagation();
    if(!s.classList.contains('zoomed')) s.classList.add('zoomed');
    else window.open(s.dataset.link,'_blank');
  });
});
document.addEventListener('click',()=>{
  document.querySelectorAll('.project-card.zoomed').forEach(c=>c.classList.remove('zoomed'));
  if(opened){stage.classList.remove('open');opened=false;}
});

// BACKGROUND CANVAS - dots + rocket
const canvas=document.getElementById('bgCanvas');
const ctx=canvas.getContext('2d');
let W,H;
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;}
resize();window.addEventListener('resize',resize);

// Floating dots
const dots=Array.from({length:50},()=>({
  x:Math.random()*W,y:Math.random()*H,
  r:Math.random()*2+1,
  vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,
  c:Math.random()>.5?'rgba(106,141,255,':'rgba(181,141,255,'
}));

// Rockets
let rockets=[], smoke=[];
function launchRocket(){
  rockets.push({x:Math.random()*W,y:H+10,vy:-2-Math.random()*1.5});
}
setInterval(launchRocket,10000);

function animate(){
  ctx.clearRect(0,0,W,H);
  // dots
  dots.forEach(d=>{
    d.x+=d.vx;d.y+=d.vy;
    if(d.x<0||d.x>W)d.vx*=-1;
    if(d.y<0||d.y>H)d.vy*=-1;
    ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
    ctx.fillStyle=d.c+'0.6)';ctx.fill();
  });
  // rockets
  rockets.forEach((r,i)=>{
    r.y+=r.vy;
    smoke.push({x:r.x+(Math.random()-.5)*4,y:r.y+5,r:3,life:1});
    ctx.beginPath();ctx.arc(r.x,r.y,3,0,Math.PI*2);
    ctx.fillStyle='#fff';ctx.shadowColor='#b58dff';ctx.shadowBlur=15;ctx.fill();
    ctx.shadowBlur=0;
    if(r.y<-20)rockets.splice(i,1);
  });
  // smoke
  smoke.forEach((s,i)=>{
    s.life-=0.015;s.r+=0.3;
    if(s.life<=0){smoke.splice(i,1);return;}
    ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(200,200,255,${s.life*0.3})`;ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

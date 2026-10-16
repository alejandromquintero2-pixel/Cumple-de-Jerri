const $=s=>document.querySelector(s);
/* Destellos */
const sp=$('#sparkles');
for(let i=0;i<18;i++){const e=document.createElement('i');e.style.left=Math.random()*100+'%';e.style.top=Math.random()*100+'%';e.style.animationDelay=(Math.random()*4)+'s';e.style.animationDuration=(3+Math.random()*3)+'s';const s=6+Math.random()*10;e.style.width=e.style.height=s+'px';sp.appendChild(e)}

/* Confeti */
const cv=$('#fx'),cx=cv.getContext('2d');let parts=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener('resize',size);
const cols=['#7c5cc4','#a083de','#cdb8f0','#ece3fa','#fbf3dc','#ecd9a0','#dccb9c'];
function confetti(x=innerWidth/2,y=innerHeight/3,n=100){
  for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=3+Math.random()*8;
    parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-4,s:4+Math.random()*6,c:cols[i%7],r:Math.random()*6,vr:(Math.random()-.5)*.3,l:160+Math.random()*60,round:i%3===0})}
  if(!run){run=true;loop()}
}
function loop(){cx.clearRect(0,0,cv.width,cv.height);
  parts=parts.filter(p=>p.l>0);
  parts.forEach(p=>{p.vy+=.14;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.l--;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.globalAlpha=Math.min(1,p.l/40);cx.fillStyle=p.c;
    if(p.round){cx.beginPath();cx.arc(0,0,p.s/2,0,7);cx.fill()}else cx.fillRect(-p.s/2,-p.s/4,p.s,p.s*.5);cx.restore()});
  if(parts.length)requestAnimationFrame(loop);else{run=false;cx.clearRect(0,0,cv.width,cv.height)}
}

/* Pastel */
const cake=$('#cake'),hint=$('#hint');
cake.onclick=()=>{
  if(cake.classList.toggle('out')){hint.textContent='Que todos tus deseos se hagan realidad.';confetti();setTimeout(()=>confetti(innerWidth*.2,innerHeight*.4,60),250);setTimeout(()=>confetti(innerWidth*.8,innerHeight*.4,60),450)}
  else hint.textContent='La vela volvió a encenderse. Pide otro deseo.';
};

/* Calendario */
const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
let m=9,y=2026;const note=$('#note');
const frases=['Un día más cerca de algo hermoso.','Hoy también mereces cosas bonitas.','Un día cualquiera, pero el 16 es el más especial.','Guarda tu mejor sonrisa para el día grande.'];
function draw(){
  $('#mes').textContent=meses[m]+' '+y;const g=$('#grid');g.innerHTML='';
  ['L','M','X','J','V','S','D'].forEach(d=>{const e=document.createElement('div');e.className='dow';e.textContent=d;g.appendChild(e)});
  const first=(new Date(y,m,1).getDay()+6)%7,total=new Date(y,m+1,0).getDate();
  for(let i=0;i<first;i++){const e=document.createElement('div');e.className='day empty';g.appendChild(e)}
  for(let d=1;d<=total;d++){
    const b=document.createElement('button');b.className='day';b.textContent=d;
    const bd=(m===9&&d===16);if(bd){b.classList.add('bday');b.setAttribute('aria-label','16 de octubre, cumpleaños de Jerrica')}
    b.onclick=()=>{
      if(bd){note.textContent='16 de octubre: feliz cumpleaños, Jerrica.';const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,130)}
      else note.textContent=frases[(d+m)%frases.length];
    };
    g.appendChild(b);
  }
}
$('#prev').onclick=()=>{m--;if(m<0){m=11;y--}draw()};
$('#next').onclick=()=>{m++;if(m>11){m=0;y++}draw()};
draw();

/* Tarjetas */
document.querySelectorAll('.card').forEach(c=>c.onclick=()=>c.classList.toggle('flip'));

/* Frasco */
const deseos=['Eres más fuerte de lo que crees.','Hoy mereces un momento solo para ti.','Tu sonrisa cambia días enteros.','Todo lo que sueñas está en camino.','Vive con calma y ríe con ganas.','Gracias por ser exactamente como eres.','Este será tu mejor año.','Hoy brillas más que nunca.'];
let last=-1;
$('#jarBtn').onclick=()=>{
  let i;do{i=Math.floor(Math.random()*deseos.length)}while(i===last);last=i;
  const w=$('#wish');w.style.opacity=0;setTimeout(()=>{w.textContent=deseos[i];w.style.opacity=1},250);
  const r=$('#jarBtn').getBoundingClientRect();confetti(r.left+r.width/2,r.top,35);
};

/* Tema */
const root=document.documentElement,tb=$('#theme');
tb.onclick=()=>{const dark=getComputedStyle(root).getPropertyValue('--ink').trim()==='#f6efff';root.dataset.theme=dark?'light':'dark';tb.textContent=dark?'Modo oscuro':'Modo claro'};
if(matchMedia('(prefers-color-scheme:dark)').matches)tb.textContent='Modo claro';

setTimeout(()=>confetti(),700);

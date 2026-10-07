
const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if(btn && nav){
  btn.addEventListener('click', ()=> nav.classList.toggle('open'));
}

const plane = document.querySelector('#plane-dot');
const path = document.querySelector('#travel-path');
if(plane && path){
  const len = path.getTotalLength();
  function animatePlane(t){
    const cycle = 18000;
    const pct = (t % cycle) / cycle;
    const p = path.getPointAtLength(len * pct);
    const p2 = path.getPointAtLength(Math.min(len, len * pct + 1));
    const ang = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;
    plane.setAttribute('transform', `translate(${p.x},${p.y}) rotate(${ang})`);
    requestAnimationFrame(animatePlane);
  }
  requestAnimationFrame(animatePlane);
}

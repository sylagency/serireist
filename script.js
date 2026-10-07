const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if(btn && nav){
  btn.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', false);
  }));
}

// Flugzeuge fliegen hin und zurück: Reise 1 (Sansibar) und Reise 2 (Algier)
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function fly(planeSel, pathSel, cycle, offset){
  const plane = document.querySelector(planeSel);
  const path = document.querySelector(pathSel);
  if(!plane || !path) return;
  const len = path.getTotalLength();
  function place(pct, back){
    const at = len * pct;
    const p = path.getPointAtLength(at);
    const q = path.getPointAtLength(Math.min(len, Math.max(0, at + (back ? -1 : 1))));
    const ang = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
    plane.setAttribute('transform', `translate(${p.x},${p.y}) rotate(${ang})`);
  }
  if(reduce){ place(.5, false); return; }
  function frame(t){
    const x = ((t + offset) % cycle) / cycle;
    const back = x > .5;
    const pct = back ? 2 - x * 2 : x * 2;
    // sanftes Abheben und Landen
    place(pct * pct * (3 - 2 * pct), back);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
fly('#plane-1', '#trip-1', 16000, 0);
fly('#plane-2', '#trip-2', 11000, 3000);

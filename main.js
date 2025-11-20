function simulateTracking(){
  const id = document.getElementById('trackingInput')?.value?.trim();
  const out = document.getElementById('trackingStatus');
  if(!id){ if(out) out.textContent='Please enter a tracking number.'; return; }
  const phases=['Label created','Picked up','At sorting hub','Out for delivery','Delivered'];
  const index=Math.min(id.length % phases.length, phases.length-1);
  if(out) out.textContent=`Status: ${phases[index]} • Last update: ${new Date().toLocaleString()}`;
}

function estimate(){
  const d=parseFloat(document.getElementById('dist').value||0);
  const w=parseFloat(document.getElementById('weight').value||0);
  const speed=document.getElementById('speed').value.toLowerCase();
  const fragile=(document.getElementById('fragile').value||'no').toLowerCase()==='yes';
  if(d<=0 || w<=0){ document.getElementById('estimateOut').textContent='Enter valid distance and weight.'; return; }
  let basePerKm=0.35, basePerKg=0.6;
  const mult=speed==='standard'?1:speed==='express'?1.35:1.6;
  const fragileFee=fragile?2.5:0;
  const subtotal=(d*basePerKm + w*basePerKg)*mult + fragileFee;
  const fuel=subtotal*0.06, tax=subtotal*0.05;
  const total=Math.max(3.5, subtotal+fuel+tax);
  document.getElementById('estimateOut').textContent=`Estimated price: ${total.toFixed(2)} (includes fuel & tax; fragile: ${fragile?'yes':'no'})`;
}

// Simple map placeholder
document.addEventListener('DOMContentLoaded', ()=>{
  const map=document.getElementById('map'); if(!map) return;
  map.innerHTML='<div style="height:100%;background:linear-gradient(180deg,#eef5ff,#ffffff);position:relative;border-radius:14px"><div style="position:absolute;bottom:12px;left:12px;background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:8px 10px;font-size:14px">Green dots: active hubs • Click for details</div></div>';
});

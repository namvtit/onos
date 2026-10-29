(() => {
  'use strict';
  const choice=document.getElementById('production-method');
  const panels=[...document.querySelectorAll('[data-method]')];
  const email=document.getElementById('method-email');
  choice.disabled=false;
  function update(){
    const en=document.documentElement.lang==='en';
    panels.forEach(panel=>{panel.hidden=panel.dataset.method!==choice.value;});
    const title=panels.find(panel=>!panel.hidden).querySelector('h3').textContent;
    const body=en?`Hello Onos team,\n\nProduction method: ${title}\nProduct / material:\nExpected quantity:\nDestination country / postcode:\nArtwork link / print size:\nTarget date:\n\nPlease advise on sampling, pricing and production lead time.`:`Chào đội ngũ Onos,\n\nCông nghệ: ${title}\nSản phẩm / chất liệu:\nSố lượng dự kiến:\nQuốc gia / mã bưu chính nhận hàng:\nLink thiết kế / kích thước in:\nThời gian mong muốn:\n\nNhờ Onos tư vấn mẫu, báo giá và tiến độ sản xuất.`;
    email.href='mailto:onospod.com@gmail.com?subject='+encodeURIComponent(en?'Production enquiry | Onos Global':'Yêu cầu sản xuất | Onos Global')+'&body='+encodeURIComponent(body);
  }
  choice.addEventListener('change',update);
  document.querySelectorAll('[data-method-target]').forEach(link=>link.addEventListener('click',()=>{
    choice.value=link.dataset.methodTarget;update();choice.focus({preventScroll:true});
  }));
  new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  update();
})();

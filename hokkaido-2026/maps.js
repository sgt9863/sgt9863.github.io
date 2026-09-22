(() => {
  'use strict';
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const photoFor=query=>{const photos=window.TRIP_PLACE_PHOTOS,id=photos?.places?.[query];return id?photos.assets[id]:null;};
  const photoCaption=(photo,title)=>photo.caption.includes('イメージ')||title.startsWith(photo.caption)||photo.caption.startsWith(title)?photo.caption:`${photo.caption}（周辺の風景）`;
  let map, observer, cleanup;
  const markup=()=>`<section class="day-map-section" aria-labelledby="day-map-title"><div class="map-heading"><div><p class="eyebrow">PLACES FOR TODAY</p><h2 id="day-map-title">この日の地図</h2></div><div class="map-legend"><span><i class="legend-plan"></i>予定</span><span><i class="legend-detour"></i>寄り道</span></div></div><p class="caption">ピンを押すと詳細が開きます。道路の経路はGoogleマップで確認できます。</p><div class="map-toolbar"><button type="button" class="pill-button" data-map-fit>全体を見る</button><button type="button" class="pill-button" data-map-interact aria-pressed="false">地図を操作</button><button type="button" class="pill-button" data-map-expand aria-pressed="false">大きく表示</button></div><div class="day-map" id="day-map" role="region" aria-label="この日の予定と寄り道の地図"><p class="map-loading">地図を準備しています…</p></div><p class="map-status caption" role="status"></p><label class="map-select-label" for="map-place">場所を選んで拡大</label><select id="map-place"><option value="">場所を選ぶ</option></select><div class="map-place-detail" aria-live="polite"></div></section>`;
  function destroy(){observer?.disconnect();observer=null;cleanup?.();cleanup=null;map?.remove();map=null;}
  function mount(day,spots){
    destroy();
    const section=document.querySelector('.day-map-section');if(!section)return;
    const status=section.querySelector('.map-status'),detail=section.querySelector('.map-place-detail'),select=section.querySelector('select');
    const all=[];
    day.events.forEach((event,index)=>{if(event.query)all.push({key:'p'+index,kind:'plan',name:event.title,query:event.query,description:event.text,meta:event.time+' / '+event.kind});});
    spots.forEach(spot=>all.push({key:'s'+window.TRIP.spots.indexOf(spot),kind:'detour',name:spot.name,query:spot.query,description:spot.text,meta:spot.when+' · '+spot.detour}));
    const mapped=all.filter(p=>{p.location=window.TRIP_LOCATIONS?.[p.query];return p.location;});
    const missing=all.filter(p=>!p.location);
    for(const [kind,label] of [['plan','予定'],['detour','寄り道']]){
      const group=document.createElement('optgroup');group.label=label;
      all.filter(p=>p.kind===kind).forEach(p=>{const option=document.createElement('option');option.value=p.key;option.textContent=p.name+(p.location?'':'（地図リンクで確認）');group.append(option);});select.append(group);
    }
    function show(p){
      select.value=p.key;
      const url='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.query);
      const route='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(p.query)+'&travelmode='+(spots.find(s=>s.query===p.query)?.travelMode||'driving');
      const photo=photoFor(p.query);
      detail.innerHTML=`${photo?`<figure class="place-photo compact"><img src="${esc(photo.src)}" alt="${esc(photoCaption(photo,p.name))}"${photo.position?` style="object-position:${esc(photo.position)}"`:''} loading="lazy" decoding="async"><figcaption><span>${esc(photoCaption(photo,p.name))}</span><a href="${esc(photo.source)}" target="_blank" rel="noopener noreferrer">写真情報 ↗</a></figcaption></figure>`:''}<p class="eyebrow">${p.kind==='plan'?'予定':'寄り道'}</p><h3>${esc(p.name)}</h3><p>${esc(p.meta)}</p><p>${esc(p.description)}</p>${p.location?.note?`<p class="caption">${esc(p.location.note)}</p>`:''}<div class="stop-actions"><a class="pill-button primary" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Googleマップ ↗</a><a class="pill-button" href="${esc(route)}" target="_blank" rel="noopener noreferrer">ここへ行く ↗</a></div>`;
    }
    if(!window.L){status.textContent='地図を読み込めませんでした。場所を選ぶとGoogleマップを開けます。';select.onchange=()=>{const p=all.find(p=>p.key===select.value);if(p)show(p);};return;}
    section.querySelector('.map-loading').remove();
    map=L.map('day-map',{scrollWheelZoom:false,dragging:false,touchZoom:false,keyboard:true,doubleClickZoom:false,zoomControl:false,attributionControl:true});
    L.control.zoom({zoomInTitle:'拡大',zoomOutTitle:'縮小'}).addTo(map);
    const markers=new Map(),groups=new Map();
    for(const p of mapped){const key=p.location.lat.toFixed(5)+','+p.location.lng.toFixed(5);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p);}
    let planned=0,optional=0;
    for(const points of groups.values()){
      const p=points[0],hasPlan=points.some(x=>x.kind==='plan'),label=hasPlan?String(++planned):String.fromCharCode(65+optional++);
      const marker=L.marker([p.location.lat,p.location.lng],{icon:L.divIcon({className:'trip-pin '+(hasPlan?'plan-pin':'detour-pin'),html:`<span>${label}</span>`,iconSize:[32,36],iconAnchor:[16,36]}),title:points.map(x=>x.name).join(' / '),alt:points.map(x=>x.name).join(' / '),keyboard:true});
      const popup=document.createElement('div');popup.className='map-popup';
      points.forEach(item=>{const button=document.createElement('button');button.type='button';button.textContent=item.name;button.addEventListener('click',()=>show(item));popup.append(button);markers.set(item.key,marker);});
      marker.bindPopup(popup,{maxWidth:240}).on('click',()=>show(p)).addTo(map);
    }
    const bounds=mapped.length?L.latLngBounds(mapped.map(p=>[p.location.lat,p.location.lng])):L.latLngBounds([[42.7,140.8],[43.6,142.7]]);
    const fit=()=>map.fitBounds(bounds,{padding:[30,35],maxZoom:13,animate:false});fit();
    let tiles,failed=false;
    const localFile=location.protocol==='file:';
    const statusText=()=>{if(localFile){status.innerHTML='ローカルファイルでは背景地図を表示できません。<a href="https://sgt9863.com/hokkaido-2026/'+esc(location.hash)+'">公開版で地図を開く ↗</a>';return;}status.textContent=!navigator.onLine?'オフラインです。背景地図は通信時に表示されます。場所の説明は下で確認できます。':failed?'背景地図を読み込めません。一覧やGoogleマップから場所を確認できます。':`${all.filter(p=>p.kind==='plan').length}件の予定・${spots.length}件の寄り道${missing.length?'（位置未確認 '+missing.length+'件）':''}。背景地図の表示には通信が必要です。`;};
    const loadTiles=()=>{if(tiles||!navigator.onLine||localFile)return;tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'}).on('tileerror',()=>{failed=true;statusText();}).addTo(map);};
    if(!localFile){observer=new IntersectionObserver(entries=>{if(entries.some(x=>x.isIntersecting)){loadTiles();}},{rootMargin:'0px'});observer.observe(section.querySelector('.day-map'));}
    const online=()=>{failed=false;loadTiles();tiles?.redraw();statusText();};window.addEventListener('online',online);window.addEventListener('offline',statusText);cleanup=()=>{window.removeEventListener('online',online);window.removeEventListener('offline',statusText);};statusText();
    select.onchange=()=>{const p=all.find(p=>p.key===select.value);if(!p)return;show(p);if(p.location){map.setView([p.location.lat,p.location.lng],15,{animate:false});markers.get(p.key)?.openPopup();}};
    section.querySelector('[data-map-fit]').onclick=fit;
    section.querySelector('[data-map-interact]').onclick=event=>{const button=event.currentTarget,enabled=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(enabled));button.textContent=enabled?'操作を終了':'地図を操作';for(const handler of ['dragging','touchZoom','doubleClickZoom'])map[handler][enabled?'enable':'disable']();};
    section.querySelector('[data-map-expand]').onclick=event=>{const expanded=section.classList.toggle('map-expanded');event.currentTarget.setAttribute('aria-pressed',String(expanded));event.currentTarget.textContent=expanded?'元の大きさ':'大きく表示';map.invalidateSize();};
  }
  window.TripMap={markup,mount,destroy};
})();

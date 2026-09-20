(() => {
  'use strict';
  const trip = window.TRIP;
  const state = { mode: 'plan', day: 1, filter: 'all', cache: 'pending', saving: false };
  const icons = {
    calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 5h2m4 0h2"/>',
    pin:'<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z"/>',
    book:'<path d="M12 5v16M3 3h4a6 6 0 0 1 5 2 6 6 0 0 1 5-2h4v16h-4a6 6 0 0 0-5 2 6 6 0 0 0-5-2H3Z"/>',
    arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
    up:'<path d="M7 17 17 7M7 7h10v10"/>',
    car:'<path d="m4 10 2-6h12l2 6M3 10h18v8H3Zm2 8v3m14-3v3M6 14h2m8 0h2"/>',
    bed:'<path d="M3 18V5m18 13v3M3 18v3M3 15h18v-5H11v5m-8 3h18"/><circle cx="7" cy="10" r="2"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cloud:'<path d="M6 18a4 4 0 0 1-1-7 7 7 0 0 1 13-2 4.5 4.5 0 0 1 0 9Z"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    phone:'<path d="m5 3 4 1 1 5-3 1a14 14 0 0 0 7 7l1-3 5 1 1 4c-2 7-21-7-16-16Z"/>'
  };
  const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<svg aria-hidden="true" viewBox="0 0 24 24">${icons[name] || icons.pin}</svg>`;
  const mapUrl = query => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const routeUrl = (destination, origin, mode='driving') => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}${origin ? '&origin='+encodeURIComponent(origin) : ''}&travelmode=${mode}`;
  const external = (url, label, css='pill-button', iconName='up') => `<a href="${e(url)}" class="${css}" target="_blank" rel="noopener noreferrer">${icon(iconName)}${e(label)}<span class="sr-only">（新しいタブ）</span></a>`;
  const heading = (eyebrow,title,description='') => `<div class="page-heading"><div><p class="eyebrow">${e(eyebrow)}</p><h1>${e(title)}</h1>${description?`<p class="description">${e(description)}</p>`:''}</div><span class="tag">3泊4日 · RENTAL CAR</span></div>`;
  const dayNav = (mode='day',max=4) => `<nav class="days${max===3?' three-days':''}" aria-label="${mode==='stars'?'撮影する夜':'日程'}">${trip.days.slice(0,max).map(d=>`<a class="day-link${state.day===d.id?' active':''}" href="#${mode}-${d.id}" ${state.day===d.id?'aria-current="date"':''}><span class="day-number">0${d.id}</span><span class="day-date">${d.date} ${d.weekday}</span><span class="day-place">${e(d.place)}</span></a>`).join('')}</nav>`;
  function eventCard(event,index,events) {
    let previous;
    for (let j=index-1;j>=0;j--) {if(events[j].query){previous=events[j].query;break;}}
    const actions=[];
    if(event.query) actions.push(external(event.map || mapUrl(event.query),'地図','pill-button primary','pin'));
    if(event.query && previous && previous!==event.query && !event.noDirections) actions.push(external(routeUrl(event.query,previous,event.travelMode),'前の場所から','pill-button','arrow'));
    if(event.internal) actions.push(`<a href="${e(event.internal)}" class="pill-button primary">${icon('arrow')}${event.internal.startsWith('#stars')?'撮影候補を見る':'寄り道を見る'}</a>`);
    if(event.source) actions.push(external(event.source,'公式案内'));
    if(event.phone) actions.push(`<a class="pill-button" href="tel:${e(event.phone)}" aria-label="${e(event.title)}に電話">${icon('phone')}電話</a>`);
    return `<article class="stop${event.fixed?' fixed':''}"><div class="time-col">${e(event.time)}<small>${e(event.kind)}</small></div><div class="stop-body"><div class="stop-meta">${e(event.category)}</div><h3>${e(event.title)}</h3><p>${e(event.text)}</p>${event.address?`<p class="address">${e(event.address)}</p>`:''}<div class="stop-actions">${actions.join('')}</div></div>${event.leg?`<div class="leg">${icon(event.leg.includes('徒歩')?'pin':'car')}${e(event.leg)}</div>`:''}</article>`;
  }
  function noteCard(note) {return `<section class="note-card${note.warning?' warning':''}"><h3>${e(note.title)}</h3><p>${e(note.text)}</p>${note.source?external(note.source,note.label||'公式案内','text-link'):''}</section>`;}
  function renderPlan() {
    const d=trip.days[state.day-1];
    return heading('FOUR DAYS, OUR WAY','北海道、ふたり旅。') + dayNav() + `<div class="feature-layout"><section class="hero"><img src="images/${e(d.photo)}.jpg" alt="${e(d.place)}の風景" fetchpriority="high"><div class="hero-top"><span>DAY 0${d.id} / ${e(d.region)}</span><a href="#credits">PHOTO ${e(d.photo)} ↗</a></div><div class="hero-copy"><p>${e(d.route)}</p><h2>${e(d.title).replace('、','、<wbr>')}</h2><p class="hero-summary">${e(d.description)}</p></div></section><aside class="day-summary"><div><p class="eyebrow">A LITTLE REMINDER</p><h2 class="summary-title">${d.date.replace('.','月')}日（${e(d.jpWeek)}）のメモ</h2><div class="summary-facts"><div class="fact-row">${icon('clock')}<div><strong>${e(d.anchor)}</strong><span>${e(d.anchorNote)}</span></div></div><div class="fact-row">${icon(d.id===4?'pin':'bed')}<div><strong>${e(d.hotel)}</strong><span>${e(d.hotelNote)}</span></div></div></div></div><div class="summary-actions"><button class="text-link" data-timeline>予定を見る ↓</button>${external(mapUrl(d.hotelQuery),d.id===4?'夕食の地図':'宿の地図','text-link','arrow')}</div></aside></div><div class="section-heading" id="timeline-heading" tabindex="-1"><h2>この日の予定</h2><p>指定時刻以外は目安。<br>道路・混雑に合わせて調整。</p></div><div class="itinerary-layout"><div class="timeline">${d.events.map(eventCard).join('')}</div><aside class="side-stack">${d.notes.map(noteCard).join('')}<section class="note-card"><p class="eyebrow">ALONG THE WAY</p><h3>気になる寄り道を。</h3><p>ルートの近くの景色やおいしいもの。時間に余裕があるときの候補をまとめました。</p><a class="text-link" href="#explore-${d.id}">この日の寄り道 ${icon('arrow')}</a></section>${d.id<4?`<section class="note-card"><p class="eyebrow">AFTER DINNER</p><h3>晴れたら、星を撮りに。</h3><p>${d.id===2?'美瑛の丘が本命。夕食と雲の様子に合わせて、近場の候補も見比べて。':'この夜の候補と、撮影前に確認すること。'}</p><a class="text-link" href="#stars-${d.id}">撮影候補を見る ${icon('star')}</a></section>`:''}</aside></div><p class="caption">移動時間は通常時の計画目安です。積雪・渋滞・休憩で変わります。地図で当日の経路をご確認ください。</p><div class="day-end">${d.id>1?`<a href="#day-${d.id-1}">← DAY 0${d.id-1}</a>`:'<span></span>'}${d.id<4?`<a href="#day-${d.id+1}">DAY 0${d.id+1} へ ${icon('arrow')}</a>`:'<a href="#guide">旅のメモへ →</a>'}</div>`;
  }
  function renderExplore() {
    const spots=trip.spots.filter(s=>s.day===state.day && (state.filter==='all'||s.type===state.filter));
    return heading('A SMALL DETOUR','道の途中で、寄り道。','予定のルート周辺から、景色とグルメを少しずつ。余裕のある時間に。')+dayNav('explore')+`<div class="filter-bar" aria-label="寄り道の種類">${[['all','すべて'],['scenery','景色'],['food','グルメ']].map(([value,label])=>`<button data-filter="${value}" aria-pressed="${state.filter===value}">${label}</button>`).join('')}</div><div class="spot-grid" aria-live="polite">${spots.length?spots.map((s,i)=>`<article class="spot-card"><div class="spot-top"><span class="spot-type">${s.type==='scenery'?'LANDSCAPE / 景色':'FOOD / グルメ'}</span><span class="spot-number">0${i+1}</span></div><h2>${e(s.name)}</h2><p>${e(s.text)}</p><p class="spot-detour">${e(s.detour)}</p><p>${e(s.hours)}</p><p class="caption">${e(s.address)}</p><div class="stop-actions">${external(mapUrl(s.query),'地図','pill-button primary','pin')}${external(routeUrl(s.query),'ここへ行く','pill-button','arrow')}${external(s.source,'公式')}</div></article>`).join(''):'<p class="empty">この日の景色は、予定にある小樽運河と堺町の散策で。グルメの候補もチェックしてみてください。</p>'}</div><div class="callout">${icon('clock')}<p>予定への追加は任意。表示の時間は散策・買い物の目安で、混雑や車の回り道の時間は別にかかります。</p></div><a class="text-link" href="#day-${state.day}">この日の予定に戻る ${icon('arrow')}</a>`;
  }
  function renderStars() {
    const stars=trip.stars.filter(s=>s.day===state.day);
    const weather=state.day===2?'012000':'016000';
    return heading('UNDER THE NORTHERN SKY','晴れた夜に、星を撮る。','当日の雲の様子や移動のペースに合わせて、無理のない場所を選ぼう。')+`<section class="night-banner"><div><p class="eyebrow">BEST CHANCE / NIGHT 02</p><h2>本命は、美瑛の夜。</h2><p>11月9日は新月。1〜3日目の夜は月明かりが少ない時期です。美瑛の丘を第一候補に、雲・風・路面を見て撮影する夜を決める。</p><a class="text-link" href="https://eco.mtk.nao.ac.jp/koyomi/yoko/2026/rekiyou263.html" target="_blank" rel="noopener noreferrer">国立天文台の暦 ${icon('up')}</a></div><div class="moon-stats"><div class="moon-disc" aria-hidden="true"></div><div><strong>11.09</strong><span>16:02 JST / 新月</span><span>月の明るさより、雲と足元を確認</span></div></div></section>`+dayNav('stars',3)+`<div class="stop-actions">${external('https://www.jma.go.jp/bosai/forecast/#area_type=offices&area_code='+weather,'この地域の天気','pill-button primary','cloud')}${external('https://www.jma.go.jp/jma/menu/menuflash.html','雲・雪の情報','pill-button','cloud')}</div><p class="caption">予報は出発前・当日に確認。地図と最新の天気は通信が必要です。</p><div class="stars-grid">${stars.map(s=>`<article class="spot-card${s.featured?' featured':''}"><span class="tag${s.featured?' good':''}">${e(s.tag)}</span><h2>${e(s.name)}</h2><p>${e(s.text)}</p><p class="spot-detour">${e(s.travel)}</p><p>${e(s.access)}</p><p class="caption">${e(s.address)}</p><div class="stop-actions">${s.query?external(mapUrl(s.query),'地図','pill-button primary','pin'):''}${s.query?external(routeUrl(s.query,trip.days[state.day-1].hotelQuery,s.travelMode),'宿からのルート','pill-button','arrow'):''}${external(s.source,s.sourceLabel||'利用案内')}${s.phone?`<a class="pill-button" href="tel:${e(s.phone)}">${icon('phone')}観光協会に確認</a>`:''}</div></article>`).join('')}</div><div class="section-heading"><h2>出かける前に</h2></div><div class="guide-grid"><section class="note-card"><h3>撮影の持ち物</h3><ul class="check-list"><li>カメラ・広角レンズ・三脚</li><li>予備バッテリー・手袋・暖かい服</li><li>ヘッドライト・歩きやすい靴</li><li>レンズの結露対策・温かい飲み物</li></ul></section><section class="note-card"><h3>夜の行き先を決めるとき</h3><ul class="check-list"><li>宿の夕食と帰着時間を確認</li><li>駐車場の夜間利用・積雪・ゲートを確認</li><li>畑や私有地に入らず、道路の路肩で撮らない</li><li>峠・ダムの道は夜間や冬季の閉鎖に注意</li></ul>${external('https://www.city.sapporo.jp/minami/doboku/tsukodome.html','札幌市の通行規制','text-link')}</section></div><a class="text-link" href="#day-${state.day}">この日の予定に戻る ${icon('arrow')}</a>`;
  }
  function offlineText() {return state.cache==='ready'?'予定を保存しました。圏外でも確認できます。':state.cache==='failed'?'オフライン保存は未完了です。通信できる場所で再試行してください。':'予定と写真を、オフライン用に準備しています。';}
  function renderGuide() {
    return heading('BEFORE WE GO','旅のメモ。','移動と宿の連絡先、出発前に確認しておくこと。')+`<div class="guide-grid"><section class="note-card"><p class="eyebrow">NOVEMBER 7 — 10</p><h3>変えない時刻</h3><dl class="info-list"><div><dt>11月7日（土）</dt><dd>11:00 新千歳空港着<br>12:00 レンタカー貸出<br>17:00 小樽運河クルーズ</dd></div><div><dt>11月10日（火）</dt><dd>19:00 レンタカー返却の指定時刻<br>20:00 新千歳空港発</dd></div></dl><p>返却は18:00–18:15への前倒しを推奨。予約変更はまだ行っていません。</p></section><section class="note-card warning"><p class="eyebrow">CAR & AIRPORT</p><h3>レンタカーと空港送迎</h3><p>Jネットレンタカー 新千歳空港店<br>千歳市流通3-2-8<br>冬季8:00–19:00 / 送迎8:15–18:30</p><p>空港1F、バス停1番を過ぎた交番横の許可車乗降所へ。約15分間隔で送迎バスが巡回。返却前は給油の時間も確保。</p><div class="stop-actions">${external(mapUrl('Jネットレンタカー 新千歳空港店 千歳市流通3-2-8'),'地図','pill-button primary','pin')}<a class="pill-button" href="tel:0120302554">${icon('phone')}0120-302-554</a>${external(trip.sources[0][1],'公式')}</div></section><section class="note-card"><p class="eyebrow">THREE NIGHTS</p><h3>宿の案内</h3><dl class="info-list">${trip.days.slice(0,3).map((d,i)=>`<div><dt>11/${7+i} · ${i===0?'素泊まり':'夕・朝食つき'}</dt><dd>${e(d.hotel)}<br>${external(mapUrl(d.hotelQuery),'地図','text-link','pin')} ${external(['https://asarigawaonsenhotel.com/','https://www.shiroganeonsen.com/','https://www.morino-uta.com/'][i],'宿の公式サイト','text-link')}</dd></div>`).join('')}</dl></section><section class="note-card"><p class="eyebrow">BEFORE DEPARTURE</p><h3>先に確認しておくこと</h3><ul class="check-list"><li>返却の前倒しと、空港送迎の最終時刻</li><li>2・3日目の宿の夕食時刻</li><li>11/8の富良野チーズ工房の営業</li><li>就実の丘・星景候補の道路と駐車場</li><li>レンタカーの冬タイヤ、当日の積雪</li><li>航空会社の手荷物・保安検査の締切</li></ul><p>入れてある予定時刻は計画の目安です。予約が取れていることを示すものではありません。</p></section><section class="note-card"><p class="eyebrow">KEEP IT WITH YOU</p><h3>圏外でも、予定を手元に。</h3><p id="offline-detail" role="status">${offlineText()}</p><p>保存するのは旅程・住所・候補スポット・4枚の写真。地図や最新の天気、公式サイトを見るには通信が必要です。</p><button id="save-offline" class="pill-button primary" ${state.saving?'disabled':''}>${icon('download')}${state.saving?'保存中…':'オフライン保存を確認'}</button><p class="caption">ブラウザのデータを消すと保存も消えます。出発前に一度、機内モードで予定が開くか確認してください。</p><a class="text-link" href="itinerary.txt" download>テキスト版を保存 ${icon('download')}</a></section><section class="note-card"><p class="eyebrow">TRAVEL CONDITIONS</p><h3>天気と道路</h3><p>11月は雪や凍結で、移動時間が変わる季節。夜の峠道を避け、日中のうちに移動を終えられるよう調整。</p><div class="stop-actions">${external('https://www.jma.go.jp/bosai/forecast/#area_type=offices&area_code=016000','小樽・定山渓の天気','pill-button','cloud')}${external('https://www.jma.go.jp/bosai/forecast/#area_type=offices&area_code=012000','美瑛の天気','pill-button','cloud')}${external('https://www.city.sapporo.jp/minami/doboku/tsukodome.html','道路の通行規制')}</div></section></div><div class="callout">${icon('info')}<p>施設情報の確認日：2026年9月21日。臨時休業や道路状況は出発前に各公式案内で再確認。旅程は共有用で、予約番号・個人名は掲載していません。</p></div>`;
  }
  function renderCredits() {
    return heading('PHOTOGRAPHS & REFERENCES','写真と情報の出典。','採用した4枚。撮影時期が異なるため、11月の旅行当日の景色を示すものではありません。')+`<div class="credits-grid">${trip.photos.map(p=>`<article class="credit-card"><img src="images/${e(p.id)}.jpg" alt="${e(p.label)}" loading="lazy"><div class="credit-copy"><p class="eyebrow">${e(p.id)} / DAY 0${e(p.day)}</p><h2>${e(p.label)}</h2><p>写真：${e(p.author)}<br>撮影：${e(p.date)}</p><p>${e(p.note)}</p><p>${external(p.source,'元の写真','text-link')} · ${external(p.licenseUrl,p.license,'text-link')}</p><p>配信された縮小画像を使用。表示枠に合わせた切り抜き表示のみ。写真の色変更・合成はしていません。写真には上記のライセンスが適用されます。</p></div></article>`).join('')}</div><div class="section-heading"><h2>施設と旅の情報</h2><p>2026.09.21 確認</p></div><section class="note-card"><p>各施設・候補スポットの「公式」ボタンから個別の出典を開けます。移動時間は計画用の概算で、ナビによる実測値ではありません。</p><ul class="source-list">${trip.sources.map(([label,url])=>`<li><a href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)}</a></li>`).join('')}</ul></section>`;
  }
  function render() {
    document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon);});
    document.querySelectorAll('.main-nav a').forEach(a=>{
      const active=state.mode===a.dataset.mode || state.mode==='credits' && a.dataset.mode==='guide';
      if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
      if(a.dataset.mode==='plan')a.href='#day-'+state.day;
      if(a.dataset.mode==='explore')a.href='#explore-'+state.day;
      if(a.dataset.mode==='stars')a.href='#stars-'+Math.min(state.day,3);
    });
    document.getElementById('main').innerHTML=state.mode==='plan'?renderPlan():state.mode==='explore'?renderExplore():state.mode==='stars'?renderStars():state.mode==='credits'?renderCredits():renderGuide();
    document.title=(state.mode==='plan'?`DAY ${state.day} ${trip.days[state.day-1].place}`:state.mode==='stars'?'星景撮影':state.mode==='explore'?'寄り道':state.mode==='credits'?'写真と出典':'旅のメモ')+'｜北海道、ふたり旅。';
    updateConnection();
  }
  function parseRoute() {
    const hash=location.hash.slice(1);
    const match=/^(day|explore|stars)-([1-4])$/.exec(hash);
    if(match && !(match[1]==='stars' && match[2]==='4')) {state.mode=match[1]==='day'?'plan':match[1];state.day=Number(match[2]);}
    else if(hash==='guide'||hash==='credits')state.mode=hash;
    else {
      const date=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Tokyo'}).format(new Date());
      const day=trip.days.find(d=>date===`2026-11-${String(d.id+6).padStart(2,'0')}`);
      state.day=day?day.id:1;state.mode='plan';
    }
    state.filter='all';
    render();
  }
  function updateConnection() {
    const prefix=navigator.onLine?'オンライン':'オフライン';
    const status=state.cache==='ready'?'予定・写真は保存済み':state.cache==='pending'?'オフライン用に準備中':'オフライン保存は未完了';
    document.getElementById('connection-status').textContent=`${prefix} · ${status} / 地図・最新の天気は通信が必要です`;
    const detail=document.getElementById('offline-detail');if(detail)detail.textContent=offlineText();
    const btn=document.getElementById('save-offline');if(btn){btn.disabled=state.saving;btn.innerHTML=icon('download')+(state.saving?'保存中…':'オフライン保存を確認');}
  }
  let toastTimer;
  function toast(text) {const el=document.getElementById('toast');el.textContent=text;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{el.hidden=true;},4500);}
  async function checkOffline() {
    state.saving=true;updateConnection();
    try {
      if(!('serviceWorker' in navigator))throw new Error('unsupported');
      const registration=await navigator.serviceWorker.register('sw.js',{scope:'./',updateViaCache:'none'});
      const ready=await Promise.race([navigator.serviceWorker.ready,new Promise((_,reject)=>setTimeout(()=>reject(new Error('timeout')),18000))]);
      const worker=ready.active || registration.active;
      const saved=await new Promise((resolve,reject)=>{
        const channel=new MessageChannel();const timer=setTimeout(()=>reject(new Error('timeout')),12000);
        channel.port1.onmessage=event=>{clearTimeout(timer);channel.port1.close();resolve(event.data.ready===true);};
        worker.postMessage({type:'CHECK_CACHE'},[channel.port2]);
      });
      state.cache=saved?'ready':'failed';
    } catch {state.cache='failed';}
    finally {state.saving=false;updateConnection();}
    return state.cache==='ready';
  }
  document.addEventListener('click',async event=>{
    if(event.target.closest('.skip-link')) {event.preventDefault();document.getElementById('main').focus();document.getElementById('main').scrollIntoView();return;}
    if(event.target.closest('[data-timeline]')) {const heading=document.getElementById('timeline-heading');heading.focus({preventScroll:true});heading.scrollIntoView({block:'start'});return;}
    const filter=event.target.closest('[data-filter]');
    if(filter) {state.filter=filter.dataset.filter;render();document.querySelector(`[data-filter="${state.filter}"]`)?.focus({preventScroll:true});}
    if(event.target.closest('#save-offline')) {const ok=await checkOffline();toast(ok?'予定・住所・写真を保存済みです。':'保存できませんでした。通信を確認して再試行してください。');}
  });
  window.addEventListener('hashchange',()=>{parseRoute();window.scrollTo({top:0,behavior:'instant'});document.getElementById('main').focus({preventScroll:true});});
  window.addEventListener('online',updateConnection);window.addEventListener('offline',updateConnection);
  if('serviceWorker' in navigator)navigator.serviceWorker.addEventListener('message',event=>{if(event.data?.type==='CACHE_READY'){state.cache='ready';updateConnection();}});
  parseRoute();checkOffline();
})();

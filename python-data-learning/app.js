'use strict';
const C = window.COURSE;
const lessons = C.chapters.flatMap(c => c.lessons.map(l => ({...l, chapter:c.title, setup:c.setup})));
const chapterIndexes={
  pandas:{chapter:'pandas',heading:'表を読む・整える・集計する',lead:'HPLCの測定表を使って、pandasの主要な機能を学びます。目的に合う操作を選び、処理前後の行数や値を確かめながら進めましょう。',intro:'まずPD-01〜PD-05で、CSVの読込から集計・保存までを体験します。その後、目次の順に操作の幅を広げます。',searchExamples:'欠損、結合、read_csv、PD-01',fallbackUnit:'01 表を扱う基本'},
  numpy:{chapter:'NumPy',heading:'配列を使って、数値を計算する',lead:'架空のHPLC測定データを使い、配列の作成、形と型、抽出、集計から乱数・線形代数・保存へ進みます。pandasで扱った測定値をNumPyで計算し、結果の読み方と確かめ方を学びます。',intro:'まずNP-01〜NP-03で、配列の基本、集計する方向（axis）、乱数生成を体験します。その後は目次の順に進み、配列の操作と数値計算を学びましょう。',searchExamples:'スライス、reshape、axis、NP-01',fallbackUnit:'01 配列と計算を体験する'},
  matplotlib:{chapter:'Matplotlib',heading:'図の種類を選び、軸や配置を整える',lead:'架空のHPLC測定データを使い、図の作成から軸・凡例・配色の調整、保存までを学びます。FigureとAxesの役割を確かめながら、比べたいことが伝わる図を描きましょう。',intro:'まずMPL-01〜MPL-03で、棒グラフや散布図、複数の図の描画と保存を体験します。その後は目的に合う図の選び方、軸・凡例・注釈、配置と色の調整へ進みます。',searchExamples:'散布図、凡例、subplots、MPL-01',fallbackUnit:'01 最初の図を描く'},
  seaborn:{chapter:'seaborn',heading:'DataFrameから、分布と関係を描く',lead:'架空のHPLC測定データを使い、seabornで分布や群の違い、変数の関係を描きます。DataFrameの列を軸・色・配置に対応させ、図から何を読み取れるか確かめながら進めましょう。',intro:'まずSNS-01〜SNS-03で、分布や群の比較、散布図と相関を体験します。その後、回帰や複数変数の比較、行列の可視化、スタイル設定、objectsによる作図へ進みます。',searchExamples:'分布、カテゴリ、histplot、SNS-01',fallbackUnit:'01 DataFrameから図を描く'},
  'scikit-learn':{chapter:'scikit-learn',heading:'前処理から予測・評価まで、一連の手順を学ぶ',lead:'架空のHPLC測定データを使い、回帰・分類、前処理、モデルの比較と評価を学びます。訓練データで学習する範囲と最終テストの役割を分け、予測結果と限界を説明できるように進めましょう。',intro:'まずML-01〜ML-06で、特徴量と目的変数、分割、Pipeline、回帰・分類と交差検証を体験します。その後、前処理と予測手法、評価・モデル選択、次元削減やクラスタリングへ進みます。',searchExamples:'Pipeline、cross_validate、PCA、ML-01',fallbackUnit:'01 予測と評価を体験する'}
};
Object.entries(chapterIndexes).forEach(([route,index])=>{index.route=route;index.lessons=lessons.filter(l=>l.chapter===index.chapter);});
const chapterIndexFor=title=>Object.values(chapterIndexes).find(index=>index.chapter===title);
function chapterUnits(index,items=index.lessons){const groups=new Map();items.forEach(l=>{const unit=l.unit||index.fallbackUnit;if(!groups.has(unit))groups.set(unit,[]);groups.get(unit).push(l);});return [...groups].map(([title,items])=>({title,items}));}
const localMode=['localhost','127.0.0.1'].includes(location.hostname);
const key='hplc-python-learning-v1';
const state={page:'home',done:new Set(),menu:false,storage:true};
try{const saved=JSON.parse(localStorage.getItem(key)||'[]'); if(Array.isArray(saved))state.done=new Set(saved.filter(id=>lessons.some(l=>l.id===id)));}catch(e){state.storage=false;}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link=(id,text)=>`<a href="#${id}">${text}</a>`;
let codeIndex=0;
function code(s,label='Python'){const id=`code-${++codeIndex}`;return `<div class="code-box"><div class="code-head"><span>${label}</span><button class="copy" data-copy="${id}" aria-label="${label}のコードをコピー">コピー</button></div><pre tabindex="0"><code id="${id}">${esc(s)}</code></pre></div>`;}
function list(xs){return `<ul>${xs.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;}
function announce(s){document.querySelector('#status').textContent=s;}
function lessonNavLink(l){return `<a href="#${l.id}" ${state.page===l.id?'aria-current="page"':''}><span class="nav-id">${l.id}</span>${esc(l.title)}${state.done.has(l.id)?' ✓ 完了':''}</a>`;}
function navHTML(){return `<p class="nav-top">LEARNING GUIDE</p>${link('home','学習の全体像')}<p class="progress-label">完了 ${state.done.size} / ${lessons.length} レッスン</p><progress value="${state.done.size}" max="${lessons.length}" aria-label="学習の進捗"></progress>${C.chapters.map((c,i)=>{const index=chapterIndexFor(c.title);return `<p class="nav-chapter">${String(i).padStart(2,'0')}　${esc(c.title)}</p>${index?`<a class="chapter-index" href="#${index.route}" ${state.page===index.route?'aria-current="page"':''}>${esc(c.title)}の全体像・機能から探す</a>${chapterUnits(index).map((u,j)=>`<details class="nav-unit" ${j===0||u.items.some(l=>l.id===state.page)?'open':''}><summary>${esc(u.title)}<span>${u.items.length}レッスン</span></summary>${u.items.map(lessonNavLink).join('')}</details>`).join('')}`:c.lessons.map(lessonNavLink).join('')}`;}).join('')}<p class="nav-chapter">困ったとき・教材</p>${link('python','Pythonの補足')}${link('data','データと用語')}${link('downloads','教材ダウンロード')}${link('start','環境構築とJupyterLab')}`;}
function apiList(apis){return apis?.length?`<ul class="api-list" aria-label="扱う主な機能">${apis.map(a=>`<li><code>${esc(a)}</code></li>`).join('')}</ul>`:'';}
function chapterResults(index,items){return chapterUnits(index,items).map(u=>`<section class="chapter-unit"><div class="unit-heading"><h2>${esc(u.title)}</h2><span>${u.items.length}レッスン · 約${u.items.reduce((s,l)=>s+l.minutes,0)}分</span></div><ol class="lesson-cards">${u.items.map(l=>`<li><article><div class="card-meta"><span class="lesson-id">${l.id}</span><span>目安 ${l.minutes}分</span>${state.done.has(l.id)?'<span class="done-label">✓ 完了</span>':''}</div><h3>${link(l.id,esc(l.title))}</h3><p>${esc(l.goals[0]||l.scenario||'')}</p>${apiList(l.apis)}</article></li>`).join('')}</ol></section>`).join('');}
function chapterOverview(index){const items=index.lessons;const first=items[0];return `<span class="eyebrow">${esc(index.chapter.toUpperCase())} / LEARNING MAP</span><h1>${esc(index.heading)}</h1><p class="lead">${esc(index.lead)}</p><div class="meta"><span class="tag">${items.length}レッスン</span><span class="tag">各20〜40分</span><span class="tag">完了 ${items.filter(l=>state.done.has(l.id)).length} / ${items.length}</span></div><section class="chapter-entry"><div><h2>初めて学ぶ方へ</h2><p>${esc(index.intro)}</p><a class="button primary" href="#${first.id}">${first.id}から始める →</a></div><div><h2>復習する方へ</h2><p>下の検索で、演習ID・機能名・API名から探せます。各ページに前提知識と準備セルがあります。</p><a href="#start">Notebookの開き方を確認する →</a></div></section><div class="lesson-search"><label for="${index.route}-search">${esc(index.chapter)}のレッスンを探す</label><p id="search-help">例：${esc(index.searchExamples)}。空白で区切ると、すべての語を含むレッスンを探します。</p><div class="search-controls"><input id="${index.route}-search" type="search" autocomplete="off" aria-describedby="search-help" aria-controls="${index.route}-results" placeholder="機能名・API名・演習ID"><button id="clear-search" type="button">検索をクリア</button></div><p id="search-count" role="status" aria-live="polite">${items.length}件のレッスン</p></div><div id="${index.route}-results">${chapterResults(index,items)}</div><p class="note">Notebookは全章共通の2ファイルです。章の準備セルを実行し、ページと同じ演習IDへ進みます。${link('downloads','教材一式をダウンロードする')}</p>`;}
function home(){return `<section class="hero"><span class="eyebrow">手を動かして、分析を自分の力に。</span><h1>測定データから、<br>Pythonを学ぼう。</h1><p class="lead">CSVを開くところから、グラフづくり、予測モデルまで。架空のHPLC・生薬分析データを使い、ひとつずつ試す日本語の学習教材です。</p><div class="actions"><a class="button primary" href="#PREP-01">学習を始める →</a><a class="button" href="#PD-01">pandasの最初の体験へ</a></div><small>Pythonの基本文法を少し知っている方へ ／ 1レッスン20〜40分 ／ 全${lessons.length}レッスン</small></section><section><h2>ひとつのデータを、5つの道具で。</h2><div class="route"><div><span>01</span><b>pandas</b>表を整える</div><div><span>02</span><b>NumPy</b>数値を計算する</div><div><span>03</span><b>Matplotlib</b>図の細部を整える</div><div><span>04</span><b>seaborn</b>分布・関係を見る</div><div><span>05</span><b>scikit-learn</b>予測を確かめる</div></div><h2>読む → 動かす → 解く → 理由を確かめる</h2><p>まず${link('start','環境構築')}を済ませ、サイトとJupyterLabを並べて開きます。各ページの例題を試したら、<code>exercises.ipynb</code>で同じ演習IDを探しましょう。解答は${link('downloads','解答Notebook')}を自分で開いて確認します。</p><p class="note">教材全体でNotebookは2ファイル。各章の準備セルを実行すれば、前の章が未回答でも続けられます。Pythonの文法は使う直前に説明し、${link('python','補足ページ')}でも復習できます。</p></section><h2>学習の道順</h2><ol class="course-list">${C.chapters.map((c,i)=>`<li><a href="#${chapterIndexFor(c.title)?.route||c.lessons[0].id}"><span class="course-number">${String(i).padStart(2,'0')}</span><span><strong>${esc(c.title)}</strong><small>${c.lessons.length}レッスン · 約${c.lessons.reduce((s,l)=>s+l.minutes,0)}分</small></span><span aria-hidden="true">→</span></a></li>`).join('')}</ol><p class="muted">学習完了はこのブラウザ内に保存されます。ブラウザやポートを変えると引き継がれません。</p>`;}
function lessonHTML(l){
  const n=lessons.findIndex(x=>x.id===l.id);
  const index=chapterIndexFor(l.chapter);
  const references=(l.references||[]).filter(r=>/^https?:\/\//.test(r.url));
  return `${index?`<p class="back-to-chapter"><a href="#${index.route}">← ${esc(index.chapter)}の全体像・機能から探す</a></p>`:''}<span class="eyebrow">${esc(l.chapter)} / ${l.id}</span><h1>${esc(l.title)}</h1><div class="meta"><span class="tag">目安 ${l.minutes}分</span><span class="tag">演習 ${l.id}</span>${l.unit?`<span class="tag">${esc(l.unit)}</span>`:''}</div>${l.scenario?`<p class="scenario"><strong>使う場面</strong>${esc(l.scenario)}</p>`:''}<p><strong>前提知識：</strong>${esc(l.prerequisites)}</p>${apiList(l.apis)}<section class="goals"><h2>このレッスンでできること</h2>${list(l.goals)}</section><nav class="page-toc" aria-label="このページの目次"><p>このページで学ぶこと</p><ol></ol></nav><div class="lesson-explanation">${l.explanation_html}</div><details><summary>この章の準備セルを表示</summary><p>JupyterLabで教材フォルダのNotebookを開き、このコードを最初に実行します。前の章の回答は不要です。</p>${code(l.setup,'章の準備')}</details><h2>例題を動かす</h2><p class="muted">これは学習用の例題です。下の演習とは条件が異なります。</p>${code(l.example)}<p class="output-label">実行結果（同梱データで検証済み）</p><div class="output" tabindex="0">${l.output_html}</div><p>${esc(l.reading)}</p>${l.try_it?.length?`<section class="try-it"><h2>条件を変えて試す</h2><p>例題のコードをコピーし、次の変更を試します。変える前に結果を予想し、実行後に確かめましょう。</p>${list(l.try_it)}</section>`:''}<h2>よくある間違い</h2>${list(l.mistakes)}<section class="exercise"><h2>演習 ${l.id}</h2><p>${esc(l.exercise.prompt)}</p><p><code>exercises.ipynb</code>で <strong>${l.id}</strong> を検索し、この章の準備セル→TODOセル→自己確認セルの順に実行します。</p>${l.exercise.hints.map((h,i)=>`<details><summary>ヒント${i+1}を見る</summary><p>${esc(h)}</p></details>`).join('')}<p><a href="#start">JupyterLabで演習を開く手順 →</a></p></section><h2>振り返り</h2>${list(l.reflection)}<p><a href="#solutions">解いた後に、解答Notebookを開く →</a></p>${references.length?`<details class="references"><summary>公式ドキュメントで確認する</summary><ul>${references.map(r=>`<li><a href="${esc(r.url)}">${esc(r.title)}</a></li>`).join('')}</ul></details>`:''}<label class="complete"><input id="complete" type="checkbox" ${state.done.has(l.id)?'checked':''}> このレッスンを学習済みにする</label><div class="bottom-nav">${n?link(lessons[n-1].id,`← ${esc(lessons[n-1].title)}`):link('home','← 学習の全体像')}${n<lessons.length-1?link(lessons[n+1].id,`${esc(lessons[n+1].title)} →`):link('home','学習の全体像へ →')}</div>`;
}
function setupPageToc(main,lesson){
  const toc=main.querySelector('.page-toc ol');
  if(!toc)return;
  const headings=[...main.querySelectorAll('h2, .lesson-explanation h3')].filter(h=>!h.closest('.goals'));
  headings.forEach((heading,i)=>{
    heading.id=`section-${lesson.id}-${i}`;
    heading.tabIndex=-1;
    const item=document.createElement('li');
    if(heading.tagName==='H3')item.className='toc-subheading';
    const button=document.createElement('button');
    button.type='button';
    button.textContent=heading.textContent;
    button.addEventListener('click',()=>{heading.focus({preventScroll:true});heading.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
    item.append(button);toc.append(item);
  });
}
function setupChapterSearch(main,index){
  if(!index)return;
  const input=main.querySelector(`#${index.route}-search`);
  if(!input)return;
  const update=()=>{
    const terms=input.value.normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean);
    const found=index.lessons.filter(l=>{
      const haystack=[l.id,l.title,l.unit,l.scenario,...(l.apis||[]),...l.goals].join(' ').normalize('NFKC').toLowerCase();
      return terms.every(term=>haystack.includes(term));
    });
    main.querySelector(`#${index.route}-results`).innerHTML=found.length?chapterResults(index,found):'<p class="no-results">該当するレッスンがありません。語句を短くするか、検索をクリアしてください。</p>';
    main.querySelector('#search-count').textContent=`${found.length}件のレッスン${terms.length?'が見つかりました':''}`;
  };
  input.addEventListener('input',update);
  main.querySelector('#clear-search').addEventListener('click',()=>{input.value='';update();input.focus();});
}
function setupAnimations(main){
  main.querySelectorAll('details.animation-demo').forEach(details=>{
    const content=details.querySelector('.animation-content');
    const summary=details.querySelector('summary');
    if(!content||!summary)return;
    const template=document.createElement('template');
    template.content.append(...content.childNodes);
    details.append(template);
    details.open=false;
    summary.textContent='アニメーションを再生';
    details.addEventListener('toggle',()=>{
      content.replaceChildren();
      if(details.open)content.append(template.content.cloneNode(true));
      summary.textContent=details.open?'アニメーションを停止':'アニメーションを再生';
    });
  });
}
function downloads(solutionOnly=false){return `<span class="eyebrow">LEARNING MATERIALS</span><h1>${solutionOnly?'解答を確認する':'教材ダウンロード'}</h1><p>初めて使う場合は、データ・フォント・READMEを含む教材一式をダウンロードして、ZIPを展開してください。Notebookだけではデータを読み込めません。</p><div class="download-item"><h2>教材一式</h2><p>学習サイト、演習・解答Notebook、架空CSV、日本語フォント、環境構築手順を含みます。</p><a class="button primary" href="downloads/python-data-learning.zip" download>教材一式を保存（ZIP） ↓</a></div><div class="download-item"><h2>演習用Notebook</h2><p>全章の問題・ヒント・TODO・自己確認を収録。解答コードや解答の実行出力は含みません。</p><a class="button" href="exercises.ipynb" download>exercises.ipynb を保存 ↓</a></div><div class="download-item"><h2>解答確認用Notebook</h2><p>全章の実行できる解答・結果・考え方を収録しています。</p><details ${solutionOnly?'open':''}><summary>自分で解いたので、解答へのリンクを表示する</summary><p><a class="button" href="solutions.ipynb" download>solutions.ipynb を保存 ↓</a></p></details></div><p><a href="#start">ダウンロード後の環境構築と起動手順 →</a></p>`;}
function start(){return `<span class="eyebrow">GET STARTED</span><h1>JupyterLabで学習を始める</h1><p>${localMode?"このワークスペースでは環境を構築済みです。ターミナルで教材フォルダに移動し、下の起動コマンドを使えます。別の場所へ展開した場合は初回セットアップを行います。":"まず教材ダウンロードからZIPを取得し、すべて展開してください。Pythonの実行には手元のJupyterLabを使います。次の初回セットアップから始めましょう。"}</p><h2>1. 初回だけ、環境を作る</h2><p>Python 3.12を推奨します。ZIPを展開し、ターミナルで展開した<code>python-data-learning</code>フォルダへ移動します。以下はmacOS/Linux用です。Windowsの手順はREADMEにもあります。</p>${code('python3.12 -m venv .venv\nsource .venv/bin/activate\npython -m pip install -r requirements.txt','ターミナル：初回セットアップ')}<details><summary>Windows PowerShellの場合</summary>${code('py -3.12 -m venv .venv\n.venv\\Scripts\\python.exe -m pip install -r requirements.txt\n.venv\\Scripts\\python.exe -m jupyterlab','PowerShell')}</details><h2>2. JupyterLabを起動する</h2>${code('source .venv/bin/activate\npython -m jupyterlab','ターミナル：Notebookを開く')}<p>開いたブラウザの左側に<code>data</code>や<code>exercises.ipynb</code>が見えることを確認し、<code>exercises.ipynb</code>をダブルクリックします。Python 3カーネル（コードを実行するPython）を選択してください。ターミナルは開いたままにします。</p><h2>3. 最初の演習へ進む</h2><p>Notebook内検索（Ctrl+F / Cmd+F）で<code>PD-01</code>を探します。初回は${link('PREP-01','準備レッスン')}のセル操作を確認し、pandas章の準備セルを実行します。次に例題→TODO→自己確認の順で実行します。セルを選んでShift+Enterを押すと実行して次へ進みます。</p><p>保存はCtrl+S / Cmd+S。KernelメニューのRestart Kernelで変数が消えます。再開時は必要な準備セルを実行し直します。「Restart Kernel and Run All Cells」は先頭からの再現確認に使います。未回答のTODOはエラーにならず、未回答と表示されます。</p><h2>サイトも起動する場合</h2><p>別のターミナルで同じ教材フォルダに移動して実行します。</p>${code('python3 serve.py','ターミナル：学習サイト')}<p>ブラウザで<a href="http://localhost:5186/site/">http://localhost:5186/site/</a>を開きます。終了は各ターミナルでCtrl+Cです。</p><h2>うまく動かないとき</h2><ul><li>FileNotFoundError：Notebookとdataフォルダを同じ教材フォルダへ戻します。</li><li>ModuleNotFoundError：仮想環境でインストールし、そのPythonからJupyterLabを起動します。</li><li>NameError：章の準備セルを実行します。画面の上下ではなく、実際の実行順で変数が決まります。</li><li>日本語が四角になる：assetsフォルダを含めて展開し、setup_plotting()を再実行します。seabornのテーマ設定後にも再設定します。</li><li>ポート使用中：サイトは<code>python3 serve.py --port 5187</code>で起動できます。</li></ul>`;}
function positionCurrentNav(){
  const nav=document.querySelector('#toc');
  const current=nav.querySelector('[aria-current="page"]');
  if(current && nav.clientHeight && nav.scrollHeight>nav.clientHeight){
    const offset=current.getBoundingClientRect().top-nav.getBoundingClientRect().top+nav.scrollTop;
    nav.scrollTop=Math.max(0,offset-nav.clientHeight*.35);
  }
}
function render({focus=false}={}){codeIndex=0;state.page=decodeURIComponent(location.hash.slice(1)||'home');const l=lessons.find(x=>x.id===state.page);const index=Object.hasOwn(chapterIndexes,state.page)?chapterIndexes[state.page]:null;let html;if(l)html=lessonHTML(l);else if(state.page==='home')html=home();else if(index)html=chapterOverview(index);else if(state.page==='downloads'||state.page==='solutions')html=downloads(state.page==='solutions');else if(state.page==='start')html=start();else if(state.page==='python'||state.page==='data')html=C.pages[state.page];else html='<h1>ページが見つかりません</h1><p><a href="#home">学習の全体像へ戻る</a></p>';document.querySelector('#toc').innerHTML=navHTML();const main=document.querySelector('#main');main.innerHTML=html;setupAnimations(main);if(l)setupPageToc(main,l);setupChapterSearch(main,index);document.title=(l?`${l.id} ${l.title}`:index?`${index.chapter}の全体像・機能索引`:'分析の手習い')+' — Pythonデータ分析';document.querySelector('aside').classList.toggle('open',state.menu);document.querySelector('#menu').setAttribute('aria-expanded',String(state.menu));document.querySelector('#menu').textContent=state.menu?'学習目次を閉じる':'学習目次を開く';positionCurrentNav();if(focus){main.focus({preventScroll:true});window.scrollTo({top:0,left:0,behavior:'instant'});}main.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.getElementById(b.dataset.copy).textContent);announce('コードをコピーしました。');}catch(e){announce('コピーできませんでした。コードを選択し、Ctrl+C / Cmd+Cでコピーしてください。');}}));const checkbox=main.querySelector('#complete');if(checkbox)checkbox.addEventListener('change',()=>{if(checkbox.checked)state.done.add(l.id);else state.done.delete(l.id);try{localStorage.setItem(key,JSON.stringify([...state.done]));state.storage=true;}catch(e){state.storage=false;}render();document.querySelector('#complete').focus();announce(state.storage?'学習状況を保存しました。':'このブラウザでは保存できません。今回開いている間だけ記録します。');});}
document.querySelector('#menu').addEventListener('click',()=>{state.menu=!state.menu;document.querySelector('aside').classList.toggle('open',state.menu);document.querySelector('#menu').setAttribute('aria-expanded',String(state.menu));document.querySelector('#menu').textContent=state.menu?'学習目次を閉じる':'学習目次を開く';});
document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();document.querySelector('#main').focus();});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',event=>{if(event.matches)document.querySelectorAll('details.animation-demo[open]').forEach(details=>{details.open=false;});});
window.addEventListener('hashchange',()=>{state.menu=false;announce('');render({focus:true});});render();

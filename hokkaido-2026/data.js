window.TRIP = {
  updated: '2026-09-21',
  days: [
    {id:1,date:'11.07',weekday:'SAT',jpWeek:'土',place:'小樽・朝里',region:'OTARU / ASARIGAWA',title:'運河の灯りに、会いに。',description:'空港でラーメンを食べて小樽へ。堺町を散策し、夕方は運河クルーズ。',photo:'P03',route:'新千歳 → 小樽 → 朝里川温泉',anchor:'17:00 運河クルーズ',anchorNote:'16:45までに乗船手続き',hotel:'朝里川温泉ホテル',hotelNote:'素泊まり / 翌朝のパンを小樽で',hotelQuery:'朝里川温泉ホテル 小樽市朝里川温泉2-670',
      notes:[{title:'空港では時間を見ながら',text:'11:00到着から昼食・送迎をはさんで12:00貸出は短め。荷物受取やラーメンの行列が長ければ、お店に遅れる旨を連絡。',source:'https://www.j-netrentacar.co.jp/hokkaido/shinchitose_airport/',label:'送迎の案内'},{title:'明日の朝ごはんを忘れずに',text:'小樽でパンを買ってから宿へ。翌日は美瑛まで移動が長いので、8:00出発を目安に。'}],
      events:[
        {time:'11:00',kind:'指定時刻',category:'ARRIVAL',title:'新千歳空港に到着',text:'荷物を受け取り、国内線ターミナルへ。',query:'新千歳空港 国内線ターミナル',address:'千歳市美々 新千歳空港',fixed:true},
        {time:'到着後',kind:'昼食',category:'LUNCH',title:'らーめん空 新千歳空港店',text:'国内線3F・北海道ラーメン道場。通常10:00–20:00。行列とレンタカーの時間を確認して。',query:'らーめん空 新千歳空港店',address:'新千歳空港 国内線ターミナル3F',source:'https://www.hokkaido-airports.com/ja/new-chitose/spend/shop/238/',travelMode:'walking',leg:'空港内を徒歩 → 店舗へは送迎バス'},
        {time:'12:00',kind:'指定時刻',category:'RENTAL CAR',title:'Jネットレンタカーで出発',text:'空港1Fのバス停1番を過ぎた交番横の許可車乗降所から送迎。空港内にカウンターはありません。',query:'Jネットレンタカー 新千歳空港店 千歳市流通3-2-8',address:'千歳市流通3-2-8',source:'https://www.j-netrentacar.co.jp/hokkaido/shinchitose_airport/',phone:'0120302554',fixed:true,noDirections:true,leg:'小樽まで車 約90–120分（高速利用の目安）'},
        {time:'14:00',kind:'目安',category:'WALK & BREAD',title:'小樽・堺町通りを散策',text:'お店をのぞきながら街歩き。翌朝のパンも購入。小樽駅と堺町通りは少し離れているので、歩く時間も確保。',query:'小樽堺町通り商店街',address:'小樽市堺町周辺',source:'https://otaru-sakaimachi.com/',leg:'メルヘン交差点から乗船場まで徒歩 約20–25分'},
        {time:'16:30',kind:'集合目安',category:'CHECK IN',title:'中央橋の乗船場へ',text:'乗船手続きは16:45まで。17:00発の便に合わせて、少し早めに到着。',query:'小樽運河クルーズ 中央橋',address:'小樽市港町5-4 中央橋',source:'https://otaru.cc/',travelMode:'walking'},
        {time:'17:00',kind:'指定時刻',category:'CANAL CRUISE',title:'小樽運河ナイトクルーズ',text:'約40分の船旅。11月の公式時刻表でも17:00便を確認。天候による運休は当日確認。',query:'小樽運河クルーズ 中央橋',address:'中央橋発着 / 17:00–17:40',source:'https://otaru.cc/wp-content/uploads/2026/08/2026_1101_1130.pdf',fixed:true,travelMode:'walking'},
        {time:'18:00',kind:'夕食の目安',category:'DINNER',title:'焼肉ジンギスカン 店名なし',text:'送ってもらった地図のお店。通常17:00–23:00、不定休。予約時刻は未確認。',query:'焼肉ジンギスカン 店名なし 小樽市花園1-2-6',map:'https://maps.app.goo.gl/pMdyG7RURZGMkgHw8?g_st=ic',address:'小樽市花園1-2-6',source:'https://tenmeinashi.com/access.html',phone:'0134211129',travelMode:'walking',leg:'宿まで車 約25–35分'},
        {time:'19:30',kind:'目安',category:'STAY',title:'朝里川温泉ホテル',text:'今夜は素泊まり。チェックイン15:00–20:00、チェックアウト8:00–10:00。星を撮りに行くなら、先に宿の手続きを。',query:'朝里川温泉ホテル 小樽市朝里川温泉2-670',address:'小樽市朝里川温泉2-670',source:'https://asarigawaonsenhotel.com/'}
      ]},
    {id:2,date:'11.08',weekday:'SUN',jpWeek:'日',place:'富良野・美瑛',region:'FURANO / BIEI',title:'丘を越えて、青い池へ。',description:'チーズ工房や見晴らしのよい丘をめぐり、青い池を見てから宿へ。',photo:'P04',route:'朝里 → 富良野 → 美瑛 → 白金温泉',anchor:'08:00 出発が目安',anchorNote:'丘は明るいうちに / 遅れたら短縮',hotel:'碧の美 ゆゆ',hotelNote:'夕・朝食つき / 夕食時刻は未定',hotelQuery:'碧の美 ゆゆ 美瑛町白金',
      notes:[{title:'チーズ工房の営業を確認',text:'11月第2週に整備休業の予定があります。11/8の営業を事前確認。ピッツァは通常10:30–16:00、生地がなくなり次第終了。',source:'https://www.furano-cheese.jp/',label:'営業案内',warning:true},{title:'丘は、日があるうちに',text:'就実の丘を含むコースは移動が長め。降雪後の通行・駐車可否は未確認。遅れた場合は就実の丘を短縮し、青い池と宿へ向かう案も。'},{title:'白金温泉へは美瑛市街から',text:'上富良野から山を越える経路は冬季閉鎖があります。国道237号で美瑛へ進み、道道966号で白金温泉へ。',source:'https://www.shiroganeonsen.com/access/',label:'宿のアクセス案内'}],
      events:[
        {time:'07:00',kind:'目安',category:'BREAKFAST',title:'昨日買ったパンで朝ごはん',text:'宿で朝食を済ませ、長めのドライブに備える。',query:'朝里川温泉ホテル 小樽市朝里川温泉2-670',address:'朝里川温泉ホテル'},
        {time:'08:00',kind:'目安',category:'DEPARTURE',title:'朝里川温泉を出発',text:'富良野へ。途中で一度休憩をとる想定。路面状況に合わせて時間に余裕を。',query:'朝里川温泉ホテル 小樽市朝里川温泉2-670',address:'朝里川温泉ホテル',leg:'富良野まで車 約3–3.5時間（休憩込み）'},
        {time:'11:30',kind:'目安・要営業確認',category:'LUNCH',title:'富良野チーズ工房',text:'工房で昼食。11月第2週の整備休業予定があるため、11/8の営業は事前に確認。',query:'富良野チーズ工房',address:'富良野市中五区',source:'https://www.furano-cheese.jp/',phone:'0167231156',leg:'三愛の丘まで車 約45–60分'},
        {time:'13:15',kind:'目安',category:'LANDSCAPE',title:'三愛の丘展望公園',text:'丘の広がりとカラマツを眺める時間。紅葉の進み方はその年次第。無料駐車場あり、冬季はトイレ使用不可。',query:'三愛の丘展望公園',address:'上川郡美瑛町みどり',source:'https://www.biei-hokkaido.jp/ja/facility/san-ai-no-oka_view-park',leg:'就実の丘まで車 約30–40分'},
        {time:'14:15',kind:'目安・道路確認',category:'LANDSCAPE',title:'就実の丘',text:'起伏のある丘と山並み。降雪後の道路と駐車場所は直前確認。畑や農道の路肩へは入らず、条件が悪ければ見送る。',query:'就実の丘 旭川市西神楽',address:'旭川市西神楽就実地区',source:'https://www.visit-hokkaido.jp/spot/detail_10518.html',leg:'青い池まで車 約40–55分'},
        {time:'15:30',kind:'目安',category:'BLUE POND',title:'白金青い池',text:'日中の池を見てから宿へ。駐車場8:00–21:30、普通車1,000円。夜に戻る場合、11月の点灯は17:00–21:00。',query:'白金青い池 駐車場',address:'上川郡美瑛町白金',source:'https://town.biei.hokkaido.jp/culture/event/illuminate.html',leg:'宿まで車 約5–10分'},
        {time:'16:30',kind:'目安',category:'STAY',title:'碧の美 ゆゆ',text:'夕・朝食つき。夕食時刻は予約内容を確認。夕食つきプランの最終チェックインは19:00。',query:'碧の美 ゆゆ 美瑛町白金',address:'上川郡美瑛町白金温泉',source:'https://www.shiroganeonsen.com/faq/',phone:'0166943333'},
        {time:'夕食後',kind:'晴れたら候補',category:'STARRY NIGHT',title:'美瑛で星景撮影',text:'旅の星景撮影はこの夜が本命。宿の夕食に合わせ、雲・路面・夜間利用を確認して選ぶ。',internal:'#stars-2'}
      ]},
    {id:3,date:'11.09',weekday:'MON',jpWeek:'月',place:'江別・定山渓',region:'EBETSU / JOZANKEI',title:'温泉街で、ひと息。',description:'トリトンで昼食をとり、定山源泉公園へ。今夜の宿は森の謌。',photo:'P06',route:'白金温泉 → 江別 → 定山渓',anchor:'12:00 トリトンが目安',anchorNote:'席予約なし / 待ち時間を確保',hotel:'森の謌',hotelNote:'夕・朝食つき / 夕食時刻は未定',hotelQuery:'定山渓鶴雅リゾートスパ 森の謌',
      notes:[{title:'移動とランチにゆとりを',text:'白金温泉から江別までは長距離移動。トリトンは席予約を受け付けていないため、待ち時間も見込んで出発。',source:'https://toriton-kita1.jp/shop/ebetsu/',label:'トリトン 江別店'},{title:'温泉卵の材料は近くで',text:'卵は定山渓物産館で購入。茹で時間は温度などで変わるため、お店で目安を確認。源泉公園は7:00–21:00。',source:'https://jozankei.jp/contact/faq/',label:'観光協会の案内'}],
      events:[
        {time:'朝',kind:'宿で朝食',category:'BREAKFAST',title:'ゆゆで朝ごはん',text:'朝食つきプラン。提供時刻は宿で確認。',query:'碧の美 ゆゆ 美瑛町白金',address:'上川郡美瑛町白金温泉'},
        {time:'08:30',kind:'目安',category:'DEPARTURE',title:'白金温泉を出発',text:'美瑛市街を経由して江別へ。休憩をとりながら移動。',query:'碧の美 ゆゆ 美瑛町白金',address:'碧の美 ゆゆ',leg:'江別まで車 約3–3.5時間（休憩込み）'},
        {time:'12:00',kind:'目安',category:'LUNCH',title:'回転寿しトリトン 江別店',text:'北海道のお寿司で昼食。通常11:00–22:00。混み具合に合わせて、午後の予定を調整。',query:'回転寿しトリトン 江別店',address:'江別市高砂町25-3',source:'https://toriton-kita1.jp/shop/ebetsu/',leg:'定山渓まで車 約90–120分'},
        {time:'15:00',kind:'目安',category:'ONSEN EGG',title:'定山源泉公園で温泉卵',text:'足湯と温泉卵づくり。通常7:00–21:00。タイムズ定山渓観光駐車場から徒歩約3分。',query:'定山源泉公園',address:'札幌市南区定山渓温泉東3丁目',source:'https://jozankei.jp/spot/66/'},
        {time:'16:00',kind:'目安',category:'STAY',title:'定山渓鶴雅リゾートスパ 森の謌',text:'夕・朝食つき。通常チェックイン15:00、チェックアウト10:00。夕食時刻は予約内容を確認。',query:'定山渓鶴雅リゾートスパ 森の謌',address:'札幌市南区定山渓温泉東3丁目192',source:'https://www.morino-uta.com/access/',phone:'0115982671'},
        {time:'夕食後',kind:'撮影の予備日',category:'STARRY NIGHT',title:'宿の近くで夜空を見上げる',text:'新月の夜。遠出せず撮る場合は、宿に利用できる屋外の場所を確認。温泉街の灯りも写す夜景案に。',internal:'#stars-3'}
      ]},
    {id:4,date:'11.10',weekday:'TUE',jpWeek:'火',place:'支笏湖・千歳',region:'SHIKOTSU / CHITOSE',title:'湖の青を、旅の最後に。',description:'きのこ王国と支笏湖に立ち寄り、千歳で夕食。夜の便で帰路につく。',photo:'P12',route:'定山渓 → 大滝 → 支笏湖 → 新千歳',anchor:'20:00 新千歳空港発',anchorNote:'返却は18:00–18:15を推奨',hotel:'最後はスープカレー',hotelNote:'SAMA 千歳店 / 夕方は17:00開店',hotelQuery:'SAMA 千歳店 千歳市末広4-1-16',
      notes:[{title:'返却時刻は事前に調整',text:'指定の返却時刻は19:00ですが、冬季の空港送迎は18:30まで。18:00–18:15の返却を目安に、店舗へ前倒しを相談。航空会社の締切も確認。',source:'https://www.j-netrentacar.co.jp/hokkaido/shinchitose_airport/',label:'レンタカーの公式案内',warning:true},{title:'SAMAは17:00から',text:'夕方の営業開始に合わせて入店する案。混んでいたら搭乗までの時間を優先し、空港での夕食への変更も検討。',source:'https://hb-sama.com/shopinfo/sama-chitoseten/',label:'SAMA 千歳店'}],
      events:[
        {time:'朝',kind:'宿で朝食',category:'BREAKFAST',title:'森の謌で朝ごはん',text:'朝食を食べて、出発の準備。',query:'定山渓鶴雅リゾートスパ 森の謌',address:'札幌市南区定山渓温泉東3丁目192'},
        {time:'10:00',kind:'目安',category:'DEPARTURE',title:'定山渓を出発',text:'国道230号・276号方面で大滝へ。路面状況を確認して出発。',query:'定山渓鶴雅リゾートスパ 森の謌',address:'森の謌',leg:'大滝まで車 約75–100分'},
        {time:'11:30',kind:'目安',category:'LUNCH',title:'きのこ王国 大滝本店',text:'きのこ料理で昼食。通常9:00–18:00。',query:'きのこ王国 大滝本店',address:'伊達市大滝区三階滝町637-1',source:'https://www.kinoko-oukoku.com/shopinfo/shop_ootaki/',leg:'支笏湖温泉街まで車 約50–65分'},
        {time:'13:00',kind:'目安',category:'LAKESIDE WALK',title:'支笏湖を散策',text:'温泉街側の湖畔から、山並みや山線鉄橋を眺める。14:30ごろまでを目安に、千歳へ。',query:'支笏湖ビジターセンター',address:'千歳市支笏湖温泉',source:'https://shikotsukovc.sakura.ne.jp/',leg:'千歳市街まで車 約40–50分'},
        {time:'15:30',kind:'自由時間',category:'CHITOSE',title:'千歳で買い物・ひと休み',text:'SAMAの17:00開店まで余裕があれば、パンやお土産を。寄り道は返却までの時間を見ながら。',internal:'#explore-4'},
        {time:'17:00',kind:'開店に合わせる案',category:'DINNER',title:'SAMA 千歳店',text:'旅の最後はスープカレー。夕方は17:00開店。食後に給油して返却へ。',query:'SAMA 千歳店 千歳市末広4-1-16',address:'千歳市末広4丁目1-16',source:'https://hb-sama.com/shopinfo/sama-chitoseten/',leg:'店舗まで車 約15–20分 ＋ 給油・返却手続き'},
        {time:'18:00',kind:'推奨・要調整',category:'CAR RETURN',title:'給油・レンタカー返却',text:'18:00–18:15の返却を推奨。指定時刻は19:00のままなので、事前に店舗へ相談。冬季の空港送迎は18:30まで。',query:'Jネットレンタカー 新千歳空港店 千歳市流通3-2-8',address:'千歳市流通3-2-8',source:'https://www.j-netrentacar.co.jp/hokkaido/shinchitose_airport/',phone:'0120302554',leg:'送迎バス → 空港 / 搭乗手続き・保安検査'},
        {time:'20:00',kind:'指定時刻',category:'DEPARTURE',title:'新千歳空港から帰路へ',text:'航空会社の手荷物預け・保安検査の締切を確認して、余裕を持って搭乗口へ。',query:'新千歳空港 国内線ターミナル',address:'千歳市美々 新千歳空港',fixed:true,noDirections:true}
      ]}
  ],
  spots:[
    {day:1,type:'food',name:'小樽サンジェルマン',text:'翌朝のパンを買うなら。小樽駅に立ち寄るタイミングで、好みのパンを選んでおく。',detour:'小樽駅周辺 / 買い物15–25分の目安',address:'小樽市稲穂2-22-15',query:'小樽サンジェルマン',hours:'通常7:30–20:00。売り切れ・当日の営業は確認。',source:'https://www.lairbon.co.jp/hsg2509/'},
    {day:1,type:'food',name:'ルタオ パトス',text:'堺町の散策途中に、チーズスイーツでひと休み。クルーズの集合に遅れない範囲で。',detour:'堺町の予定ルート沿い / 30–45分の目安',address:'小樽市堺町5-22',query:'ルタオ パトス',hours:'物販9:00–18:00 / カフェ10:00–18:00。',source:'https://www.letao-brand.jp/shop/pathos/'},
    {day:2,type:'scenery',name:'白ひげの滝',text:'白金温泉のすぐ近く。青い川に流れ落ちる滝を橋から眺める、短い寄り道。',detour:'ゆゆの近く / 散策15–25分の目安',address:'上川郡美瑛町白金',query:'白ひげの滝',hours:'白金観光センターに無料公共駐車場。夜の点灯は日没〜21:00。',source:'https://www.biei-hokkaido.jp/ja/facility/shirahige-waterfalls'},
    {day:2,type:'food',name:'美瑛選果・選果市場',text:'美瑛の野菜や加工品、おやつを探すなら。美瑛市街を通るときの買い物候補。',detour:'美瑛市街 / 買い物20–30分の目安',address:'上川郡美瑛町大町2丁目',query:'美瑛選果 選果市場',hours:'11月は通常10:00–17:00。併設レストラン・選果工房は季節休業のため対象外。',source:'https://bieisenka.jp/about/'},
    {day:3,type:'scenery',name:'二見吊橋',text:'赤い橋と渓谷を眺める温泉街の散策。明るいうちに、足元がよければ少し足を延ばす。',detour:'源泉公園から周辺散策 / 30–45分の目安',address:'札幌市南区定山渓温泉西4丁目',query:'定山渓 二見吊橋',hours:'通年・無料。積雪や凍結時は無理をせず、現地の規制に従う。',source:'https://jozankei.jp/spot/105/'},
    {day:3,type:'food',name:'雨ノ日と雪ノ日',text:'ジェラートや飲み物で、温泉前の小休憩。夕食に響かないくらいの寄り道に。',detour:'定山渓温泉街 / 20–40分の目安',address:'札幌市南区定山渓温泉西2-41',query:'雨ノ日と雪ノ日 定山渓',hours:'通常10:00–18:00、木曜定休。旅行日は月曜日。',source:'https://jozankei.jp/store/amenohi-yukinohi/'},
    {day:4,type:'scenery',name:'山線鉄橋',text:'支笏湖の青に映える赤い橋。湖畔散策と合わせて、旅の最後の一枚を。',detour:'支笏湖散策の中で / 15–20分の目安',address:'千歳市支笏湖温泉',query:'支笏湖 山線鉄橋',hours:'温泉街側の湖畔から徒歩。追加の車移動は不要。',source:'https://shikotsukovc.sakura.ne.jp/sansaku/shikotsu.en.html'},
    {day:4,type:'food',name:'ドレモルタオ',text:'千歳でパンやお菓子のお土産を。SAMAの夕方開店までの買い物候補。',detour:'千歳市街 / 買い物20–30分の目安',address:'千歳市朝日町6丁目1-1',query:'ドレモルタオ',hours:'火曜は物販10:00–17:00。カフェ11:00–17:00、パンケーキLO16:00。',source:'https://www.letao-brand.jp/shop/doremo/'}
  ],
  stars:[
    {day:1,name:'祝津パノラマ展望台',tag:'海と空を写す候補',text:'海岸線と空を見渡す展望台。港や灯台の光を生かした星景向きの候補。風が強い日は見送る。',travel:'朝里川温泉ホテルから車 約30–40分 / 片道の目安',address:'小樽市祝津3丁目',query:'祝津パノラマ展望台',access:'駐車10台、トイレなし。夜間の駐車利用・積雪状況は直前確認。20:00までのホテルチェックインを先に済ませる。',source:'https://www.city.otaru.lg.jp/docs/2020100900664/'},
    {day:2,name:'美瑛の丘で、ガイドと星空へ',tag:'第2夜の本命',featured:true,text:'美瑛に宿泊する人向けの貸切星空ツアー。星景撮影を中心にした内容も相談できます。撮影地は当日の空に合わせてガイドが選定。',travel:'9〜4月は20:00開始 / 送迎込み約2時間以内',address:'撮影地はガイドが選定',access:'2名で12,000円の掲載料金。ゆゆへの送迎・夕食との時間・空き状況を事前相談。予約は未手配。',source:'https://www.biei-hokkaido.jp/ja/facility/star_watching',sourceLabel:'公式ツアー・相談先'},
    {day:2,name:'三愛の丘展望公園',tag:'自分たちで行くなら',text:'昼間に立ち寄る丘を、夜の撮影候補にも。広い空と丘の輪郭を写すなら、まず昼のうちに駐車場所と道を確認。',travel:'ゆゆから車 約25–35分 / 片道の目安',address:'上川郡美瑛町みどり',query:'三愛の丘展望公園',access:'無料駐車場あり。夜間の利用・除雪・ゲートの状況は未確認。観光協会に確認し、畑や農道の路肩には入らない。冬季トイレ利用不可。',source:'https://www.biei-hokkaido.jp/ja/facility/san-ai-no-oka_view-park',phone:'0166924378'},
    {day:2,name:'青い池のライトアップ',tag:'宿の近くの予備案',text:'暗い星空そのものより、ライトアップされた池と夜空を写す候補。長い移動を避けたいときに。',travel:'ゆゆから車 約5–10分 / 片道の目安',address:'上川郡美瑛町白金',query:'白金青い池 駐車場',access:'今季は2026/10/22〜2027/4/21。11月の点灯17:00–21:00、駐車場8:00–21:30。普通車1,000円/回。21:00までに撮影を終えて退出。',source:'https://town.biei.hokkaido.jp/culture/event/illuminate.html'},
    {day:3,travelMode:'walking',name:'森の謌・温泉街の近くで',tag:'第3夜の予備案',text:'夕食後に短く撮るなら、まず宿に使える屋外の場所を相談。温泉街は灯りが多く、星の数より夜の雰囲気を写す案。',travel:'宿の屋外なら車移動なし / 源泉公園へ徒歩 約10–15分',address:'札幌市南区定山渓温泉東3丁目',query:'定山源泉公園',access:'宿の敷地利用や三脚の設置は許可を確認。源泉公園は7:00–21:00。近隣の暗い撮影地の夜間アクセスは未確認。',source:'https://jozankei.jp/contact/faq/'}
  ],
  sources:[
    ['Jネットレンタカー・冬季送迎と店舗住所','https://www.j-netrentacar.co.jp/hokkaido/shinchitose_airport/'],
    ['小樽運河クルーズ・2026年11月時刻表','https://otaru.cc/wp-content/uploads/2026/08/2026_1101_1130.pdf'],
    ['富良野チーズ工房・営業案内','https://www.furano-cheese.jp/'],
    ['美瑛町・青い池駐車場の料金と時間','https://town.biei.hokkaido.jp/culture/event/news/bluepondpaidparking.html'],
    ['美瑛町・2026–27年ライトアップ','https://town.biei.hokkaido.jp/culture/event/illuminate.html'],
    ['国立天文台・2026年月の満ち欠け','https://eco.mtk.nao.ac.jp/koyomi/yoko/2026/rekiyou263.html'],
    ['国立天文台・札幌の2026年11月の月出入','https://eco.mtk.nao.ac.jp/koyomi/dni/2026/m0011.html'],
    ['美瑛観光協会・星空観察体験','https://www.biei-hokkaido.jp/ja/facility/star_watching']
  ]
};

window.TRIP.photos = [
  {
    "id": "P03",
    "day": 1,
    "label": "小樽運河・青い夕空",
    "author": "Tan Wei Liang Byorn",
    "date": "2019年8月10日",
    "note": "夕空と倉庫の灯り。夏撮影のため、蔦の緑は旅行時期と異なる。",
    "source": "https://commons.wikimedia.org/wiki/File:Otaru_Canal_HDR1.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
  },
  {
    "id": "P04",
    "day": 2,
    "label": "青い池・横構図",
    "author": "lumoplank",
    "date": "2025年10月6日",
    "note": "青い水面と秋の木々。日別の見出しや風景カードに。",
    "source": "https://commons.wikimedia.org/wiki/File:Biei6073_-_54989988739.jpg",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
  },
  {
    "id": "P06",
    "day": 3,
    "label": "定山渓・温泉街と紅葉",
    "author": "t-konno",
    "date": "2015年10月21日",
    "note": "温泉街の全景。10月の紅葉写真で、11月の状態を示すものではない。",
    "source": "https://commons.wikimedia.org/wiki/File:%E5%AE%9A%E5%B1%B1%E6%B8%93%E5%A4%A7%E6%A9%8B%EF%BC%88Jozankei_Ohashi%EF%BC%89_-_panoramio.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
  },
  {
    "id": "P12",
    "day": 4,
    "label": "支笏湖・湖面と風不死岳",
    "author": "663highland",
    "date": "2009年10月10日",
    "note": "水面の光と山の輪郭。落ち着いた青系の写真。",
    "source": "https://commons.wikimedia.org/wiki/File:Lake_Shikotsu_Mt_Fuppushi01bs4272.jpg",
    "license": "CC BY 2.5",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.5"
  }
];

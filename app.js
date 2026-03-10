'use strict';

// ===== Constants =====
const STORAGE_KEY = 'mrc_concerts';
const SEED_LOADED_KEY = 'mrc_seed_loaded';

const PREFECTURES = [
  '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
  '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
  '新潟県','富山県','石川県','福井県','山梨県','長野県',
  '岐阜県','静岡県','愛知県','三重県',
  '滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県',
  '鳥取県','島根県','岡山県','広島県','山口県',
  '徳島県','香川県','愛媛県','高知県',
  '福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'
];

// ===== Seed Data (里南さんの参戦歴) =====
const SEED_DATA = [
  {
    id: 's01', tour: 'POPSAURUS 2012', date: '2012-04-29',
    venue: '', prefecture: '福岡県', seat: '',
    companions: [], rating: 0, tags: ['スタジアム'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['innocent world','終わりなき旅','Dance Dance Dance','Worlds end','GIFT','fanfare','エソラ','彩り','Everything（It\'s you）','蘇生','youthful days','365日','End of the day','ラララ','光の射す方へ','くるみ','1999年、夏、沖縄','ロックンロールは生きている','しるし','箒星','Round About～孤独の肖像～','LOVE','デルモ','祈り ～涙の軌道','Sign']
  },
  {
    id: 's02', tour: 'Stadium Tour 2015 未完', date: '2015-07-18',
    venue: '', prefecture: '福岡県', seat: '',
    companions: [], rating: 0, tags: ['スタジアム'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['Tomorrow never knows','innocent world','終わりなき旅','擬態','ニシエヒガシエ','フェイク','タガタメ','足音 〜Be Strong','未完','and I love you','光の射す方へ','ALIVE','REM','WALTZ','幻聴','Starting Over','fantasy','FIGHT CLUB','斜陽','蜘蛛の糸','I Can Make It','運命','進化論','I wanna be there','CHILDREN\'S WORLD','忘れ得ぬ人','蘇生']
  },
  {
    id: 's03', tour: 'Hall Tour 2016 虹', date: '2016-04-22',
    venue: '', prefecture: '宮崎県', seat: '',
    companions: [], rating: 0, tags: ['ホール','遠征'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['Tomorrow never knows','GIFT','彩り','名もなき詩','足音 〜Be Strong','くるみ','HERO','CANDY','優しい歌','血の管','WALTZ','虹の彼方へ','クラスメイト','マシンガンをぶっ放せ','傘の下の君に告ぐ','PIANO MAN','もっと','通り雨','あんまり覚えてないや','妄想満月','水上バス','You make me happy','お迦話','こころ','忙しい僕ら']
  },
  {
    id: 's04', tour: '2017 Thanksgiving 25', date: '2017-07-15',
    venue: '', prefecture: '福岡県', seat: '',
    companions: [], rating: 0, tags: [], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['Tomorrow never knows','innocent world','終わりなき旅','Dance Dance Dance','GIFT','fanfare','エソラ','名もなき詩','ニシエヒガシエ','1999年、夏、沖縄','蘇生','youthful days','himawari','シーソーゲーム〜勇敢な恋の歌〜','車の中でかくれてキスしよう','CROSS ROAD','everybody goes','CENTER OF UNIVERSE','思春期の夏〜君との恋が今も牧場に〜','掌','ランニングハイ','ヒカリノアトリエ','抱きしめたい','Any','Making Songs','箒星','こんな風にひどく蒸し暑い日','君が好き']
  },
  {
    id: 's05', tour: '2017 Thanksgiving 25', date: '2017-09-09',
    venue: '', prefecture: '熊本県', seat: '',
    companions: [], rating: 0, tags: ['遠征'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['Tomorrow never knows','innocent world','終わりなき旅','Dance Dance Dance','GIFT','fanfare','エソラ','名もなき詩','ニシエヒガシエ','1999年、夏、沖縄','蘇生','Sign','HANABI','365日','himawari','Simple','CENTER OF UNIVERSE','思春期の夏〜君との恋が今も牧場に〜','掌','ランニングハイ','ヒカリノアトリエ','君がいた夏','ポケット カスタネット']
  },
  {
    id: 's06', tour: 'Tour 2018-19 重力と呼吸', date: '2018-11-24',
    venue: '', prefecture: '大分県', seat: '',
    companions: [], rating: 0, tags: ['遠征'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['海にて、心は裸になりたがる','HANABI','Dance Dance Dance','Worlds end','Monster','SINGLES','addiction','皮膚呼吸','and I love you','しるし','忘れ得ぬ人','幻聴','擬態','花 - Memento-Mori -','NOT FOUND','風と星とメビウスの輪','ハル','here comes my love','秋がくれた切符']
  },
  {
    id: 's07', tour: 'Dome Tour 2019 "Against All GRAVITY"', date: '2019-04-20',
    venue: '', prefecture: '福岡県', seat: '',
    companions: [], rating: 0, tags: [], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['Tomorrow never knows','innocent world','終わりなき旅','海にて、心は裸になりたがる','Sign','HANABI','Dance Dance Dance','Worlds end','名もなき詩','Monster','SINGLES','addiction','皮膚呼吸','Starting Over','everybody goes','CANDY','ロードムービー','SUNRISE','旅立ちの唄','Prelude','Your Song','himawari']
  },
  {
    id: 's08', tour: 'エントランスのエントランス', date: '2022-04-09',
    venue: '', prefecture: '東京都', seat: '',
    companions: [], rating: 0, tags: ['遠征'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['Tomorrow never knows','innocent world','Worlds end','海にて、心は裸になりたがる','フェイク','fanfare','youthful days','ロックンロールは生きている','DANCING SHOES','others','永遠','生きろ','Any','僕らの音','Replay']
  },
  {
    id: 's09', tour: '半世紀へのエントランス', date: '2023-04-23',
    venue: '', prefecture: '福岡県', seat: '',
    companions: [], rating: 0, tags: [], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['Tomorrow never knows','Dance Dance Dance','Worlds end','海にて、心は裸になりたがる','fanfare','エソラ','フェイク','タガタメ','youthful days','くるみ','Any','ロックンロールは生きている','DANCING SHOES','others','永遠','生きろ','Documentary film','LOVE はじめました','僕らの音','Replay','Brand new planet','Your Song']
  },
  {
    id: 's10', tour: '半世紀へのエントランス', date: '2023-06-18',
    venue: '', prefecture: '大阪府', seat: '',
    companions: [], rating: 0, tags: ['遠征'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['Tomorrow never knows','innocent world','終わりなき旅','海にて、心は裸になりたがる','Sign','HANABI','名もなき詩','ニシエヒガシエ','彩り','シーソーゲーム〜勇敢な恋の歌〜','車の中でかくれてキスしよう','光の射す方へ','DANCING SHOES','others','永遠','生きろ','Documentary film','LOVE はじめました','口笛']
  },
  {
    id: 's11', tour: 'ap bank fes \'23 〜社会と暮らしと音楽と〜', date: '2023-07-16',
    venue: '', prefecture: '静岡県', seat: '',
    companions: [], rating: 0, tags: ['遠征','野外'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['Simple','Your Song','CROSS ROAD','雨のち晴れ','ゆりかごのある丘から','口がすべって','花の匂い','pieces']
  },
  {
    id: 's12', tour: 'グランドチャウデーション', date: '2023-12-18',
    venue: '', prefecture: '大阪府', seat: '',
    companions: [], rating: 0, tags: ['遠征'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['Tomorrow never knows','終わりなき旅','海にて、心は裸になりたがる','HANABI','ラララ','タガタメ','HERO','Brand new planet']
  },
  {
    id: 's13', tour: 'Prelive 2024', date: '2024-06-24',
    venue: '', prefecture: '東京都', seat: '',
    companions: [], rating: 0, tags: ['遠征'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['Sign','End of the day','未完','Everything（It\'s you）','アンダーシャツ','つよがり','靴ひも','The song of praise','I MISS YOU','Fifty\'s map 〜おとなの地図','Are you sleeping well without me?','LOST','アート＝神の見えざる手','雨の日のパレード','We have no time','ケモノミチ','記憶の旅人']
  },
  {
    id: 's14', tour: 'miss you arena tour', date: '2024-07-12',
    venue: '', prefecture: '神奈川県', seat: '',
    companions: [], rating: 0, tags: ['遠征','アリーナ'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['終わりなき旅','Sign','365日','End of the day','未完','Everything（It\'s you）','アンダーシャツ','つよがり','靴ひも','The song of praise','優しい歌','血の管','REM','I MISS YOU','Fifty\'s map 〜おとなの地図','Are you sleeping well without me?','LOST','アート＝神の見えざる手','雨の日のパレード','We have no time','ケモノミチ','記憶の旅人','Hallelujah','叫び 祈り','青いリンゴ','Party is over','in the pokect']
  },
  {
    id: 's15', tour: 'miss you arena tour', date: '2024-10-27',
    venue: '', prefecture: '神奈川県', seat: '',
    companions: [], rating: 0, tags: ['遠征','アリーナ'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['終わりなき旅','Sign','365日','End of the day','未完','Everything（It\'s you）','アンダーシャツ','つよがり','靴ひも','The song of praise','優しい歌','血の管','REM','I MISS YOU','Fifty\'s map 〜おとなの地図','Are you sleeping well without me?','LOST','アート＝神の見えざる手','雨の日のパレード','We have no time','ケモノミチ','記憶の旅人','Hallelujah','叫び 祈り','青いリンゴ','Party is over','in the pokect']
  },
  {
    id: 's16', tour: 'ap bank fes \'25 〜社会と暮らしと音楽と〜', date: '2025-02-15',
    venue: '', prefecture: '東京都', seat: '',
    companions: [], rating: 0, tags: ['遠征','野外'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['海にて、心は裸になりたがる','HANABI','タガタメ','彩り','HERO','擬態','Brand new planet','街の風景']
  },
  {
    id: 's17', tour: 'ap bank fes \'25 〜社会と暮らしと音楽と〜', date: '2025-02-16',
    venue: '', prefecture: '東京都', seat: '',
    companions: [], rating: 0, tags: ['遠征','野外'], situation: '', memo: '',
    photos: [], ticketImage: null,
    songs: ['海にて、心は裸になりたがる','HANABI','タガタメ','彩り','HERO','擬態','Brand new planet','街の風景','くるみ']
  }
];

// ===== Chart Instances =====
let charts = {};

// ===== Data Management =====
function getConcerts() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function saveConcerts(concerts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(concerts));
}
function generateId() {
  return (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).substr(2);
}
function addConcert(data) {
  const concerts = getConcerts();
  const c = { id: generateId(), ...data };
  concerts.push(c);
  saveConcerts(concerts);
  return c;
}
function updateConcert(id, data) {
  const concerts = getConcerts();
  const i = concerts.findIndex(c => c.id === id);
  if (i !== -1) { concerts[i] = { ...concerts[i], ...data }; saveConcerts(concerts); }
}
function deleteConcert(id) {
  saveConcerts(getConcerts().filter(c => c.id !== id));
}

// ===== Utilities =====
function formatDate(s) {
  if (!s) return '';
  const d = new Date(s + 'T00:00:00');
  return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;
}
function getYear(s) { return s ? new Date(s + 'T00:00:00').getFullYear() : ''; }
function getMonth(s) { return s ? new Date(s + 'T00:00:00').getMonth() + 1 : 0; }
function getSeason(m) {
  if (m >= 3 && m <= 5) return '春';
  if (m >= 6 && m <= 8) return '夏';
  if (m >= 9 && m <= 11) return '秋';
  return '冬';
}
function getRatingStars(r) {
  return '★'.repeat(r || 0) + '☆'.repeat(5 - (r || 0));
}
function escapeHtml(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(str || ''));
  return d.innerHTML;
}

// ===== Tab Switching =====
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === 'tab-' + tab));
      if (tab === 'analysis') renderAnalysis();
    });
  });
}

// ===== Timeline =====
function renderTimeline() {
  const concerts = getConcerts();
  const container = document.getElementById('timelineContainer');
  const empty = document.getElementById('timelineEmpty');

  if (concerts.length === 0) {
    container.style.display = 'none';
    empty.style.display = 'block';
    return;
  }
  container.style.display = 'block';
  empty.style.display = 'none';

  const sorted = [...concerts].sort((a, b) => b.date.localeCompare(a.date));
  const byYear = {};
  sorted.forEach(c => {
    const y = getYear(c.date);
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(c);
  });

  const years = Object.keys(byYear).sort((a, b) => b - a);
  container.innerHTML = years.map(year => `
    <div class="timeline-year-group">
      <div class="timeline-year">${year}</div>
      <div class="timeline-concerts">
        ${byYear[year].map(c => renderConcertCard(c)).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.timeline-card').forEach(card => {
    card.addEventListener('click', () => openDetail(card.dataset.id));
  });
}

function renderConcertCard(c) {
  const rating = c.rating ? `<div class="timeline-rating">${getRatingStars(c.rating)}</div>` : '';
  const companions = c.companions && c.companions.length
    ? `<span>👥 ${escapeHtml(c.companions.join('・'))}</span>` : '';
  const tags = c.tags && c.tags.length
    ? `<div class="timeline-tags">${c.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>` : '';
  const memo = c.memo
    ? `<div class="timeline-memo-preview">「${escapeHtml(c.memo)}」</div>` : '';
  const venueStr = c.venue
    ? `${escapeHtml(c.venue)}${c.prefecture ? ' (' + escapeHtml(c.prefecture) + ')' : ''}`
    : (c.prefecture ? escapeHtml(c.prefecture) : '');
  const songPreview = c.songs && c.songs.length
    ? `<div class="timeline-tags" style="margin-top:6px">${c.songs.slice(0,4).map(s => `<span class="song-tag">🎵 ${escapeHtml(s)}</span>`).join('')}${c.songs.length > 4 ? `<span class="song-tag">+${c.songs.length - 4}曲</span>` : ''}</div>` : '';

  return `
    <div class="timeline-card" data-id="${c.id}">
      <div class="timeline-card-header">
        <div class="timeline-card-main">
          <div class="timeline-tour">${escapeHtml(c.tour)}</div>
          <div class="timeline-meta">
            <span>📅 ${formatDate(c.date)}</span>
            ${venueStr ? `<span>📍 ${venueStr}</span>` : ''}
            ${c.seat ? `<span>💺 ${escapeHtml(c.seat)}</span>` : ''}
            ${companions}
          </div>
        </div>
        ${rating}
      </div>
      ${tags}
      ${songPreview}
      ${memo}
    </div>
  `;
}

// ===== Detail Modal =====
function openDetail(id) {
  const concert = getConcerts().find(c => c.id === id);
  if (!concert) return;

  document.getElementById('detailTitle').textContent = concert.tour;

  const rating = concert.rating
    ? `<div class="detail-badge" style="color:var(--gold)">${getRatingStars(concert.rating)}</div>` : '';
  const companions = concert.companions && concert.companions.length
    ? `<div class="detail-badge">👥 ${escapeHtml(concert.companions.join('・'))}</div>` : '';
  const venueStr = concert.venue
    ? `${escapeHtml(concert.venue)}${concert.prefecture ? ' · ' + escapeHtml(concert.prefecture) : ''}`
    : (concert.prefecture ? escapeHtml(concert.prefecture) : '');

  const tagsHtml = concert.tags && concert.tags.length
    ? `<div class="detail-section">
        <div class="detail-label">タグ</div>
        <div class="timeline-tags">${concert.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
       </div>` : '';

  const songsHtml = concert.songs && concert.songs.length
    ? `<div class="detail-section">
        <div class="detail-label">セットリスト（${concert.songs.length}曲）</div>
        <div class="timeline-tags">${concert.songs.map(s => `<span class="song-tag">🎵 ${escapeHtml(s)}</span>`).join('')}</div>
       </div>` : '';

  const situationHtml = concert.situation
    ? `<div class="detail-section">
        <div class="detail-label">当時の自分の状況</div>
        <div class="detail-value" style="white-space:pre-wrap">${escapeHtml(concert.situation)}</div>
       </div>` : '';

  const memoHtml = concert.memo
    ? `<div class="detail-section">
        <div class="detail-label">感想・思い出メモ</div>
        <div class="detail-value" style="white-space:pre-wrap;font-style:italic;color:#ccc">${escapeHtml(concert.memo)}</div>
       </div>` : '';

  const photosHtml = concert.photos && concert.photos.length
    ? `<div class="detail-section">
        <div class="detail-label">写真</div>
        <div class="detail-photos">${concert.photos.map(p => `<img src="${p}" alt="写真">`).join('')}</div>
       </div>` : '';

  const ticketHtml = concert.ticketImage
    ? `<div class="detail-section detail-ticket">
        <div class="detail-label">チケット</div>
        <img src="${concert.ticketImage}" alt="チケット">
       </div>` : '';

  document.getElementById('detailBody').innerHTML = `
    <div class="detail-header-info">
      <div class="detail-badge">📅 ${formatDate(concert.date)}</div>
      ${venueStr ? `<div class="detail-badge">📍 ${venueStr}</div>` : ''}
      ${concert.seat ? `<div class="detail-badge">💺 ${escapeHtml(concert.seat)}</div>` : ''}
      ${companions}
      ${rating}
    </div>
    ${tagsHtml}
    ${songsHtml}
    ${situationHtml}
    ${memoHtml}
    ${photosHtml}
    ${ticketHtml}
  `;

  document.getElementById('detailDeleteBtn').dataset.id = id;
  document.getElementById('detailEditBtn').dataset.id = id;
  document.getElementById('detailModal').classList.add('active');
}

// ===== Analysis =====
function renderAnalysis() {
  const concerts = getConcerts();
  const empty = document.getElementById('analysisEmpty');
  const content = document.getElementById('analysisContent');

  if (concerts.length === 0) {
    empty.style.display = 'block';
    content.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  content.style.display = 'block';

  renderStats(concerts);
  renderCharts(concerts);
  renderDiagnosis(concerts);
}

function renderStats(concerts) {
  const sorted = [...concerts].sort((a, b) => a.date.localeCompare(b.date));
  const tours = new Set(concerts.map(c => c.tour)).size;
  const venues = new Set(concerts.filter(c=>c.venue).map(c => c.venue)).size;
  const prefectures = new Set(concerts.filter(c => c.prefecture).map(c => c.prefecture)).size;
  const firstDate = sorted[0] ? formatDate(sorted[0].date) : '-';

  let maxGapDays = 0;
  for (let i = 1; i < sorted.length; i++) {
    const days = Math.round((new Date(sorted[i].date) - new Date(sorted[i-1].date)) / 86400000);
    if (days > maxGapDays) maxGapDays = days;
  }

  const stats = [
    { value: concerts.length, label: '総参戦回数' },
    { value: tours, label: 'ツアー数' },
    { value: venues || prefectures, label: venues ? '制覇会場数' : '訪れた都道府県' },
    { value: prefectures, label: '都道府県数' },
    { value: firstDate, label: '初参戦', small: true },
    { value: maxGapDays > 0 ? `${maxGapDays}日` : '-', label: '最長空白期間', small: true },
  ];

  document.getElementById('statsGrid').innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-value" ${s.small ? 'style="font-size:20px;margin-top:4px"' : ''}>${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

function destroyCharts() {
  Object.values(charts).forEach(c => { try { c.destroy(); } catch(e){} });
  charts = {};
}

function renderCharts(concerts) {
  destroyCharts();

  const sorted = [...concerts].sort((a, b) => a.date.localeCompare(b.date));

  Chart.defaults.color = '#888';
  Chart.defaults.font.family = "'Noto Sans JP', sans-serif";

  const gridColor = '#2e2e2e';
  const accent = '#e8002d';
  const gold = '#c9a84c';

  // 1. Yearly bar chart
  const yearCounts = {};
  concerts.forEach(c => { const y = getYear(c.date); yearCounts[y] = (yearCounts[y]||0)+1; });
  const years = Object.keys(yearCounts).sort();

  charts.yearly = new Chart(document.getElementById('yearlyChart'), {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{ data: years.map(y => yearCounts[y]),
        backgroundColor: 'rgba(232,0,45,0.7)', borderColor: accent,
        borderWidth: 1, borderRadius: 4 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: gridColor } },
        x: { grid: { color: gridColor } }
      }
    }
  });

  // 2. Prefecture horizontal bar (会場が空の場合でも都道府県で表示)
  const prefCounts = {};
  concerts.forEach(c => {
    const key = c.venue || c.prefecture || '不明';
    prefCounts[key] = (prefCounts[key]||0)+1;
  });
  const topItems = Object.entries(prefCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);

  charts.venue = new Chart(document.getElementById('venueChart'), {
    type: 'bar',
    data: {
      labels: topItems.map(v => v[0]),
      datasets: [{ data: topItems.map(v => v[1]),
        backgroundColor: 'rgba(201,168,76,0.7)', borderColor: gold,
        borderWidth: 1, borderRadius: 4 }]
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: gridColor } },
        y: { ticks: { font: { size: 11 } }, grid: { display: false } }
      }
    }
  });

  // 3. Season doughnut
  const seasonMap = { '春(3-5月)': 0, '夏(6-8月)': 0, '秋(9-11月)': 0, '冬(12-2月)': 0 };
  concerts.forEach(c => {
    const m = getMonth(c.date);
    const key = m>=3&&m<=5?'春(3-5月)':m>=6&&m<=8?'夏(6-8月)':m>=9&&m<=11?'秋(9-11月)':'冬(12-2月)';
    seasonMap[key]++;
  });

  charts.season = new Chart(document.getElementById('seasonChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(seasonMap),
      datasets: [{ data: Object.values(seasonMap),
        backgroundColor: ['rgba(150,220,150,0.8)','rgba(255,200,50,0.8)','rgba(255,130,50,0.8)','rgba(100,150,255,0.8)'],
        borderColor: '#1a1a1a', borderWidth: 2 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'right', labels: { font: { size: 11 }, padding: 12 } } }
    }
  });

  // 4. Cumulative line chart
  charts.cumulative = new Chart(document.getElementById('cumulativeChart'), {
    type: 'line',
    data: {
      labels: sorted.map(c => formatDate(c.date)),
      datasets: [{
        data: sorted.map((_, i) => i + 1), label: '累計',
        borderColor: accent, backgroundColor: 'rgba(232,0,45,0.08)',
        fill: true, tension: 0.3, pointRadius: 4, pointBackgroundColor: accent
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { maxRotation: 45, font: { size: 10 } }, grid: { color: gridColor } },
        y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: gridColor } }
      }
    }
  });

  // 5. Song ranking (list)
  renderSongRanking(concerts);

  // 6. Destiny graph
  renderDestinyChart(yearCounts, years);
}

function renderSongRanking(concerts) {
  const songCounts = {};
  concerts.forEach(c => {
    if (c.songs && c.songs.length) {
      c.songs.forEach(s => { songCounts[s] = (songCounts[s] || 0) + 1; });
    }
  });
  const topSongs = Object.entries(songCounts).sort((a, b) => b[1] - a[1]).slice(0, 15);
  const medals = ['🥇', '🥈', '🥉'];

  document.getElementById('songRankingList').innerHTML = topSongs.map(([song, count], i) => `
    <div class="song-rank-row ${i < 3 ? 'song-rank-top' : ''}">
      <span class="song-rank-num">${medals[i] || `${i + 1}位`}</span>
      <span class="song-rank-name">${escapeHtml(song)}</span>
      <span class="song-rank-count">${count}回</span>
    </div>
  `).join('');
}

function renderDestinyChart(yearCounts, years) {
  if (!years || years.length === 0) return;

  const firstY = parseInt(years[0]);
  const lastY = parseInt(years[years.length - 1]);
  const allYears = [];
  for (let y = firstY; y <= lastY; y++) allYears.push(y.toString());

  const counts = allYears.map(y => yearCounts[y] || 0);
  const avgCount = counts.reduce((a,b)=>a+b,0) / counts.length;

  const peakYears = allYears.filter(y => yearCounts[y] && yearCounts[y] >= Math.max(2, avgCount + 0.5));
  const gapYears = allYears.filter(y => !yearCounts[y]);

  const bgColors = allYears.map(y => {
    if (peakYears.includes(y)) return 'rgba(232,0,45,0.85)';
    if (gapYears.includes(y)) return 'rgba(50,50,50,0.5)';
    return 'rgba(232,0,45,0.4)';
  });

  charts.destiny = new Chart(document.getElementById('destinyChart'), {
    type: 'bar',
    data: {
      labels: allYears,
      datasets: [{
        data: counts, backgroundColor: bgColors,
        borderColor: allYears.map(y => peakYears.includes(y) ? '#e8002d' : '#333'),
        borderWidth: 1, borderRadius: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#2e2e2e' } },
        x: { grid: { color: '#1a1a1a' } }
      }
    }
  });

  const ann = document.getElementById('destinyAnnotations');
  const html = [];
  if (peakYears.length) html.push(`<div class="destiny-badge peak">🔥 最多参戦期：${peakYears.join('・')}年</div>`);

  if (gapYears.length) {
    const groups = [];
    let start = null, prev = null;
    gapYears.forEach(y => {
      if (!prev || parseInt(y) !== parseInt(prev) + 1) {
        if (start) groups.push(start === prev ? start : `${start}〜${prev}`);
        start = y;
      }
      prev = y;
    });
    if (start) groups.push(start === prev ? start : `${start}〜${prev}`);
    html.push(`<div class="destiny-badge gap">⬜ 空白期間：${groups.join('、')}年</div>`);
  }

  ann.innerHTML = html.join('');
}

// ===== Type Diagnosis =====
function renderDiagnosis(concerts) {
  const types = diagnoseTypes(concerts);
  const container = document.getElementById('diagnosisCards');

  if (types.length === 0) {
    container.innerHTML = `<div class="diagnosis-none"><div style="font-size:32px;margin-bottom:8px">🎸</div><div>ライブを増やすと診断できます！</div></div>`;
    return;
  }
  container.innerHTML = types.map(t => `
    <div class="diagnosis-card">
      <div class="diagnosis-icon">${t.icon}</div>
      <div>
        <div class="diagnosis-type">${t.type}</div>
        <div class="diagnosis-desc">${escapeHtml(t.desc)}</div>
        <div class="diagnosis-level">
          ${Array.from({length:5},(_,i)=>`<div class="diagnosis-level-dot${i<t.level?' active':''}"></div>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function diagnoseTypes(concerts) {
  const types = [];
  if (concerts.length < 1) return types;

  // 遠征型
  const prefs = [...new Set(concerts.filter(c=>c.prefecture).map(c=>c.prefecture))];
  if (prefs.length >= 3) {
    types.push({ type: '遠征型', icon: '✈️',
      desc: `${prefs.length}都道府県を制覇！ミスチルのためなら全国どこでも飛んでいく情熱の持ち主。`,
      level: Math.min(5, Math.floor(prefs.length * 5 / 7)) });
  }

  // 深追い型
  const tourCounts = {};
  concerts.forEach(c => { tourCounts[c.tour] = (tourCounts[c.tour]||0)+1; });
  const maxTC = Math.max(...Object.values(tourCounts));
  if (maxTC >= 2) {
    const top = Object.entries(tourCounts).sort((a,b)=>b[1]-a[1])[0];
    types.push({ type: '深追い型', icon: '🎯',
      desc: `「${top[0]}」に${top[1]}回！同じ空気を何度でも吸いたい情熱のファン。`,
      level: Math.min(5, maxTC) });
  }

  // 首都圏集中型
  const metro = ['東京都','神奈川県','埼玉県','千葉県'];
  const withPref = concerts.filter(c=>c.prefecture);
  const metroC = withPref.filter(c=>metro.includes(c.prefecture)).length;
  if (withPref.length >= 3 && metroC / withPref.length >= 0.5) {
    types.push({ type: '首都圏集中型', icon: '🗼',
      desc: `参戦の${Math.round(metroC/withPref.length*100)}%が首都圏エリア！`,
      level: 3 });
  }

  // 記念日参戦型
  const special = concerts.filter(c=>c.tags&&(c.tags.includes('誕生日')||c.tags.includes('記念日')));
  if (special.length > 0) {
    types.push({ type: '記念日参戦型', icon: '🌹',
      desc: `特別な日にミスチルを選ぶロマンチスト。人生の節目がミスチルで彩られています。`,
      level: Math.min(5, special.length * 2) });
  }

  // 一人参戦型
  const solo = concerts.filter(c=>c.tags&&c.tags.includes('一人参戦'));
  if (solo.length >= 2) {
    types.push({ type: '一人参戦型', icon: '🎧',
      desc: `一人で${solo.length}回参戦！ミスチルと1対1で向き合える強者ファン。`,
      level: Math.min(5, solo.length) });
  }

  // 周年重視型
  const annKw = ['25','Thanksgiving','Anniversary','周年'];
  const annC = concerts.filter(c => annKw.some(kw=>c.tour&&c.tour.includes(kw)));
  if (annC.length > 0) {
    types.push({ type: '周年重視型', icon: '🎂',
      desc: `記念ライブを逃さない！節目を一緒に祝うことへのこだわりを感じます。`,
      level: Math.min(5, annC.length * 2) });
  }

  // ベテランファン
  if (concerts.length >= 8) {
    types.push({ type: 'ベテランファン', icon: '👑',
      desc: `${concerts.length}回の参戦記録はまさに本物。ミスチルとともに歩んできた年月が輝いています。`,
      level: Math.min(5, Math.floor(concerts.length / 4)) });
  }

  return types;
}

// ===== Form / Modal =====
let currentEditId = null;
let currentRating = 0;
let ticketBase64 = null;
let photosBase64 = [];

function setupForm() {
  const sel = document.getElementById('f-prefecture');
  PREFECTURES.forEach(p => {
    const o = document.createElement('option');
    o.value = p; o.textContent = p;
    sel.appendChild(o);
  });

  const stars = document.querySelectorAll('.star');
  const updateStars = val => {
    stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.val) <= val));
    currentRating = val;
    document.getElementById('f-rating').value = val;
  };
  stars.forEach(star => {
    star.addEventListener('click', () => updateStars(parseInt(star.dataset.val)));
    star.addEventListener('mouseenter', () => {
      stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.val) <= parseInt(star.dataset.val)));
    });
  });
  document.getElementById('starRating').addEventListener('mouseleave', () => updateStars(currentRating));

  document.querySelectorAll('.tag-check').forEach(label => {
    label.querySelector('input').addEventListener('change', e => {
      label.classList.toggle('checked', e.target.checked);
    });
  });

  document.getElementById('ticketUploadBtn').addEventListener('click', () => document.getElementById('f-ticket').click());
  document.getElementById('f-ticket').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    ticketBase64 = await fileToBase64(file);
    const prev = document.getElementById('ticketPreview');
    prev.src = ticketBase64; prev.style.display = 'block';
    document.getElementById('ticketClearBtn').style.display = 'inline-flex';
  });
  document.getElementById('ticketClearBtn').addEventListener('click', () => {
    ticketBase64 = null;
    document.getElementById('ticketPreview').style.display = 'none';
    document.getElementById('ticketClearBtn').style.display = 'none';
    document.getElementById('f-ticket').value = '';
  });

  document.getElementById('photosUploadBtn').addEventListener('click', () => document.getElementById('f-photos').click());
  document.getElementById('f-photos').addEventListener('change', async e => {
    const files = Array.from(e.target.files);
    const b64s = await Promise.all(files.map(fileToBase64));
    photosBase64 = [...photosBase64, ...b64s];
    renderPhotosPreview();
    e.target.value = '';
  });

  document.getElementById('concertForm').addEventListener('submit', e => {
    e.preventDefault();
    saveConcertForm();
  });
}

function renderPhotosPreview() {
  document.getElementById('photosPreview').innerHTML = photosBase64.map((p, i) => `
    <div class="photo-thumb-wrap">
      <img src="${p}" alt="写真">
      <button class="photo-thumb-del" onclick="removePhoto(${i})" title="削除">×</button>
    </div>
  `).join('');
}

window.removePhoto = function(i) {
  photosBase64.splice(i, 1);
  renderPhotosPreview();
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = e => resolve(e.target.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function resetForm() {
  currentRating = 0;
  ticketBase64 = null;
  photosBase64 = [];
  document.getElementById('concertForm').reset();
  document.getElementById('f-rating').value = '0';
  document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tag-check').forEach(l => { l.classList.remove('checked'); l.querySelector('input').checked = false; });
  document.getElementById('ticketPreview').style.display = 'none';
  document.getElementById('ticketClearBtn').style.display = 'none';
  document.getElementById('photosPreview').innerHTML = '';
}

function openAddModal() {
  currentEditId = null;
  resetForm();
  document.getElementById('modalTitle').textContent = 'ライブを追加';
  document.getElementById('f-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('concertModal').classList.add('active');
}

function openEditModal(id) {
  const c = getConcerts().find(c => c.id === id);
  if (!c) return;
  currentEditId = id;
  resetForm();
  currentRating = c.rating || 0;
  ticketBase64 = c.ticketImage || null;
  photosBase64 = c.photos ? [...c.photos] : [];

  document.getElementById('modalTitle').textContent = 'ライブを編集';
  document.getElementById('f-tour').value = c.tour || '';
  document.getElementById('f-date').value = c.date || '';
  document.getElementById('f-venue').value = c.venue || '';
  document.getElementById('f-prefecture').value = c.prefecture || '';
  document.getElementById('f-seat').value = c.seat || '';
  document.getElementById('f-companions').value = c.companions ? c.companions.join(', ') : '';
  document.getElementById('f-songs').value = c.songs ? c.songs.join(', ') : '';
  document.getElementById('f-situation').value = c.situation || '';
  document.getElementById('f-memo').value = c.memo || '';
  document.getElementById('f-rating').value = currentRating;

  document.querySelectorAll('.star').forEach(s => s.classList.toggle('active', parseInt(s.dataset.val) <= currentRating));
  document.querySelectorAll('.tag-check').forEach(label => {
    const inp = label.querySelector('input');
    const checked = c.tags && c.tags.includes(inp.value);
    inp.checked = checked; label.classList.toggle('checked', checked);
  });

  const prev = document.getElementById('ticketPreview');
  if (ticketBase64) {
    prev.src = ticketBase64; prev.style.display = 'block';
    document.getElementById('ticketClearBtn').style.display = 'inline-flex';
  }
  renderPhotosPreview();

  document.getElementById('detailModal').classList.remove('active');
  document.getElementById('concertModal').classList.add('active');
}

function saveConcertForm() {
  const parseList = s => s ? s.split(',').map(x=>x.trim()).filter(Boolean) : [];
  const tags = [];
  document.querySelectorAll('.tag-check input:checked').forEach(inp => tags.push(inp.value));

  const data = {
    tour: document.getElementById('f-tour').value.trim(),
    date: document.getElementById('f-date').value,
    venue: document.getElementById('f-venue').value.trim(),
    prefecture: document.getElementById('f-prefecture').value,
    seat: document.getElementById('f-seat').value.trim(),
    companions: parseList(document.getElementById('f-companions').value),
    songs: parseList(document.getElementById('f-songs').value),
    situation: document.getElementById('f-situation').value.trim(),
    memo: document.getElementById('f-memo').value.trim(),
    rating: currentRating, tags, ticketImage: ticketBase64, photos: photosBase64
  };

  if (currentEditId) updateConcert(currentEditId, data);
  else addConcert(data);

  document.getElementById('concertModal').classList.remove('active');
  renderTimeline();
  if (document.getElementById('tab-analysis').classList.contains('active')) renderAnalysis();
}

// ===== Export / Import =====
function exportData() {
  const json = JSON.stringify(getConcerts(), null, 2);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([json], {type:'application/json'}));
  a.download = `mrc-record-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
}

function importData(file) {
  if (!file) return;
  const r = new FileReader();
  r.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error();
      saveConcerts(data);
      renderTimeline();
      if (document.getElementById('tab-analysis').classList.contains('active')) renderAnalysis();
      showToast(`${data.length}件のデータをインポートしました！`);
    } catch { showToast('インポートに失敗しました。JSONを確認してください。', true); }
  };
  r.readAsText(file);
}

// ===== Toast =====
function showToast(msg, isError = false) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:${isError?'#c00':'#1a1a1a'};color:#fff;
    padding:10px 20px;border-radius:8px;font-size:13px;z-index:9999;
    border:1px solid ${isError?'#f00':'#444'};box-shadow:0 4px 20px rgba(0,0,0,0.5);
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ===== Initialize =====
function init() {
  if (!localStorage.getItem(SEED_LOADED_KEY) && getConcerts().length === 0) {
    saveConcerts(SEED_DATA);
    localStorage.setItem(SEED_LOADED_KEY, '1');
  }

  setupTabs();
  setupForm();

  document.getElementById('addConcertBtn').addEventListener('click', openAddModal);

  ['modalClose','cancelBtn'].forEach(id => {
    document.getElementById(id).addEventListener('click', () => document.getElementById('concertModal').classList.remove('active'));
  });
  document.getElementById('detailClose').addEventListener('click', () => document.getElementById('detailModal').classList.remove('active'));

  ['concertModal','detailModal'].forEach(id => {
    document.getElementById(id).addEventListener('click', e => {
      if (e.target.id === id) document.getElementById(id).classList.remove('active');
    });
  });

  document.getElementById('detailEditBtn').addEventListener('click', e => openEditModal(e.currentTarget.dataset.id));
  document.getElementById('detailDeleteBtn').addEventListener('click', e => {
    if (confirm('このライブ記録を削除しますか？')) {
      deleteConcert(e.currentTarget.dataset.id);
      document.getElementById('detailModal').classList.remove('active');
      renderTimeline();
    }
  });

  document.getElementById('exportBtn').addEventListener('click', exportData);
  document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
  document.getElementById('importFile').addEventListener('change', e => {
    importData(e.target.files[0]);
    e.target.value = '';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('concertModal').classList.remove('active');
      document.getElementById('detailModal').classList.remove('active');
    }
  });

  renderTimeline();
}

document.addEventListener('DOMContentLoaded', init);

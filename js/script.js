(function () {
  const STORAGE_KEY = 'coveranks_final_v3';
  const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  const defaultState = {
    covers: [
      { id: 'c1', title: 'Lemon (Cover)', artist: 'A-Soul', originalInfo: '원곡: 요네즈 켄시 - Lemon', likes: 320, dislikes: 12, url: RICKROLL_URL },
      { id: 'c2', title: 'Pretender (Cover)', artist: 'Band X', originalInfo: '원곡: Official髭男dism - Pretender', likes: 210, dislikes: 9, url: RICKROLL_URL },
      { id: 'c3', title: '밤을 달리다 (Cover)', artist: 'Vocal Y', originalInfo: '원곡: YOASOBI - 夜에 駆ける', likes: 180, dislikes: 6, url: RICKROLL_URL },
      { id: 'c4', title: 'Ditto (Acoustic)', artist: 'Lee Cover', originalInfo: '원곡: NewJeans - Ditto', likes: 155, dislikes: 2, url: RICKROLL_URL },
      { id: 'c5', title: 'Hype Boy (Jazz)', artist: 'Piano Park', originalInfo: '원곡: NewJeans - Hype Boy', likes: 142, dislikes: 4, url: RICKROLL_URL },
      { id: 'c6', title: 'Stay With Me (Rock)', artist: 'Guitar King', originalInfo: '원곡: Miki Matsubara - Stay With Me', likes: 130, dislikes: 7, url: RICKROLL_URL },
      { id: 'c7', title: 'Plastic Love (Cover)', artist: 'Future Funker', originalInfo: '원곡: Mariya Takeuchi - Plastic Love', likes: 125, dislikes: 3, url: RICKROLL_URL },
      { id: 'c8', title: 'Dynamite (Piano)', artist: 'Mozart Jr.', originalInfo: '원곡: BTS - Dynamite', likes: 110, dislikes: 1, url: RICKROLL_URL },
      { id: 'c9', title: '신호등 (Cover)', artist: 'Busking Boy', originalInfo: '원곡: 이무진 - 신호등', likes: 98, dislikes: 5, url: RICKROLL_URL },
      { id: 'c10', title: '사건의 지평선 (Metal)', artist: 'Heaviness', originalInfo: '원곡: 윤하 - 사건의 지평선', likes: 88, dislikes: 12, url: RICKROLL_URL },
      { id: 'c11', title: 'Next Level (Opera)', artist: 'Soprano Kim', originalInfo: '원곡: aespa - Next Level', likes: 77, dislikes: 15, url: RICKROLL_URL },
      { id: 'c12', title: 'TOMBOY (Punk)', artist: 'Rough Band', originalInfo: '원곡: (G)I-DLE - TOMBOY', likes: 65, dislikes: 8, url: RICKROLL_URL },
      { id: 'c13', title: 'LOVE DIVE (Strings)', artist: 'Orchestra V', originalInfo: '원곡: IVE - LOVE DIVE', likes: 54, dislikes: 2, url: RICKROLL_URL }
    ]
  };

  function loadState(){
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultState;
  }
  function saveState(s){ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

  function typeWriter(elementId, text, speed, callback) {
    let i = 0;
    const ele = document.getElementById(elementId);
    if(!ele) return;
    ele.innerHTML = "";
    function type() {
      if (i < text.length) {
        ele.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) callback();
    }
    type();
  }

  function createTriangles() {
    const container = document.getElementById('bg-triangles');
    for (let i = 0; i < 12; i++) {
      const tri = document.createElement('div');
      tri.className = 'triangle';
      tri.style.left = Math.random() * 100 + '%';
      tri.style.animationDelay = Math.random() * 15 + 's';
      container.appendChild(tri);
    }
  }

  window.renderMain = function(filterQuery = ''){
    const container = document.getElementById('covers-container');
    const state = loadState();
    let covers = state.covers.slice();

    if (filterQuery){
      covers = covers.filter(c => c.title.toLowerCase().includes(filterQuery.toLowerCase()));
      document.getElementById('site-hero').style.display = 'none';
    } else {
      document.getElementById('site-hero').style.display = 'block';
    }

    covers.sort((a,b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));

    container.innerHTML = covers.map(c => `
      <div class="list-row">
        <div class="list-left">
          <div class="thumb-compact">${c.artist[0]}</div>
          <div class="meta">
            <div class="original-tooltip">${c.originalInfo || '원곡 정보 없음'}</div>
            <a href="${c.url}" target="_blank">
              <div class="title">${c.title}</div>
              <div class="artist-name">${c.artist}</div>
            </a>
          </div>
        </div>
        <div class="vote-wrap">
          <div class="vote">
            <button onclick="handleVote('${c.id}', 1)">▲</button>
            <div class="score">${c.likes - c.dislikes}</div>
            <button onclick="handleVote('${c.id}', -1)">▼</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.handleVote = function(id, val) {
    const state = loadState();
    const item = state.covers.find(x => x.id === id);
    if(val > 0) item.likes++; else item.dislikes++;
    saveState(state);
    window.renderMain(document.getElementById('global-search').value);
  };

  function init(){
    createTriangles();
    
    typeWriter("type-title", "Coveranks", 120, () => {
      typeWriter("type-lead", "원곡의 감동을 잇는 최고의 커버를 발견하세요.\n사용자의 평가로 완성되는 투명한 랭킹 시스템.", 40);
    });

    document.getElementById('nav-submit').onclick = () => {
      document.getElementById('page-home').classList.add('hidden');
      document.getElementById('page-submit').classList.remove('hidden');
    };

    document.getElementById('btn-back-home').onclick = () => {
      document.getElementById('page-submit').classList.add('hidden');
      document.getElementById('page-home').classList.remove('hidden');
    };

    document.getElementById('btn-submit-cover').onclick = () => {
      const title = document.getElementById('input-song-title-submit').value;
      const origArtist = document.getElementById('input-song-artist-submit').value;
      const artist = document.getElementById('input-cover-artist-submit').value;
      
      if(!title || !artist || !origArtist) return alert('모든 항목을 입력해주세요.');
      
      const state = loadState();
      state.covers.push({
        id: 'c' + Date.now(),
        title: title + ' (Cover)',
        artist: artist,
        originalInfo: `원곡: ${origArtist} - ${title}`,
        likes: 0, dislikes: 0,
        url: RICKROLL_URL
      });
      saveState(state);
      alert('신청되었습니다!');
      location.reload();
    };

    document.getElementById('global-search').oninput = (e) => window.renderMain(e.target.value);
    document.getElementById('home-logo').onclick = () => location.reload();

    window.renderMain();
  }

  window.onload = init;
})();
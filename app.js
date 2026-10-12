(async () => {
  const $ = s => document.querySelector(s);
  const D = await (await fetch('data/portfolio.json')).json();
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const chips = a => `<div class="chips">${a.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div>`;
  const list = a => `<ul>${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  const C = D.contact;
  const explorer = (path, side, body) => `<div class="exp"><div class="bar"><button class="btn" aria-label="Précédent">◀</button><button class="btn" aria-label="Suivant">▶</button><input value="Ordinateur › ${esc(path)}" readonly aria-label="Adresse"><button class="btn" data-act="refresh" aria-label="Actualiser">⟳</button><input style="max-width:120px" placeholder="Rechercher" aria-label="Rechercher"></div><div class="cols"><div class="side"><b>Favoris</b><br>Bureau<br>Documents<br>Téléchargements<br><b>Ordinateur</b></div><div class="main">${body}</div></div></div>`;

  const APPS = {
    welcome: { t: 'Bienvenue', i: '🖥️', w: 420, h: 260, r: () => `<h2>Mohammed Karzaz</h2><p><b>Computer Engineering Student · Software Developer</b></p><p>Welcome to my digital workspace.<br>Explore my experience, projects, skills and journey.</p><button class="btn" data-open="about">Explore Portfolio</button> <button class="btn" data-act="close">Close</button>` },
    about: { t: 'À propos de Mohammed', i: '👤', r: () => `<h2>${D.name}</h2><p><b>${D.title}</b> · ${D.role}</p><div class="lead">${esc(D.profile)}</div><h3>Propriétés</h3><table><tr><td>Formation</td><td>4ᵉ année, SUPMTI</td></tr><tr><td>Recherche</td><td>Stage (été ou PFE) ou premier poste, y compris à distance</td></tr><tr><td>Lieu</td><td>${C.location}</td></tr></table><h3>Langues</h3>${D.languages.map(l => `<p>🌐 <b>${l.name}</b> — ${l.level}</p>`).join('')}<h3>Crédits</h3><p>© 2026 Mohammed Karzaz · Built with HTML, CSS &amp; JavaScript</p>` },
    projects: { t: 'Projets', i: '📁', r: () => explorer('Projets', '', D.projects.map(p => `<details><summary>📁 ${esc(p.name)}</summary><p><b>Technologie :</b> ${esc(p.tech)}${p.status ? `<br><b>Statut :</b> ${esc(p.status)}` : ''}<br>${esc(p.description)}<br>${esc(p.features)}</p>${p.name.includes('ce site') ? '<p><i>This website — vous êtes dedans.</i></p>' : ''}</details>`).join('') + `<details><summary>📁 Future Projects</summary><p>Coming soon...</p></details>`) },
    experience: { t: 'Expérience', i: '💼', r: () => explorer('Expérience', '', D.experience.map(e => `<h2>📄 ONEE Internship</h2><p><b>Entreprise :</b> ${esc(e.company)}<br><b>Poste :</b> ${esc(e.role)}<br><b>Période :</b> ${esc(e.period)}</p><h3>Technologies</h3>${chips(e.tech)}<h3>Responsabilités</h3>${list(e.tasks)}`).join('')) },
    education: { t: 'Formation', i: '🎓', r: () => explorer('Formation', '', D.education.map(e => `<details open><summary>📄 ${esc(e.school)}</summary><p>${esc(e.period)}<br>${esc(e.degree)}</p></details>`).join('')) },
    skills: { t: 'Compétences — Panneau de configuration', i: '⚙️', r: () => `<h2>Composants installés</h2>` + Object.entries(D.skills).map(([k, v]) => `<h3>${esc(k)}</h3>${chips(v)}`).join('') },
    leadership: { t: 'Vie étudiante', i: '🏛️', r: () => `<h2>${esc(D.leadership.role)}</h2><div class="lead">Leadership · Travail d’équipe · Organisation</div>${list(D.leadership.tasks)}` },
    contact: { t: 'Contact', i: '✉️', r: () => `<h2>Contact</h2><p>✉️ <a href="mailto:${C.email}">${C.email}</a><br>📞 ${C.phone}<br>📍 ${C.location}<br>🐙 <a href="${C.github}" target="_blank" rel="noopener">GitHub</a> · 💼 <a href="${C.linkedinUrl}" target="_blank" rel="noopener">LinkedIn : ${C.linkedin}</a></p><form id="cf" novalidate><label>Nom<input name="n" required></label><label>Email<input name="e" type="email" required></label><label>Objet<input name="s" required></label><label>Message<textarea name="m" rows="4" required></textarea></label><p><button class="btn">Send Message</button> <span id="cmsg" role="status"></span></p></form>` },
    cv: { t: 'Mon CV', i: '📄', r: () => `<p><a class="btn" href="assets/cv.pdf" download>Download CV</a></p><iframe src="assets/cv.pdf" title="CV de Mohammed Karzaz" style="width:100%;height:calc(100% - 50px);border:1px solid #888"></iframe>` },
    terminal: { t: 'C:\\Windows\\system32\\cmd.exe', i: '⌨️', r: () => `<div class="term"><div id="out">Microsoft Windows [Version 6.1.7601]\nTapez help pour la liste des commandes.\n</div>C:\\Users\\Mohammed&gt; <input id="cmd" autocomplete="off" aria-label="Commande"></div>` },
    computer: { t: 'Ordinateur', i: '💻', r: () => explorer('Ordinateur', '', `<p><button class="btn" data-open="skills">💽 Local Disk (C:) — Mohammed’s Skills</button></p>`) },
    recycle: { t: 'Corbeille', i: '🗑️', w: 380, h: 200, r: () => `<p>The developer’s unfinished ideas are currently here.</p>` }
  };
  const ICONS = [['computer', 'Ordinateur'], ['about', 'Mohammed'], ['projects', 'Projets'], ['experience', 'Expérience'], ['education', 'Formation'], ['skills', 'Compétences'], ['leadership', 'Vie étudiante'], ['contact', 'Contact'], ['cv', 'My CV'], ['terminal', 'Terminal'], ['recycle', 'Corbeille']];
  $('#icons').innerHTML = ICONS.map(([id, l]) => `<button class="icon" data-open="${id}"><i>${APPS[id].i}</i>${l}</button>`).join('');
  $('#sli').href = C.linkedinUrl;

  let z = 10, n = 0; const W = {};
  function focus(id) { Object.values(W).forEach(w => w.tk.classList.remove('on')); const w = W[id]; w.el.style.zIndex = ++z; w.tk.classList.add('on') }
  function open(id) {
    if (W[id]) { W[id].el.classList.remove('min'); return focus(id) }
    const a = APPS[id], el = document.createElement('section'); el.className = 'win'; el.setAttribute('role', 'dialog');
    const w = a.w || 720, h = a.h || 480; n++;
    el.style.cssText = `left:${60 + n % 6 * 28}px;top:${30 + n % 6 * 26}px;width:min(${w}px,94vw);height:min(${h}px,70vh)`;
    el.innerHTML = `<div class="tb"><span>${a.i} ${esc(a.t)}</span><button data-w="min" aria-label="Réduire">–</button><button data-w="max" aria-label="Agrandir">□</button><button class="x" data-w="x" aria-label="Fermer">✕</button></div><div class="body">${a.r()}</div>`;
    $('#wins').append(el);
    const tk = document.createElement('button'); tk.className = 'task'; tk.textContent = a.i + ' ' + a.t; $('#tasks').append(tk);
    W[id] = { el, tk };
    const close = () => { el.remove(); tk.remove(); delete W[id] };
    tk.onclick = () => { const m = el.classList.contains('min'); if (m || !tk.classList.contains('on')) { el.classList.remove('min'); focus(id) } else { el.classList.add('min'); tk.classList.remove('on') } };
    el.addEventListener('pointerdown', () => focus(id));
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-w],[data-act]'); if (!b) return; const k = b.dataset.w || b.dataset.act;
      if (k == 'x' || k == 'close') close(); else if (k == 'min') { el.classList.add('min'); tk.classList.remove('on') } else if (k == 'max') el.classList.toggle('max'); else if (k == 'refresh') { el.querySelector('.body').innerHTML = a.r() }
    });
    const tb = el.querySelector('.tb');
    tb.addEventListener('pointerdown', e => {
      if (e.target.closest('button') || el.classList.contains('max') || innerWidth < 700) return; const dx = e.clientX - el.offsetLeft, dy = e.clientY - el.offsetTop; tb.setPointerCapture(e.pointerId);
      tb.onpointermove = m => { el.style.left = Math.max(0, m.clientX - dx) + 'px'; el.style.top = Math.max(0, Math.min(innerHeight - 80, m.clientY - dy)) + 'px' }; tb.onpointerup = () => tb.onpointermove = null
    });
    tb.addEventListener('dblclick', e => { if (!e.target.closest('button')) el.classList.toggle('max') });
    if (id == 'contact') el.querySelector('#cf').onsubmit = e => {
      e.preventDefault(); const f = e.target, m = el.querySelector('#cmsg');
      if (![...f.elements].every(x => !x.name || x.value.trim()) || !/^\S+@\S+\.\S+$/.test(f.e.value)) { m.textContent = '⚠ Veuillez remplir tous les champs avec un email valide.'; return }
      location.href = `mailto:${C.email}?subject=${encodeURIComponent(f.s.value)}&body=${encodeURIComponent(f.m.value + '\n\n' + f.n.value + ' (' + f.e.value + ')')}`; m.textContent = '✔ Votre application de messagerie va s’ouvrir.'
    };
    if (id == 'terminal') term(el);
    if (id == 'recycle') dlg('Corbeille', 'The developer’s unfinished ideas are currently here.');
    focus(id);
  }
  function term(el) {
    const out = el.querySelector('#out'), inp = el.querySelector('#cmd'); inp.focus();
    const R = { whoami: D.name, role: D.role, about: D.profile, education: D.education.map(e => e.school + ' - ' + e.degree).join('\n'), skills: Object.values(D.skills).flat().join(' '), projects: D.projects.map(p => p.name).join('\n'), experience: D.experience.map(e => e.role + ' - ' + e.company + ' (' + e.period + ')').join('\n'), contact: C.email, help: 'help about skills projects experience education contact whoami role clear', 'sudo hire-mohammed': 'Permission granted.\nContact Mohammed to continue.' };
    inp.onkeydown = e => {
      if (e.key != 'Enter') return; const c = inp.value.trim().toLowerCase(); inp.value = ''; out.textContent += 'C:\\Users\\Mohammed> ' + c + '\n';
      if (c == 'clear') out.textContent = ''; else if (c) out.textContent += (R[c] || `'${c}' n’est pas reconnu. Tapez help.`) + '\n\n'; el.querySelector('.body').scrollTop = 1e9
    }
  }
  function dlg(t, m, ok = 1) {
    const d = $('#dlg'); d.hidden = false; d.innerHTML = `<div role="alertdialog"><b>${t}</b><p>${m}</p><div class="row">${ok ? '<button class="btn" id="d1">OK</button>' : '<button class="btn" id="d1">Cancel</button> <button class="btn" id="d2">Restart Portfolio</button>'}</div></div>`;
    $('#d1').focus(); $('#d1').onclick = () => d.hidden = true; if ($('#d2')) $('#d2').onclick = () => location.reload()
  }
  // Start menu
  const sl = $('#slist'); const items = [...ICONS.map(([i, l]) => [i, APPS[i].i + ' ' + l]), ['cv', '📄 My CV']];
  const fill = q => sl.innerHTML = items.filter(x => x[1].toLowerCase().includes(q.toLowerCase())).map(x => `<li><button data-open="${x[0]}">${x[1]}</button></li>`).join(''); fill('');
  $('#ssearch').oninput = e => fill(e.target.value);
  $('#orb').onclick = e => { e.stopPropagation(); $('#start').hidden = !$('#start').hidden; if (!$('#start').hidden) $('#ssearch').focus() };
  $('#shut').onclick = () => { $('#start').hidden = true; dlg('Arrêter', 'Are you sure you want to close Mohammed’s portfolio?', 0) };
  // Global clicks
  document.addEventListener('click', e => {
    const o = e.target.closest('[data-open]'); if (o) { open(o.dataset.open); $('#start').hidden = true }
    else if (!e.target.closest('#start')) $('#start').hidden = true; $('#ctx').hidden = true;
    const ic = e.target.closest('.icon'); document.querySelectorAll('.icon').forEach(x => x.classList.toggle('sel', x == ic))
  });
  document.addEventListener('dblclick', e => { const o = e.target.closest('.icon'); if (o) open(o.dataset.open) });
  document.querySelectorAll('.icon').forEach(b => b.addEventListener('keydown', e => { if (e.key == 'Enter') open(b.dataset.open) }));
  addEventListener('keydown', e => { if (e.key == 'Escape') { $('#start').hidden = true; $('#ctx').hidden = true } });
  $('#desktop').addEventListener('contextmenu', e => {
    if (e.target.closest('.win')) return; e.preventDefault(); const c = $('#ctx');
    c.innerHTML = ['Affichage', 'Trier par', 'Actualiser', 'Coller', 'Nouveau', 'Paramètres d’affichage', 'Personnaliser'].map(x => `<li>${x}</li>`).join(''); c.hidden = false; c.style.left = Math.min(e.clientX, innerWidth - 200) + 'px'; c.style.top = Math.min(e.clientY, innerHeight - 220) + 'px';
    c.onclick = ev => {
      const t = ev.target.textContent; if (t == 'Actualiser') $('#icons').style.opacity = .3, setTimeout(() => $('#icons').style.opacity = 1, 150);
      if (t == 'Personnaliser' || t == 'Affichage') { const th = ['classic', 'dark', 'dev']; const nx = th[(th.indexOf(document.body.dataset.theme) + 1) % 3]; document.body.dataset.theme = nx; dlg('Personnaliser', 'Thème : ' + { classic: 'Classic Windows 7', dark: 'Dark Glass', dev: 'Developer Mode' }[nx]) }
    }
  });
  const tick = () => { const d = new Date(); $('#clock').innerHTML = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '<br>' + d.toLocaleDateString() }; tick(); setInterval(tick, 3e4);
  open('welcome');
})();

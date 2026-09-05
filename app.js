/**
 * SheMesh Tribe LLC — Public Ecosystem
 * Offline-first, local-only, public-safe application.
 * No external AI APIs. No remote database. No credentials.
 */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    audit: 'shemesh_public_audit',
    locker: 'shemesh_public_locker',
    learning: 'shemesh_public_learning',
    community: 'shemesh_public_community'
  };

  const HUBS = [
    { num: '01', name: 'DigiHustle SA', desc: 'Digital skills, small-business basics and practical income pathways.', tool: 'tool-butler' },
    { num: '02', name: 'Help Improve Unemployment', desc: 'Work readiness, CV preparation, job-search and skills planning.', tool: 'tool-butler' },
    { num: '03', name: 'Security & Protection', desc: 'Scam awareness, identity protection, verification and safer digital habits.', tool: 'tool-safety' },
    { num: '04', name: 'CivicPulse', desc: 'Public-process preparation, issue documentation and community participation.', tool: 'tool-locker' },
    { num: '05', name: 'SentinelZA', desc: 'General community-safety preparation and incident readiness.', tool: 'tool-safety' },
    { num: '06', name: 'AI Butler', desc: 'Offline planning helper using generic templates.', tool: 'tool-butler' },
    { num: '07', name: 'Education', desc: 'Learning pathways, study blocks, checklists and local progress.', tool: 'learning' },
    { num: '08', name: 'Homesteading', desc: 'Household resilience, food growing, budgeting and preservation.', tool: 'tool-audit' },
    { num: '09', name: 'Food Security', desc: 'Food planning, storage, budgeting and community-resource thinking.', tool: 'tool-audit' },
    { num: '10', name: 'Employment & Skills', desc: 'Skills inventory, portfolios and work readiness.', tool: 'tool-butler' },
    { num: '11', name: 'Community Exchange', desc: 'Local needs, skills, resources and ideas.', tool: 'community' },
    { num: '12', name: 'Creative Corner', desc: 'Writing, storytelling, design prompts and creative practice.', tool: 'tool-butler' },
    { num: '13', name: 'Family Resilience', desc: 'Household planning for learning, food, safety, documents and emergencies.', tool: 'tool-audit' }
  ];

  const AUDIT_ITEMS = [
    'I know my next learning or skills target.',
    'My CV/profile/basic portfolio is updated.',
    'I have a simple household food plan.',
    'I know where my important documents are.',
    'I have checked my digital-security habits.',
    'I have a short emergency/contact plan.',
    'I have taken one practical employment/income action.',
    'I have taken one community/support action.'
  ];

  const LEARNING_STEPS = [
    'Choose an outcome.',
    'Break it into 3–5 smaller actions.',
    'Collect one trustworthy resource.',
    'Work one focused block.',
    'Create evidence of progress.',
    'Check what worked and what did not.',
    'Repeat the next useful action.',
    'Record the result and next target.'
  ];

  const BUTLER_TEMPLATES = {
    plan: {
      title: 'PLAN',
      fields: [
        { id: 'desired', label: 'Desired result', type: 'text' },
        { id: 'action1', label: 'Action 1', type: 'text' },
        { id: 'action2', label: 'Action 2', type: 'text' },
        { id: 'action3', label: 'Action 3', type: 'text' },
        { id: 'smallest', label: 'Smallest first action', type: 'text' },
        { id: 'check', label: 'How will you check progress?', type: 'text' },
        { id: 'next', label: 'Next step after check', type: 'text' }
      ],
      format: function (d) {
        return 'PLAN\n\nDesired result: ' + (d.desired || '—') +
          '\n\nThree actions:\n1. ' + (d.action1 || '—') +
          '\n2. ' + (d.action2 || '—') +
          '\n3. ' + (d.action3 || '—') +
          '\n\nSmallest first action: ' + (d.smallest || '—') +
          '\n\nCheck: ' + (d.check || '—') +
          '\n\nNext step: ' + (d.next || '—');
      }
    },
    checklist: {
      title: 'CHECKLIST',
      fields: [
        { id: 'result', label: 'Define result', type: 'text' },
        { id: 'gather', label: 'Gather what is needed', type: 'text' },
        { id: 'first', label: 'First action', type: 'text' },
        { id: 'check', label: 'Check', type: 'text' },
        { id: 'record', label: 'Record', type: 'text' },
        { id: 'next', label: 'Next', type: 'text' }
      ],
      format: function (d) {
        return 'CHECKLIST\n\nDefine result: ' + (d.result || '—') +
          '\nGather what is needed: ' + (d.gather || '—') +
          '\nFirst action: ' + (d.first || '—') +
          '\nCheck: ' + (d.check || '—') +
          '\nRecord: ' + (d.record || '—') +
          '\nNext: ' + (d.next || '—');
      }
    },
    simple: {
      title: 'MAKE IT SIMPLE',
      fields: [
        { id: 'what', label: 'What', type: 'text' },
        { id: 'why', label: 'Why', type: 'text' },
        { id: 'example', label: 'Example', type: 'text' },
        { id: 'explain', label: 'Explain-back (in your words)', type: 'textarea' }
      ],
      format: function (d) {
        return 'MAKE IT SIMPLE\n\nWhat: ' + (d.what || '—') +
          '\nWhy: ' + (d.why || '—') +
          '\nExample: ' + (d.example || '—') +
          '\nExplain-back: ' + (d.explain || '—');
      }
    },
    study: {
      title: 'STUDY',
      fields: [
        { id: 'prep', label: '5-minute preparation', type: 'text' },
        { id: 'focus', label: '20-minute focused study', type: 'text' },
        { id: 'practice', label: '10-minute practice', type: 'text' },
        { id: 'review', label: '5-minute review', type: 'text' },
        { id: 'next', label: '5-minute next-step plan', type: 'text' }
      ],
      format: function (d) {
        return 'STUDY BLOCK\n\n5-min preparation: ' + (d.prep || '—') +
          '\n20-min focused study: ' + (d.focus || '—') +
          '\n10-min practice: ' + (d.practice || '—') +
          '\n5-min review: ' + (d.review || '—') +
          '\n5-min next-step plan: ' + (d.next || '—');
      }
    },
    job: {
      title: 'JOB',
      fields: [
        { id: 'role', label: 'Identify role / client', type: 'text' },
        { id: 'skills', label: 'Map relevant skills', type: 'text' },
        { id: 'cv', label: 'Improve one CV line', type: 'text' },
        { id: 'outreach', label: 'Targeted application / outreach action', type: 'text' },
        { id: 'followup', label: 'Record follow-up', type: 'text' }
      ],
      format: function (d) {
        return 'JOB\n\nRole / client: ' + (d.role || '—') +
          '\nRelevant skills: ' + (d.skills || '—') +
          '\nOne CV line improvement: ' + (d.cv || '—') +
          '\nOutreach action: ' + (d.outreach || '—') +
          '\nFollow-up: ' + (d.followup || '—');
      }
    }
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function initNav() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  function initHubs() {
    const grid = document.getElementById('hubGrid');
    if (!grid) return;
    HUBS.forEach(function (hub) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hub-card';
      btn.setAttribute('role', 'listitem');
      btn.innerHTML =
        '<span class="hub-num">' + hub.num + '</span>' +
        '<div class="hub-name">' + hub.name + '</div>' +
        '<p class="hub-desc">' + hub.desc + '</p>';
      btn.addEventListener('click', function () {
        if (hub.tool === 'learning') {
          document.getElementById('learning').scrollIntoView({ behavior: 'smooth' });
        } else if (hub.tool === 'community') {
          document.getElementById('community').scrollIntoView({ behavior: 'smooth' });
        } else {
          const el = document.getElementById(hub.tool);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      });
      grid.appendChild(btn);
    });
  }

  function initAudit() {
    const list = document.getElementById('auditList');
    const fill = document.getElementById('auditProgressFill');
    const label = document.getElementById('auditProgressLabel');
    const bar = document.getElementById('auditProgressBar');
    const resetBtn = document.getElementById('auditReset');
    if (!list) return;
    let state = load(STORAGE_KEYS.audit, Array(AUDIT_ITEMS.length).fill(false));
    function render() {
      list.innerHTML = '';
      AUDIT_ITEMS.forEach(function (text, i) {
        const li = document.createElement('li');
        const id = 'audit-' + i;
        const checked = !!state[i];
        li.innerHTML =
          '<input type="checkbox" id="' + id + '" ' + (checked ? 'checked' : '') + '>' +
          '<label for="' + id + '">' + text + '</label>';
        const cb = li.querySelector('input');
        cb.addEventListener('change', function () {
          state[i] = cb.checked;
          save(STORAGE_KEYS.audit, state);
          updateProgress();
        });
        list.appendChild(li);
      });
      updateProgress();
    }
    function updateProgress() {
      const done = state.filter(Boolean).length;
      const pct = Math.round((done / AUDIT_ITEMS.length) * 100);
      if (fill) fill.style.width = pct + '%';
      if (label) label.textContent = pct + '% complete (' + done + '/' + AUDIT_ITEMS.length + ')';
      if (bar) bar.setAttribute('aria-valuenow', pct);
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (confirm('Reset all checklist items?')) {
          state = Array(AUDIT_ITEMS.length).fill(false);
          save(STORAGE_KEYS.audit, state);
          render();
        }
      });
    }
    render();
  }

  let currentMode = 'plan';

  function initButler() {
    const panel = document.getElementById('butlerPanel');
    const output = document.getElementById('butlerOutput');
    const genBtn = document.getElementById('butlerGenerate');
    const clearBtn = document.getElementById('butlerClear');
    const modeBtns = document.querySelectorAll('.mode-btn');
    function renderFields() {
      const tpl = BUTLER_TEMPLATES[currentMode];
      if (!tpl || !panel) return;
      panel.innerHTML = '';
      tpl.fields.forEach(function (f) {
        const label = document.createElement('label');
        label.setAttribute('for', 'butler-' + f.id);
        label.textContent = f.label;
        panel.appendChild(label);
        let input;
        if (f.type === 'textarea') {
          input = document.createElement('textarea');
          input.rows = 3;
        } else {
          input = document.createElement('input');
          input.type = 'text';
        }
        input.id = 'butler-' + f.id;
        input.name = f.id;
        input.autocomplete = 'off';
        panel.appendChild(input);
      });
    }
    modeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        modeBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        currentMode = btn.getAttribute('data-mode');
        if (output) {
          output.classList.remove('is-visible');
          output.textContent = '';
        }
        renderFields();
      });
    });
    if (genBtn) {
      genBtn.addEventListener('click', function () {
        const tpl = BUTLER_TEMPLATES[currentMode];
        if (!tpl) return;
        const data = {};
        tpl.fields.forEach(function (f) {
          const el = document.getElementById('butler-' + f.id);
          data[f.id] = el ? el.value.trim() : '';
        });
        const text = tpl.format(data);
        if (output) {
          output.textContent = text;
          output.classList.add('is-visible');
        }
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        const tpl = BUTLER_TEMPLATES[currentMode];
        if (tpl) {
          tpl.fields.forEach(function (f) {
            const el = document.getElementById('butler-' + f.id);
            if (el) el.value = '';
          });
        }
        if (output) {
          output.classList.remove('is-visible');
          output.textContent = '';
        }
      });
    }
    renderFields();
  }

  function initLocker() {
    const form = document.getElementById('lockerForm');
    const list = document.getElementById('lockerList');
    const exportBtn = document.getElementById('lockerExport');
    const clearBtn = document.getElementById('lockerClearAll');
    const dateInput = document.getElementById('lockerDate');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().slice(0, 10);
    }
    let records = load(STORAGE_KEYS.locker, []);
    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
    function render() {
      if (!list) return;
      list.innerHTML = '';
      if (records.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'record-item';
        empty.innerHTML = '<p class="record-note" style="margin:0;color:var(--grey-600)">No records yet. Add one above.</p>';
        list.appendChild(empty);
        return;
      }
      records.slice().reverse().forEach(function (rec) {
        const li = document.createElement('li');
        li.className = 'record-item';
        li.innerHTML =
          '<div class="record-body">' +
          '<p class="record-title">' + escapeHtml(rec.title) + '</p>' +
          '<p class="record-meta">' + escapeHtml(rec.date) + '</p>' +
          '<p class="record-note">' + escapeHtml(rec.note) + '</p>' +
          '</div>' +
          '<button type="button" class="record-delete" data-id="' + rec.id + '" aria-label="Delete record">Delete</button>';
        list.appendChild(li);
      });
      list.querySelectorAll('.record-delete').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const id = btn.getAttribute('data-id');
          records = records.filter(function (r) { return r.id !== id; });
          save(STORAGE_KEYS.locker, records);
          render();
        });
      });
    }
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('lockerTitle').value.trim();
        const date = document.getElementById('lockerDate').value;
        const note = document.getElementById('lockerNote').value.trim();
        if (!title || !date || !note) return;
        records.push({ id: uid(), title: title, date: date, note: note });
        save(STORAGE_KEYS.locker, records);
        form.reset();
        if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
        render();
      });
    }
    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        const data = JSON.stringify(records, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'shemesh-evidence-locker-' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm('Delete ALL local Evidence Locker records? This cannot be undone.')) {
          records = [];
          save(STORAGE_KEYS.locker, records);
          render();
        }
      });
    }
    render();
  }

  function initLearning() {
    const container = document.getElementById('learningPath');
    const resetBtn = document.getElementById('learningReset');
    if (!container) return;
    let state = load(STORAGE_KEYS.learning, Array(LEARNING_STEPS.length).fill(false));
    function render() {
      container.innerHTML = '';
      LEARNING_STEPS.forEach(function (text, i) {
        const div = document.createElement('div');
        div.className = 'learning-step';
        const id = 'learn-' + i;
        const checked = !!state[i];
        div.innerHTML =
          '<input type="checkbox" id="' + id + '" ' + (checked ? 'checked' : '') + '>' +
          '<label for="' + id + '"><span class="step-num">' + (i + 1) + '.</span> ' + text + '</label>';
        const cb = div.querySelector('input');
        cb.addEventListener('change', function () {
          state[i] = cb.checked;
          save(STORAGE_KEYS.learning, state);
        });
        container.appendChild(div);
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (confirm('Reset learning path progress?')) {
          state = Array(LEARNING_STEPS.length).fill(false);
          save(STORAGE_KEYS.learning, state);
          render();
        }
      });
    }
    render();
  }

  function initCommunity() {
    const form = document.getElementById('communityForm');
    const list = document.getElementById('communityList');
    const clearBtn = document.getElementById('communityClear');
    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
    let entries = load(STORAGE_KEYS.community, []);
    function render() {
      if (!list) return;
      list.innerHTML = '';
      if (entries.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'record-item';
        empty.innerHTML = '<p class="record-note" style="margin:0;color:var(--grey-600)">No entries yet. Add a need, skill, resource or idea.</p>';
        list.appendChild(empty);
        return;
      }
      entries.slice().reverse().forEach(function (entry) {
        const li = document.createElement('li');
        li.className = 'record-item';
        li.innerHTML =
          '<div class="record-body">' +
          '<p class="record-title">' + escapeHtml(entry.type) + '</p>' +
          '<p class="record-note">' + escapeHtml(entry.description) + '</p>' +
          '</div>' +
          '<button type="button" class="record-delete" data-id="' + entry.id + '" aria-label="Delete entry">Delete</button>';
        list.appendChild(li);
      });
      list.querySelectorAll('.record-delete').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const id = btn.getAttribute('data-id');
          entries = entries.filter(function (e) { return e.id !== id; });
          save(STORAGE_KEYS.community, entries);
          render();
        });
      });
    }
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const type = document.getElementById('communityType').value;
        const description = document.getElementById('communityDesc').value.trim();
        if (!description) return;
        entries.push({ id: uid(), type: type, description: description });
        save(STORAGE_KEYS.community, entries);
        form.reset();
        render();
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm('Clear all local Community Exchange entries?')) {
          entries = [];
          save(STORAGE_KEYS.community, entries);
          render();
        }
      });
    }
    render();
  }

  function registerSW() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').catch(function () {});
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initHubs();
    initAudit();
    initButler();
    initLocker();
    initLearning();
    initCommunity();
    registerSW();
  });
})();

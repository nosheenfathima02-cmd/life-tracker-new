// ═══════════════════════════════════════════════════════════
// LIFE TRACKER APP - COMPLETE ENHANCED VERSION
// All bugs fixed + All new features
// ═══════════════════════════════════════════════════════════

// Note: GOOGLE_CONFIG is loaded from config.js file

// All 114 Surahs of the Quran
const QURAN_SURAHS = [
    "1. Al-Fatihah", "2. Al-Baqarah", "3. Ali 'Imran", "4. An-Nisa", "5. Al-Ma'idah",
    "6. Al-An'am", "7. Al-A'raf", "8. Al-Anfal", "9. At-Tawbah", "10. Yunus",
    "11. Hud", "12. Yusuf", "13. Ar-Ra'd", "14. Ibrahim", "15. Al-Hijr",
    "16. An-Nahl", "17. Al-Isra", "18. Al-Kahf", "19. Maryam", "20. Ta-Ha",
    "21. Al-Anbya", "22. Al-Hajj", "23. Al-Mu'minun", "24. An-Nur", "25. Al-Furqan",
    "26. Ash-Shu'ara", "27. An-Naml", "28. Al-Qasas", "29. Al-'Ankabut", "30. Ar-Rum",
    "31. Luqman", "32. As-Sajdah", "33. Al-Ahzab", "34. Saba", "35. Fatir",
    "36. Ya-Sin", "37. As-Saffat", "38. Sad", "39. Az-Zumar", "40. Ghafir",
    "41. Fussilat", "42. Ash-Shuraa", "43. Az-Zukhruf", "44. Ad-Dukhan", "45. Al-Jathiyah",
    "46. Al-Ahqaf", "47. Muhammad", "48. Al-Fath", "49. Al-Hujurat", "50. Qaf",
    "51. Adh-Dhariyat", "52. At-Tur", "53. An-Najm", "54. Al-Qamar", "55. Ar-Rahman",
    "56. Al-Waqi'ah", "57. Al-Hadid", "58. Al-Mujadila", "59. Al-Hashr", "60. Al-Mumtahanah",
    "61. As-Saf", "62. Al-Jumu'ah", "63. Al-Munafiqun", "64. At-Taghabun", "65. At-Talaq",
    "66. At-Tahrim", "67. Al-Mulk", "68. Al-Qalam", "69. Al-Haqqah", "70. Al-Ma'arij",
    "71. Nuh", "72. Al-Jinn", "73. Al-Muzzammil", "74. Al-Muddaththir", "75. Al-Qiyamah",
    "76. Al-Insan", "77. Al-Mursalat", "78. An-Naba", "79. An-Nazi'at", "80. 'Abasa",
    "81. At-Takwir", "82. Al-Infitar", "83. Al-Mutaffifin", "84. Al-Inshiqaq", "85. Al-Buruj",
    "86. At-Tariq", "87. Al-A'la", "88. Al-Ghashiyah", "89. Al-Fajr", "90. Al-Balad",
    "91. Ash-Shams", "92. Al-Layl", "93. Ad-Duhaa", "94. Ash-Sharh", "95. At-Tin",
    "96. Al-'Alaq", "97. Al-Qadr", "98. Al-Bayyinah", "99. Az-Zalzalah", "100. Al-'Adiyat",
    "101. Al-Qari'ah", "102. At-Takathur", "103. Al-'Asr", "104. Al-Humazah", "105. Al-Fil",
    "106. Quraysh", "107. Al-Ma'un", "108. Al-Kawthar", "109. Al-Kafirun", "110. An-Nasr",
    "111. Al-Masad", "112. Al-Ikhlas", "113. Al-Falaq", "114. An-Nas"
];

// School timetable based on user's schedule
const TIMETABLE = {
    periods: [
        { num: 1, time: '8:45-9:45' },
        { num: 2, time: '9:45-10:30' },
        { num: 3, time: '10:45-11:30' },
        { num: 4, time: '11:30-12:15' },
        { num: 5, time: '12:15-1:00' },
        { num: 6, time: '1:40-2:25' },
        { num: 7, time: '2:25-3:10' }
    ],
    schedule: {
        MON: ['OFFICE', 'OFFICE', 'Geo G9', 'Literacy G8', 'SP G7/8', 'Social G7', 'OFFICE'],
        TUE: ['Social Studies G8', 'OFFICE', 'Literacy G7', 'Geo G9', 'OFFICE', 'PM G7/8', 'OFFICE'],
        WED: ['Geo G9', 'Literacy G7', 'G9 Geo/Quran', 'Lang P. G7/8', 'Lang G7/8', 'Office', 'OFFICE'],
        THU: ['Social G8', 'OFFICE', 'Geo 9/GYM', 'OFFICE', 'Geo 9', 'Social G7', 'OFFICE'],
        FRI: ['OFFICE', 'Geo G9', 'Geo G9', 'PM Writing G7/8', 'OFFICE', 'Literacy G8', 'OFFICE']
    }
};

// Global State
let appData = {
    personal: {
        education: [],
        visa: [],
        license: [],
        custom: {}
    },
    health: {
        dailyHabits: {
            wokeUp: false,
            drankWater: false,
            ateVeg: false,
            exercise: false,
            meditation: false,
            sleep: false,
            lastReset: new Date().toDateString()
        },
        notes: [],
        weight: [],
        period: {
            lastStart: null,
            cycleLength: 28
        }
    },
    religious: {
        prayers: {
            fajr: false,
            dhuhr: false,
            asr: false,
            maghrib: false,
            isha: false,
            tahajjud: false,
            lastReset: new Date().toDateString()
        },
        quran: {
            currentSurah: null,
            memorized: []
        },
        ramadan: {
            fasting: false,
            suhoor: false,
            iftar: false,
            taraweeh: false,
            iftarTime: '18:30',
            lastReset: new Date().toDateString()
        }
    },
    professional: {
        school: [],
        video: [],
        family: [],
        website: [],
        social: [],
        timetableLessons: {},
        reminders: []
    }
};

let gapiInited = false;
let gisInited = false;
let tokenClient;
let currentModal = null;
let currentEditItem = null;

// ═══════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Enhanced Life Tracker...');
    
    loadFromLocalStorage();
    setupEventListeners();
    renderAll();
    checkDailyResets();
    loadGoogleAPI();
    registerServiceWorker();
    
    // Check reminders every minute
    setInterval(checkReminders, 60000);
    checkReminders();
    
    console.log('✅ App initialized successfully!');
});

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('✅ Service Worker registered'))
            .catch(err => console.error('❌ Service Worker error:', err));
    }
}

function loadGoogleAPI() {
    if (typeof GOOGLE_CONFIG === 'undefined') {
        console.warn('⚠️ config.js not loaded. Google Drive sync will not work.');
        return;
    }
    
    // Load Google Identity Services
    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.onload = () => {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CONFIG.CLIENT_ID,
            scope: GOOGLE_CONFIG.SCOPES,
            callback: handleAuthCallback
        });
        gisInited = true;
        console.log('✅ Google Identity Services loaded');
    };
    document.head.appendChild(gisScript);
    
    // Load Google API Client
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.onload = () => {
        gapi.load('client', async () => {
            await gapi.client.init({
                apiKey: GOOGLE_CONFIG.API_KEY,
                discoveryDocs: GOOGLE_CONFIG.DISCOVERY_DOCS
            });
            gapiInited = true;
            console.log('✅ Google API Client loaded');
        });
    };
    document.head.appendChild(gapiScript);
}

// ═══════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════

function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Header buttons
    addListener('enable-notifications', enableNotifications);
    addListener('sync-drive', syncWithDrive);
    addListener('install-app', installApp);
    
    // Personal tab
    addListener('add-education', () => openModal('education'));
    addListener('add-visa', () => openModal('visa'));
    addListener('add-license', () => openModal('license'));
    addListener('add-custom-category', addCustomCategory);
    
    // Health tab
    addCheckboxListener('habit-wakeup', 'health.dailyHabits', 'wokeUp');
    addCheckboxListener('habit-water', 'health.dailyHabits', 'drankWater');
    addCheckboxListener('habit-veg', 'health.dailyHabits', 'ateVeg');
    addCheckboxListener('habit-exercise', 'health.dailyHabits', 'exercise');
    addCheckboxListener('habit-meditation', 'health.dailyHabits', 'meditation');
    addCheckboxListener('habit-sleep', 'health.dailyHabits', 'sleep');
    addListener('add-health-note', () => openModal('healthNote'));
    addListener('add-weight', addWeight);
    addListener('save-period', savePeriod);
    
    // Religious tab
    addCheckboxListener('check-fajr', 'religious.prayers', 'fajr');
    addCheckboxListener('check-dhuhr', 'religious.prayers', 'dhuhr');
    addCheckboxListener('check-asr', 'religious.prayers', 'asr');
    addCheckboxListener('check-maghrib', 'religious.prayers', 'maghrib');
    addCheckboxListener('check-isha', 'religious.prayers', 'isha');
    addCheckboxListener('check-tahajjud', 'religious.prayers', 'tahajjud');
    addListener('mark-memorized', markSurahMemorized);
    addCheckboxListener('ramadan-fasting', 'religious.ramadan', 'fasting');
    addCheckboxListener('ramadan-suhoor', 'religious.ramadan', 'suhoor');
    addCheckboxListener('ramadan-iftar', 'religious.ramadan', 'iftar');
    addCheckboxListener('ramadan-taraweeh', 'religious.ramadan', 'taraweeh');
    addListener('save-iftar-time', saveIftarTime);
    
    // Professional tab
    addListener('add-school-task', () => openModal('school'));
    addListener('add-video-task', () => openModal('video'));
    addListener('add-family-task', () => openModal('family'));
    addListener('add-website-task', () => openModal('website'));
    addListener('add-social-task', () => openModal('social'));
    addListener('add-timetable-lesson', () => openModal('timetableLesson'));
    addListener('add-reminder', () => openModal('reminder'));
    
    // Modal
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modal');
        if (e.target === modal) closeModal();
    });
}

function addListener(id, handler) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', handler);
}

function addCheckboxListener(id, path, key) {
    const checkbox = document.getElementById(id);
    if (!checkbox) return;
    
    const pathParts = path.split('.');
    let data = appData;
    pathParts.forEach(p => data = data[p]);
    
    checkbox.checked = data[key];
    checkbox.addEventListener('change', function() {
        data[key] = this.checked;
        saveToLocalStorage();
        
        // Update UI for prayers
        if (path === 'religious.prayers') {
            const prayerBox = document.getElementById(`prayer-${key}`);
            if (prayerBox) {
                if (this.checked) {
                    prayerBox.classList.add('prayed');
                } else {
                    prayerBox.classList.remove('prayed');
                }
            }
        }
    });
}

// ═══════════════════════════════════════════════════════════
// TAB SWITCHING
// ═══════════════════════════════════════════════════════════

function switchTab(tabName) {
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const btn = document.querySelector(`[data-tab="${tabName}"]`);
    if (btn) btn.classList.add('active');
    
    const content = document.getElementById(tabName);
    if (content) content.classList.add('active');
}

// ═══════════════════════════════════════════════════════════
// MODAL MANAGEMENT  
// ═══════════════════════════════════════════════════════════

function openModal(type, editItem = null) {
    currentModal = type;
    currentEditItem = editItem;
    
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    if (!modal || !title || !body) return;
    
    // Get today's date in YYYY-MM-DD format (FIX for timezone issue)
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    
    const templates = getModalTemplates(todayStr, editItem);
    const template = templates[type];
    
    if (template) {
        title.textContent = editItem ? template.title.replace('Add', 'Edit') : template.title;
        body.innerHTML = template.html;
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
    currentModal = null;
    currentEditItem = null;
}

function getModalTemplates(todayStr, editItem) {
    return {
        education: {
            title: 'Add Education Item',
            html: `
                <input type="text" id="input-title" placeholder="Title" value="${editItem?.title || ''}" required>
                <textarea id="input-details" placeholder="Details..." rows="3">${editItem?.details || ''}</textarea>
                <input type="date" id="input-deadline" value="${editItem?.deadline || ''}">
                <button onclick="submitModal('education')" class="btn-primary">${editItem ? 'Update' : 'Add'}</button>
            `
        },
        visa: {
            title: 'Add Visa Item',
            html: `
                <input type="text" id="input-title" placeholder="Title" value="${editItem?.title || ''}" required>
                <textarea id="input-details" placeholder="Details..." rows="3">${editItem?.details || ''}</textarea>
                <select id="input-status">
                    <option value="pending" ${editItem?.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="in-progress" ${editItem?.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                    <option value="completed" ${editItem?.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
                <input type="date" id="input-deadline" value="${editItem?.deadline || ''}">
                <button onclick="submitModal('visa')" class="btn-primary">${editItem ? 'Update' : 'Add'}</button>
            `
        },
        license: {
            title: 'Add License Item',
            html: `
                <input type="text" id="input-title" placeholder="Title" value="${editItem?.title || ''}" required>
                <textarea id="input-details" placeholder="Details..." rows="3">${editItem?.details || ''}</textarea>
                <input type="date" id="input-deadline" value="${editItem?.deadline || ''}">
                <button onclick="submitModal('license')" class="btn-primary">${editItem ? 'Update' : 'Add'}</button>
            `
        },
        healthNote: {
            title: 'Add Health Note',
            html: `
                <textarea id="input-note" placeholder="Health note..." rows="4" required>${editItem?.note || ''}</textarea>
                <input type="date" id="input-date" value="${editItem?.date || todayStr}">
                <button onclick="submitModal('healthNote')" class="btn-primary">${editItem ? 'Update' : 'Add'}</button>
            `
        },
        school: {
            title: 'Add School Task',
            html: `
                <input type="text" id="input-title" placeholder="Task title" value="${editItem?.title || ''}" required>
                <textarea id="input-details" placeholder="Details..." rows="3">${editItem?.details || ''}</textarea>
                <input type="date" id="input-deadline" value="${editItem?.deadline || ''}">
                <button onclick="submitModal('school')" class="btn-primary">${editItem ? 'Update' : 'Add'}</button>
            `
        },
        video: {
            title: 'Add Video Task',
            html: `
                <input type="text" id="input-title" placeholder="Video title" value="${editItem?.title || ''}" required>
                <textarea id="input-details" placeholder="Description..." rows="3">${editItem?.details || ''}</textarea>
                <input type="date" id="input-deadline" value="${editItem?.deadline || ''}">
                <button onclick="submitModal('video')" class="btn-primary">${editItem ? 'Update' : 'Add'}</button>
            `
        },
        family: {
            title: 'Add Family Task',
            html: `
                <input type="text" id="input-title" placeholder="Task title" value="${editItem?.title || ''}" required>
                <textarea id="input-details" placeholder="Details..." rows="3">${editItem?.details || ''}</textarea>
                <button onclick="submitModal('family')" class="btn-primary">${editItem ? 'Update' : 'Add'}</button>
            `
        },
        website: {
            title: 'Add Website Task',
            html: `
                <input type="text" id="input-title" placeholder="Task title" value="${editItem?.title || ''}" required>
                <textarea id="input-details" placeholder="Details..." rows="3">${editItem?.details || ''}</textarea>
                <button onclick="submitModal('website')" class="btn-primary">${editItem ? 'Update' : 'Add'}</button>
            `
        },
        social: {
            title: 'Add Social Media Task',
            html: `
                <input type="text" id="input-title" placeholder="Task title" value="${editItem?.title || ''}" required>
                <textarea id="input-details" placeholder="Details..." rows="3">${editItem?.details || ''}</textarea>
                <button onclick="submitModal('social')" class="btn-primary">${editItem ? 'Update' : 'Add'}</button>
            `
        },
        timetableLesson: {
            title: 'Add Lesson to Timetable',
            html: `
                <select id="input-day" required>
                    <option value="">Select Day...</option>
                    <option value="MON">Monday</option>
                    <option value="TUE">Tuesday</option>
                    <option value="WED">Wednesday</option>
                    <option value="THU">Thursday</option>
                    <option value="FRI">Friday</option>
                </select>
                <select id="input-period" required>
                    <option value="">Select Period...</option>
                    ${TIMETABLE.periods.map(p => `<option value="${p.num}">Period ${p.num} (${p.time})</option>`).join('')}
                </select>
                <input type="text" id="input-title" placeholder="Lesson title" value="${editItem?.title || ''}" required>
                <textarea id="input-details" placeholder="Lesson plan details..." rows="4">${editItem?.details || ''}</textarea>
                <input type="date" id="input-date" value="${editItem?.date || todayStr}">
                <button onclick="submitModal('timetableLesson')" class="btn-primary">${editItem ? 'Update' : 'Add'}</button>
            `
        },
        reminder: {
            title: 'Add Reminder',
            html: `
                <input type="text" id="input-title" placeholder="Reminder title" value="${editItem?.title || ''}" required>
                <textarea id="input-details" placeholder="Details..." rows="2">${editItem?.details || ''}</textarea>
                <input type="datetime-local" id="input-datetime" value="${editItem?.datetime || ''}" required>
                <select id="input-repeat">
                    <option value="once" ${editItem?.repeat === 'once' ? 'selected' : ''}>Once</option>
                    <option value="daily" ${editItem?.repeat === 'daily' ? 'selected' : ''}>Daily</option>
                    <option value="weekly" ${editItem?.repeat === 'weekly' ? 'selected' : ''}>Weekly</option>
                    <option value="monthly" ${editItem?.repeat === 'monthly' ? 'selected' : ''}>Monthly</option>
                </select>
                <button onclick="submitModal('reminder')" class="btn-primary">${editItem ? 'Update' : 'Add'}</button>
            `
        }
    };
}

function submitModal(type) {
    const getVal = (id) => document.getElementById(id)?.value.trim() || '';
    
    let item;
    if (currentEditItem) {
        item = currentEditItem;
    } else {
        item = {
            id: Date.now(),
            createdAt: new Date().toISOString()
        };
    }
    
    switch(type) {
        case 'education':
            item.title = getVal('input-title');
            item.details = getVal('input-details');
            item.deadline = getVal('input-deadline');
            if (!item.completed) item.completed = false;
            if (!item.title) return alert('Please enter a title');
            if (!currentEditItem) appData.personal.education.push(item);
            break;
            
        case 'visa':
            item.title = getVal('input-title');
            item.details = getVal('input-details');
            item.status = getVal('input-status');
            item.deadline = getVal('input-deadline');
            if (!item.completed) item.completed = false;
            if (!item.title) return alert('Please enter a title');
            if (!currentEditItem) appData.personal.visa.push(item);
            break;
            
        case 'license':
            item.title = getVal('input-title');
            item.details = getVal('input-details');
            item.deadline = getVal('input-deadline');
            if (!item.completed) item.completed = false;
            if (!item.title) return alert('Please enter a title');
            if (!currentEditItem) appData.personal.license.push(item);
            break;
            
        case 'healthNote':
            item.note = getVal('input-note');
            item.date = getVal('input-date');
            if (!item.note) return alert('Please enter a note');
            if (!currentEditItem) appData.health.notes.push(item);
            break;
            
        case 'school':
            item.title = getVal('input-title');
            item.details = getVal('input-details');
            item.deadline = getVal('input-deadline');
            if (!item.completed) item.completed = false;
            if (!item.title) return alert('Please enter a title');
            if (!currentEditItem) appData.professional.school.push(item);
            break;
            
        case 'video':
            item.title = getVal('input-title');
            item.details = getVal('input-details');
            item.deadline = getVal('input-deadline');
            if (!item.completed) item.completed = false;
            if (!item.title) return alert('Please enter a title');
            if (!currentEditItem) appData.professional.video.push(item);
            break;
            
        case 'family':
            item.title = getVal('input-title');
            item.details = getVal('input-details');
            if (!item.completed) item.completed = false;
            if (!item.title) return alert('Please enter a title');
            if (!currentEditItem) appData.professional.family.push(item);
            break;
            
        case 'website':
            item.title = getVal('input-title');
            item.details = getVal('input-details');
            if (!item.completed) item.completed = false;
            if (!item.title) return alert('Please enter a title');
            if (!currentEditItem) appData.professional.website.push(item);
            break;
            
        case 'social':
            item.title = getVal('input-title');
            item.details = getVal('input-details');
            if (!item.completed) item.completed = false;
            if (!item.title) return alert('Please enter a title');
            if (!currentEditItem) appData.professional.social.push(item);
            break;
            
        case 'timetableLesson':
            const day = getVal('input-day');
            const period = getVal('input-period');
            item.title = getVal('input-title');
            item.details = getVal('input-details');
            item.date = getVal('input-date');
            if (!day || !period || !item.title) return alert('Please fill in all required fields');
            const key = `${day}-P${period}`;
            if (!currentEditItem) {
                if (!appData.professional.timetableLessons[key]) {
                    appData.professional.timetableLessons[key] = [];
                }
                appData.professional.timetableLessons[key].push(item);
            }
            break;
            
        case 'reminder':
            item.title = getVal('input-title');
            item.details = getVal('input-details');
            item.datetime = getVal('input-datetime');
            item.repeat = getVal('input-repeat');
            if (!item.active) item.active = true;
            if (!item.title || !item.datetime) return alert('Please fill in all required fields');
            if (!currentEditItem) {
                appData.professional.reminders.push(item);
                scheduleNotification(item);
            }
            break;
    }
    
    saveToLocalStorage();
    renderAll();
    closeModal();
}

// ═══════════════════════════════════════════════════════════
// RENDER FUNCTIONS
// ═══════════════════════════════════════════════════════════

function renderAll() {
    // Personal
    renderItemList('education-list', appData.personal.education, 'personal.education');
    renderItemList('visa-list', appData.personal.visa, 'personal.visa');
    renderItemList('license-list', appData.personal.license, 'personal.license');
    renderCustomCategories();
    
    // Health
    renderHealthNotes();
    renderWeightList();
    renderPeriodInfo();
    
    // Religious
    renderQuranSurahs();
    updatePrayerUI();
    
    // Professional
    renderItemList('school-list', appData.professional.school, 'professional.school');
    renderItemList('video-list', appData.professional.video, 'professional.video');
    renderItemList('family-list', appData.professional.family, 'professional.family');
    renderItemList('website-list', appData.professional.website, 'professional.website');
    renderItemList('social-list', appData.professional.social, 'professional.social');
    renderTimetable();
    renderReminders();
}

function renderItemList(containerId, items, dataPath) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (items.length === 0) {
        container.innerHTML = '<p class="empty-state">No items yet.</p>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="item ${item.completed ? 'completed' : ''}">
            <input type="checkbox" 
                   ${item.completed ? 'checked' : ''} 
                   onchange="toggleComplete('${dataPath}', ${item.id})"
                   class="item-checkbox">
            <div class="item-content">
                <div class="item-title">${escHtml(item.title)}</div>
                ${item.details ? `<div class="item-details">${escHtml(item.details)}</div>` : ''}
                ${item.status ? `<div class="item-status">Status: ${item.status}</div>` : ''}
                ${item.deadline ? `<div class="item-deadline">📅 ${formatDate(item.deadline)}</div>` : ''}
            </div>
            <div>
                <button onclick='editItem(${JSON.stringify(item)}, "${dataPath.split('.')[1]}")' class="btn-edit">✏️ Edit</button>
                <button onclick="deleteItem('${dataPath}', ${item.id})" class="btn-delete">🗑️</button>
            </div>
        </div>
    `).join('');
}

function renderHealthNotes() {
    const container = document.getElementById('health-notes-list');
    if (!container) return;
    
    const notes = appData.health.notes;
    if (notes.length === 0) {
        container.innerHTML = '<p class="empty-state">No health notes yet.</p>';
        return;
    }
    
    container.innerHTML = notes.map(note => `
        <div class="health-note">
            <div class="note-date">${formatDate(note.date)}</div>
            <div class="note-content">${escHtml(note.note)}</div>
            <button onclick='editHealthNote(${JSON.stringify(note)})' class="btn-edit">✏️ Edit</button>
            <button onclick="deleteHealthNote(${note.id})" class="btn-delete-small">Delete</button>
        </div>
    `).join('');
}

function renderWeightList() {
    const container = document.getElementById('weight-list');
    if (!container) return;
    
    const weights = appData.health.weight || [];
    if (weights.length === 0) {
        container.innerHTML = '<p class="empty-state">No weight entries yet.</p>';
        return;
    }
    
    container.innerHTML = weights.sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(w => `
            <div class="weight-log">
                <span>${formatDate(w.date)}: <strong>${w.weight} kg</strong></span>
                <button onclick="deleteWeight(${w.id})" class="btn-delete-small">Delete</button>
            </div>
        `).join('');
}

function renderPeriodInfo() {
    const info = document.getElementById('period-info');
    const nextPeriod = document.getElementById('next-period');
    const daysUntil = document.getElementById('days-until');
    
    if (!info || !appData.health.period.lastStart) {
        if (info) info.style.display = 'none';
        return;
    }
    
    const lastStart = new Date(appData.health.period.lastStart);
    const cycleLength = appData.health.period.cycleLength || 28;
    const nextDate = new Date(lastStart);
    nextDate.setDate(nextDate.getDate() + cycleLength);
    
    const today = new Date();
    const diffTime = nextDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    nextPeriod.textContent = `Next period expected: ${formatDate(nextDate.toISOString())}`;
    daysUntil.textContent = `Days until: ${diffDays > 0 ? diffDays : 'Today or overdue'}`;
    info.style.display = 'block';
}

function renderQuranSurahs() {
    const select = document.getElementById('current-surah');
    const list = document.getElementById('surah-list');
    
    if (!select || !list) return;
    
    // Populate dropdown
    select.innerHTML = '<option value="">Select Surah...</option>' +
        QURAN_SURAHS.map((surah, idx) => 
            `<option value="${idx}" ${appData.religious.quran.currentSurah === idx ? 'selected' : ''}>${surah}</option>`
        ).join('');
    
    // Render list
    const memorized = appData.religious.quran.memorized || [];
    const current = appData.religious.quran.currentSurah;
    
    list.innerHTML = QURAN_SURAHS.map((surah, idx) => {
        const isMem = memorized.includes(idx);
        const isCur = current === idx;
        return `
            <div class="surah-item ${isMem ? 'memorized' : ''} ${isCur ? 'current' : ''}">
                <span>${surah} ${isMem ? '✅' : ''} ${isCur ? '📖' : ''}</span>
            </div>
        `;
    }).join('');
}

function updatePrayerUI() {
    const prayers = appData.religious.prayers;
    Object.keys(prayers).forEach(key => {
        if (key === 'lastReset') return;
        const box = document.getElementById(`prayer-${key}`);
        const checkbox = document.getElementById(`check-${key}`);
        if (box && checkbox) {
            checkbox.checked = prayers[key];
            if (prayers[key]) {
                box.classList.add('prayed');
            } else {
                box.classList.remove('prayed');
            }
        }
    });
}

function renderTimetable() {
    const table = document.getElementById('timetable');
    if (!table) return;
    
    let html = '<tr><th>Period/Time</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th></tr>';
    
    TIMETABLE.periods.forEach(period => {
        html += `<tr><td><strong>P${period.num}</strong><br>${period.time}</td>`;
        
        ['MON', 'TUE', 'WED', 'THU', 'FRI'].forEach(day => {
            const scheduled = TIMETABLE.schedule[day][period.num - 1];
            const key = `${day}-P${period.num}`;
            const lessons = appData.professional.timetableLessons[key] || [];
            
            if (scheduled === 'OFFICE') {
                html += `<td class="office">Office</td>`;
            } else {
                html += `<td>
                    <strong>${scheduled}</strong>
                    ${lessons.map(l => `<div style="font-size:0.85em; color:#666;">${escHtml(l.title)}</div>`).join('')}
                </td>`;
            }
        });
        
        html += '</tr>';
    });
    
    table.innerHTML = html;
}

function renderReminders() {
    const container = document.getElementById('reminders-list');
    if (!container) return;
    
    const reminders = appData.professional.reminders;
    if (reminders.length === 0) {
        container.innerHTML = '<p class="empty-state">No reminders set.</p>';
        return;
    }
    
    container.innerHTML = reminders.map(r => `
        <div class="item ${!r.active ? 'inactive' : ''}">
            <div class="item-content">
                <div class="item-title">⏰ ${escHtml(r.title)}</div>
                ${r.details ? `<div class="item-details">${escHtml(r.details)}</div>` : ''}
                <div class="item-deadline">Time: ${formatDateTime(r.datetime)}</div>
                <div class="item-status">Repeat: ${r.repeat}</div>
                ${!r.active ? '<div style="color:red;">Inactive</div>' : ''}
            </div>
            <div>
                <button onclick='editReminder(${JSON.stringify(r)})' class="btn-edit">✏️ Edit</button>
                <button onclick="deleteReminder(${r.id})" class="btn-delete">🗑️</button>
            </div>
        </div>
    `).join('');
}

function renderCustomCategories() {
    const container = document.getElementById('custom-categories');
    if (!container) return;
    
    const custom = appData.personal.custom;
    const keys = Object.keys(custom);
    
    if (keys.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = keys.map(key => {
        const category = custom[key];
        return `
            <div class="section">
                <h3>${escHtml(category.name)} 
                    <button onclick="deleteCategory('${key}')" class="btn-delete-small">Delete Category</button>
                </h3>
                <div id="custom-${key}-list"></div>
                <button onclick="addCustomItem('${key}')" class="btn-secondary">+ Add Item</button>
            </div>
        `;
    }).join('');
    
    keys.forEach(key => {
        renderItemList(`custom-${key}-list`, custom[key].items, `personal.custom.${key}.items`);
    });
}

// ═══════════════════════════════════════════════════════════
// ITEM ACTIONS
// ═══════════════════════════════════════════════════════════

function toggleComplete(dataPath, id) {
    const item = findItemByPath(dataPath, id);
    if (item) {
        item.completed = !item.completed;
        saveToLocalStorage();
        renderAll();
    }
}

function editItem(item, category) {
    openModal(category, item);
}

function editHealthNote(note) {
    openModal('healthNote', note);
}

function editReminder(reminder) {
    openModal('reminder', reminder);
}

function deleteItem(dataPath, id) {
    const parts = dataPath.split('.');
    let current = appData;
    
    for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
    }
    
    const arrayName = parts[parts.length - 1];
    current[arrayName] = current[arrayName].filter(item => item.id !== id);
    
    saveToLocalStorage();
    renderAll();
}

function deleteHealthNote(id) {
    appData.health.notes = appData.health.notes.filter(n => n.id !== id);
    saveToLocalStorage();
    renderHealthNotes();
}

function deleteReminder(id) {
    appData.professional.reminders = appData.professional.reminders.filter(r => r.id !== id);
    saveToLocalStorage();
    renderReminders();
}

function deleteCategory(key) {
    if (confirm(`Delete entire category "${appData.personal.custom[key].name}"?`)) {
        delete appData.personal.custom[key];
        saveToLocalStorage();
        renderCustomCategories();
    }
}

function addCustomCategory() {
    const name = prompt('Enter custom category name:');
    if (!name || !name.trim()) return;
    
    const key = name.toLowerCase().replace(/\s+/g, '-');
    if (appData.personal.custom[key]) {
        alert('Category already exists!');
        return;
    }
    
    appData.personal.custom[key] = {
        name: name,
        items: []
    };
    
    saveToLocalStorage();
    renderCustomCategories();
}

function addCustomItem(categoryKey) {
    const title = prompt('Enter item title:');
    if (!title || !title.trim()) return;
    
    const details = prompt('Enter details (optional):');
    
    const item = {
        id: Date.now(),
        title: title,
        details: details || '',
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    appData.personal.custom[categoryKey].items.push(item);
    saveToLocalStorage();
    renderCustomCategories();
}

function addWeight() {
    const weight = document.getElementById('weight-input').value;
    const date = document.getElementById('weight-date').value;
    
    if (!weight || !date) {
        alert('Please enter weight and date');
        return;
    }
    
    if (!appData.health.weight) appData.health.weight = [];
    
    appData.health.weight.push({
        id: Date.now(),
        weight: parseFloat(weight),
        date: date
    });
    
    document.getElementById('weight-input').value = '';
    document.getElementById('weight-date').value = '';
    
    saveToLocalStorage();
    renderWeightList();
}

function deleteWeight(id) {
    appData.health.weight = appData.health.weight.filter(w => w.id !== id);
    saveToLocalStorage();
    renderWeightList();
}

function savePeriod() {
    const start = document.getElementById('period-start').value;
    const cycle = document.getElementById('period-cycle').value;
    
    if (!start) {
        alert('Please enter the last period start date');
        return;
    }
    
    appData.health.period.lastStart = start;
    appData.health.period.cycleLength = parseInt(cycle) || 28;
    
    saveToLocalStorage();
    renderPeriodInfo();
}

function markSurahMemorized() {
    const select = document.getElementById('current-surah');
    const idx = parseInt(select.value);
    
    if (isNaN(idx)) {
        alert('Please select a Surah first');
        return;
    }
    
    if (!appData.religious.quran.memorized) {
        appData.religious.quran.memorized = [];
    }
    
    if (!appData.religious.quran.memorized.includes(idx)) {
        appData.religious.quran.memorized.push(idx);
        
        // Move to next surah
        if (idx < QURAN_SURAHS.length - 1) {
            appData.religious.quran.currentSurah = idx + 1;
        } else {
            appData.religious.quran.currentSurah = null;
        }
        
        saveToLocalStorage();
        renderQuranSurahs();
        alert(`Ma sha Allah! ${QURAN_SURAHS[idx]} marked as memorized!`);
    } else {
        alert('This Surah is already marked as memorized');
    }
}

function saveIftarTime() {
    const time = document.getElementById('ramadan-iftar-time').value;
    if (time) {
        appData.religious.ramadan.iftarTime = time;
        saveToLocalStorage();
        alert(`Iftar time set to ${time}`);
    }
}

function findItemByPath(dataPath, id) {
    const parts = dataPath.split('.');
    let current = appData;
    
    for (const part of parts) {
        current = current[part];
    }
    
    return current.find(item => item.id === id);
}

// ═══════════════════════════════════════════════════════════
// DAILY RESETS
// ═══════════════════════════════════════════════════════════

function checkDailyResets() {
    const today = new Date().toDateString();
    
    // Reset health habits
    if (appData.health.dailyHabits.lastReset !== today) {
        appData.health.dailyHabits.wokeUp = false;
        appData.health.dailyHabits.drankWater = false;
        appData.health.dailyHabits.ateVeg = false;
        appData.health.dailyHabits.exercise = false;
        appData.health.dailyHabits.meditation = false;
        appData.health.dailyHabits.sleep = false;
        appData.health.dailyHabits.lastReset = today;
        
        ['habit-wakeup', 'habit-water', 'habit-veg', 'habit-exercise', 'habit-meditation', 'habit-sleep'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.checked = false;
        });
    }
    
    // Reset prayers
    if (appData.religious.prayers.lastReset !== today) {
        appData.religious.prayers.fajr = false;
        appData.religious.prayers.dhuhr = false;
        appData.religious.prayers.asr = false;
        appData.religious.prayers.maghrib = false;
        appData.religious.prayers.isha = false;
        appData.religious.prayers.tahajjud = false;
        appData.religious.prayers.lastReset = today;
        
        ['check-fajr', 'check-dhuhr', 'check-asr', 'check-maghrib', 'check-isha', 'check-tahajjud'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.checked = false;
        });
        
        updatePrayerUI();
    }
    
    // Reset Ramadan
    if (appData.religious.ramadan.lastReset !== today) {
        appData.religious.ramadan.fasting = false;
        appData.religious.ramadan.suhoor = false;
        appData.religious.ramadan.iftar = false;
        appData.religious.ramadan.taraweeh = false;
        appData.religious.ramadan.lastReset = today;
        
        ['ramadan-fasting', 'ramadan-suhoor', 'ramadan-iftar', 'ramadan-taraweeh'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.checked = false;
        });
    }
    
    saveToLocalStorage();
}

// ═══════════════════════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════════════════════

function enableNotifications() {
    if (!('Notification' in window)) {
        alert('This browser does not support notifications');
        return;
    }
    
    if (Notification.permission === 'granted') {
        new Notification('🎉 Test Notification', {
            body: 'Notifications are working!',
            icon: 'icon-192.png'
        });
        return;
    }
    
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            new Notification('🎉 Notifications Enabled!', {
                body: 'You will now receive reminders.',
                icon: 'icon-192.png'
            });
        } else {
            alert('❌ Please enable notifications in browser settings.');
        }
    });
}

function scheduleNotification(reminder) {
    if (Notification.permission !== 'granted') return;
    
    const reminderTime = new Date(reminder.datetime).getTime();
    const now = Date.now();
    const timeUntil = reminderTime - now;
    
    if (timeUntil > 0 && timeUntil < 86400000) { // Within 24 hours
        setTimeout(() => {
            new Notification(`⏰ ${reminder.title}`, {
                body: reminder.details || 'Reminder!',
                icon: 'icon-192.png',
                tag: `reminder-${reminder.id}`,
                requireInteraction: true
            });
        }, timeUntil);
    }
}

function checkReminders() {
    const now = Date.now();
    
    appData.professional.reminders.forEach(reminder => {
        if (!reminder.active) return;
        
        const reminderTime = new Date(reminder.datetime).getTime();
        
        // Check if within last minute
        if (reminderTime <= now && reminderTime > (now - 60000)) {
            if (Notification.permission === 'granted') {
                new Notification(`⏰ ${reminder.title}`, {
                    body: reminder.details || 'Reminder!',
                    icon: 'icon-192.png',
                    tag: `reminder-${reminder.id}`,
                    requireInteraction: true
                });
            }
            
            // Handle repeat
            if (reminder.repeat === 'once') {
                reminder.active = false;
            } else {
                const date = new Date(reminder.datetime);
                if (reminder.repeat === 'daily') {
                    date.setDate(date.getDate() + 1);
                } else if (reminder.repeat === 'weekly') {
                    date.setDate(date.getDate() + 7);
                } else if (reminder.repeat === 'monthly') {
                    date.setMonth(date.getMonth() + 1);
                }
                reminder.datetime = date.toISOString().slice(0, 16);
            }
            
            saveToLocalStorage();
            renderReminders();
        }
    });
}

// ═══════════════════════════════════════════════════════════
// STORAGE
// ═══════════════════════════════════════════════════════════

function saveToLocalStorage() {
    try {
        localStorage.setItem('lifeTrackerData', JSON.stringify(appData));
    } catch (e) {
        console.error('Error saving:', e);
    }
}

function loadFromLocalStorage() {
    try {
        const data = localStorage.getItem('lifeTrackerData');
        if (data) {
            const loaded = JSON.parse(data);
            // Merge with defaults to ensure all properties exist
            appData = Object.assign({}, appData, loaded);
        }
    } catch (e) {
        console.error('Error loading:', e);
    }
}

// ═══════════════════════════════════════════════════════════
// GOOGLE DRIVE SYNC
// ═══════════════════════════════════════════════════════════

function syncWithDrive() {
    if (typeof GOOGLE_CONFIG === 'undefined') {
        alert('⚠️ Google Drive not configured. Please create config.js file with your API credentials.');
        return;
    }
    
    if (!gapiInited || !gisInited) {
        alert('⏳ Google API is still loading. Please try again in a few seconds.');
        return;
    }
    
    tokenClient.requestAccessToken();
}

function handleAuthCallback(response) {
    if (response.error) {
        console.error('Auth error:', response);
        alert('❌ Failed to authenticate with Google Drive');
        return;
    }
    
    uploadToGoogleDrive();
}

async function uploadToGoogleDrive() {
    try {
        const content = JSON.stringify(appData, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        
        const metadata = {
            name: 'life-tracker-backup.json',
            mimeType: 'application/json'
        };
        
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', blob);
        
        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + gapi.client.getToken().access_token
            },
            body: form
        });
        
        if (response.ok) {
            alert('✅ Data synced successfully to Google Drive!');
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        console.error('Drive sync error:', error);
        alert('❌ Failed to sync with Google Drive');
    }
}

// ═══════════════════════════════════════════════════════════
// PWA INSTALL
// ═══════════════════════════════════════════════════════════

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    const installBtn = document.getElementById('install-app');
    if (installBtn) {
        installBtn.style.display = 'inline-block';
    }
});

function installApp() {
    if (!deferredPrompt) {
        alert('App is already installed or cannot be installed on this device.');
        return;
    }
    
    deferredPrompt.prompt();
    
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('App installed');
        }
        deferredPrompt = null;
    });
}

// ═══════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════

function escHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

console.log('📱 Life Tracker Enhanced App loaded successfully!');

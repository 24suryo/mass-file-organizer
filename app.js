// --- STATE LISENSI & APLIKASI ---
let uploadedFiles = [];
let isProUser = localStorage.getItem("is_pro_licensed") === "true";
const FREE_FILE_LIMIT = 10;
let currentLang = localStorage.getItem("app_lang") || "id";

// --- DICTIONARY I18N (DUA BAHASA: INDONESIA & ENGLISH) ---
const i18n = {
    id: {
        nav_features: "Fitur",
        nav_app: "Aplikasi",
        nav_pricing: "Harga",
        nav_faq: "FAQ",
        btn_activate_pro: "Aktifkan Pro",
        hero_badge: "100% Client-Side & Safe",
        hero_title: "Ratusan File Berantakan? Rapikan & Ubah Nama Sekaligus dalam Hitungan Detik.",
        hero_subtitle: "Solusi cepat untuk Mass Rename, pengelompokan folder otomatis (Auto-Organize), dan ekspor ZIP instan. Seluruh proses terjadi di browser Anda tanpa pernah mengunggah file ke server.",
        hero_cta_app: "🚀 Coba Aplikasi Sekarang",
        hero_cta_pro: "⭐ Lihat Paket Pro",
        btn_add_files: "Add Files",
        btn_apply: "Apply",
        col_target_structure: "📁 Structure Target",
        col_auto_rules: "⚙️ Auto Rules",
        btn_edit_rules: "+ Edit",
        drag_drop_title: "Seret & Letakkan (Drag & Drop) file di sini",
        drag_drop_sub: "atau klik tombol \"Add Files\" di atas",
        th_original: "Original Name",
        th_new: "New Name (Preview)",
        th_dest: "Destination Folder",
        th_status: "Status",
        col_media_preview: "🖼️ Media Preview",
        preview_empty: "Pilih file untuk melihat preview.",
        btn_process: "🚀 Process & Download ZIP",
        feat_header_title: "Mengapa Menggunakan Mass File Organizer?",
        feat_header_sub: "Fitur lengkap yang dirancang untuk efisiensi kerja maksimal tanpa mengorbankan privasi.",
        feat1_title: "100% Aman & Privasi",
        feat1_desc: "Seluruh proses rename dan pengelompokan dilakukan di dalam browser Anda. File tidak pernah dikirim ke server luar.",
        feat2_title: "Auto-Organize Rules",
        feat2_desc: "File dipilah secara otomatis ke folder tujuan berdasarkan ekstensi (.pdf, .jpg) atau kata kunci spesifik yang Anda tentukan.",
        feat3_title: "Ekspor ZIP Instan",
        feat3_desc: "Unduh seluruh file yang sudah diubah namanya beserta struktur folder barunya secara rapi dalam satu file .zip.",
        price_header_title: "Pilihan Paket & Lisensi",
        price_header_sub: "Pilih paket yang sesuai dengan kebutuhan Anda.",
        price_free_title: "Free Edition",
        price_free_1: "Maksimal 10 file per proses",
        price_free_2: "Auto-Organize Rules standar",
        price_free_3: "Ekspor ke file .zip",
        btn_use_free: "Gunakan Versi Gratis",
        price_pro_title: "Pro Unlimited",
        price_pro_1: "Tanpa batasan jumlah file",
        price_pro_2: "Kustomisasi Auto-Rules tanpa batas",
        price_pro_3: "Dynamic Pattern {YYYY}{MM}{DD} & Find/Replace",
        price_pro_4: "Dukungan prioritas",
        btn_buy_pro: "⭐ Aktifkan Pro License",
        faq_title: "Pertanyaan Sering Diajukan (FAQ)",
        faq_q1: "Q: Apakah file saya aman diunggah ke server?",
        faq_a1: "A: Sangat aman. Aplikasi ini bekerja 100% secara lokal di browser Anda (Client-side JavaScript). File Anda tidak pernah dikirim ke server luar manapun.",
        faq_q2: "Q: Bagaimana cara kerja Auto-Organize Rules?",
        faq_a2: "A: Sistem membaca ekstensi file (seperti .pdf, .jpg) atau kata kunci pada nama file, lalu mengelompokkannya secara otomatis ke dalam folder tujuan virtual sebelum diunduh sebagai file ZIP.",
        faq_q3: "Q: Apa bedanya versi Free dan versi Pro?",
        faq_a3: "A: Versi Free dibatasi maksimal 10 file per proses. Versi Pro membuka batasan jumlah file (unlimited) dan mendukung kustomisasi aturan lanjutan.",
        modal_rules_title: "Atur Auto Organize Rules",
        modal_rules_sub: "Tentukan aturan folder tujuan berdasarkan kondisi nama file atau ekstensi.",
        btn_close: "Tutup",
        btn_save: "Simpan",
        msg_free_limit: "Versi Gratis (Free) hanya bisa memproses maksimal 10 file sekaligus.\n\nSilakan aktifkan Lisensi Pro untuk memproses file tanpa batas!",
        msg_pro_success: "Lisensi Pro Berhasil Diaktifkan! Nikmati fitur tanpa batas.",
        msg_pro_invalid: "License Key tidak valid."
    },
    en: {
        nav_features: "Features",
        nav_app: "App",
        nav_pricing: "Pricing",
        nav_faq: "FAQ",
        btn_activate_pro: "Activate Pro",
        hero_badge: "100% Client-Side & Secure",
        hero_title: "Hundreds of Messy Files? Organize & Rename Them in Seconds.",
        hero_subtitle: "The fastest solution for Mass Renaming, Auto-Organizing folders, and Instant ZIP Exporting. Everything happens directly inside your browser without uploading files to any server.",
        hero_cta_app: "🚀 Try App Now",
        hero_cta_pro: "⭐ View Pro Plans",
        btn_add_files: "Add Files",
        btn_apply: "Apply",
        col_target_structure: "📁 Target Structure",
        col_auto_rules: "⚙️ Auto Rules",
        btn_edit_rules: "+ Edit",
        drag_drop_title: "Drag & Drop files here",
        drag_drop_sub: "or click the \"Add Files\" button above",
        th_original: "Original Name",
        th_new: "New Name (Preview)",
        th_dest: "Destination Folder",
        th_status: "Status",
        col_media_preview: "🖼️ Media Preview",
        preview_empty: "Select a file to display preview.",
        btn_process: "🚀 Process & Download ZIP",
        feat_header_title: "Why Use Mass File Organizer?",
        feat_header_sub: "Comprehensive features designed for maximum productivity without compromising privacy.",
        feat1_title: "100% Secure & Private",
        feat1_desc: "All renaming and organizing operations run inside your browser. Your files are never transferred to an external server.",
        feat2_title: "Auto-Organize Rules",
        feat2_desc: "Files are automatically categorized into target folders based on extensions (.pdf, .jpg) or specific keywords you set.",
        feat3_title: "Instant ZIP Export",
        feat3_desc: "Download all renamed files along with their new folder hierarchy organized inside a single .zip file.",
        price_header_title: "Plans & Licensing",
        price_header_sub: "Choose the plan that fits your needs.",
        price_free_title: "Free Edition",
        price_free_1: "Maximum 10 files per process",
        price_free_2: "Standard Auto-Organize Rules",
        price_free_3: "Export to .zip file",
        btn_use_free: "Use Free Version",
        price_pro_title: "Pro Unlimited",
        price_pro_1: "Unlimited file processing",
        price_pro_2: "Unlimited Auto-Rules customization",
        price_pro_3: "Dynamic Pattern {YYYY}{MM}{DD} & Find/Replace",
        price_pro_4: "Priority support",
        btn_buy_pro: "⭐ Activate Pro License",
        faq_title: "Frequently Asked Questions (FAQ)",
        faq_q1: "Q: Is my data safe from being uploaded to a server?",
        faq_a1: "A: Completely safe. This app works 100% locally in your browser (Client-side JavaScript). Your files are never sent anywhere.",
        faq_q2: "Q: How do Auto-Organize Rules work?",
        faq_a2: "A: The engine checks file extensions (like .pdf, .jpg) or keywords in file names, automatically mapping them to virtual target folders before downloading as a ZIP.",
        faq_q3: "Q: What is the difference between Free and Pro versions?",
        faq_a3: "A: Free version is limited to 10 files per batch. Pro version unlocks unlimited file processing and advanced custom rule sets.",
        modal_rules_title: "Configure Auto Organize Rules",
        modal_rules_sub: "Define target folder rules based on file names or extension criteria.",
        btn_close: "Close",
        btn_save: "Save",
        msg_free_limit: "Free Edition allows up to 10 files per batch.\n\nPlease activate Pro License for unlimited file processing!",
        msg_pro_success: "Pro License Activated Successfully! Enjoy unlimited access.",
        msg_pro_invalid: "Invalid License Key."
    }
};

// --- INISIALISASI HALAMAN ---
document.addEventListener("DOMContentLoaded", () => {
    updateLanguageUI();
    updateLicenseUI();
});

// --- FUNGSI LANGUAGE SWITCHER (i18n) ---
function toggleLanguage() {
    currentLang = currentLang === "id" ? "en" : "id";
    localStorage.setItem("app_lang", currentLang);
    updateLanguageUI();
}

function updateLanguageUI() {
    document.getElementById("current-lang").innerText = currentLang.toUpperCase();
    
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (i18n[currentLang] && i18n[currentLang][key]) {
            element.innerText = i18n[currentLang][key];
        }
    });
}

// --- FUNGSI LISENSI ---
function updateLicenseUI() {
    const badge = document.getElementById("user-status-badge");
    if (isProUser) {
        badge.innerText = "⭐ PRO UNLIMITED";
        badge.className = "hidden sm:inline-block text-xs bg-amber-500 text-slate-950 px-3 py-1.5 rounded-full font-bold shadow";
    } else {
        badge.innerText = currentLang === "id" ? `FREE (Max ${FREE_FILE_LIMIT} Files)` : `FREE (Max ${FREE_FILE_LIMIT} Files)`;
        badge.className = "hidden sm:inline-block text-xs bg-slate-950 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-full font-semibold";
    }
}

function promptLicenseKey() {
    let key = prompt(currentLang === "id" ? "Masukkan License Key Pro (Gunakan kode: PRO-TEST-12345):" : "Enter Pro License Key (Use code: PRO-TEST-12345):");
    if (key) {
        if (key.trim() === "PRO-TEST-12345") {
            isProUser = true;
            localStorage.setItem("is_pro_licensed", "true");
            updateLicenseUI();
            alert(i18n[currentLang].msg_pro_success);
        } else {
            alert(i18n[currentLang].msg_pro_invalid);
        }
    }
}

// --- RULES AUTO ORGANIZE UNIVERSAL ---
let autoRules = [
    { id: 1, priority: 1, condition: "extension", value: "pdf,doc,docx,txt,xls,xlsx", target: "01_Documents", enabled: true },
    { id: 2, priority: 2, condition: "extension", value: "jpg,jpeg,png,webp,gif", target: "02_Images", enabled: true },
    { id: 3, priority: 3, condition: "extension", value: "mp4,mov,avi,mkv", target: "03_Videos", enabled: true },
    { id: 4, priority: 4, condition: "extension", value: "zip,rar,7z,tar", target: "04_Archives", enabled: true }
];

// --- DRAG & DROP SETUP ---
const dropZone = document.getElementById("drop-zone");

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add("border-indigo-500", "bg-slate-900/80");
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove("border-indigo-500", "bg-slate-900/80");
    }, false);
});

dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    handleFiles(dt.files);
}, false);

function handleFilesSelected(event) {
    handleFiles(event.target.files);
}

// --- FILE HANDLING & FREEMIUM CHECK ---
function matchAutoDestination(filename) {
    let lowerName = filename.toLowerCase();
    let ext = filename.split('.').pop().toLowerCase();

    let sortedRules = [...autoRules]
        .filter(r => r.enabled)
        .sort((a, b) => a.priority - b.priority);

    for (let rule of sortedRules) {
        if (rule.condition === "contains") {
            if (lowerName.includes(rule.value.toLowerCase())) {
                return rule.target;
            }
        } else if (rule.condition === "extension") {
            let validExts = rule.value.split(',').map(e => e.trim().toLowerCase());
            if (validExts.includes(ext)) {
                return rule.target;
            }
        }
    }
    return "Root";
}

function handleFiles(files) {
    if (!isProUser && (uploadedFiles.length + files.length) > FREE_FILE_LIMIT) {
        alert(i18n[currentLang].msg_free_limit);
        return;
    }

    for (let file of files) {
        if (!uploadedFiles.some(f => f.fileObject.name === file.name && f.fileObject.size === file.size)) {
            let initialDest = matchAutoDestination(file.name);
            uploadedFiles.push({
                fileObject: file,
                originalName: file.name,
                newName: file.name,
                destination: initialDest,
                status: "READY"
            });
        }
    }
    applyRenamePattern();
}

function renderTable() {
    const tbody = document.getElementById("file-table-body");
    const counter = document.getElementById("file-counter");
    const dropMsg = document.getElementById("drop-message");
    
    tbody.innerHTML = "";
    counter.innerText = `Total files: ${uploadedFiles.length}`;

    if (uploadedFiles.length === 0) {
        dropMsg.style.display = "flex";
        return;
    } else {
        dropMsg.style.display = "none";
    }

    uploadedFiles.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-900/80 cursor-pointer transition";
        tr.onclick = () => showPreview(index);

        tr.innerHTML = `
            <td class="p-3 text-slate-300 truncate max-w-[140px]">${item.originalName}</td>
            <td class="p-3 font-medium text-indigo-400 truncate max-w-[140px]">${item.newName}</td>
            <td class="p-3 text-slate-400">${item.destination}</td>
            <td class="p-3"><span class="bg-amber-950 text-amber-400 border border-amber-800/40 text-[10px] px-2 py-0.5 rounded font-medium">${item.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// --- DATE & TIME HELPER ---
function getFileDateComponents(fileObject) {
    const modTime = fileObject.lastModified ? new Date(fileObject.lastModified) : new Date();

    const yyyy = modTime.getFullYear().toString();
    const mm = String(modTime.getMonth() + 1).padStart(2, '0');
    const dd = String(modTime.getDate()).padStart(2, '0');
    const hh = String(modTime.getHours()).padStart(2, '0');
    const min = String(modTime.getMinutes()).padStart(2, '0');
    const ss = String(modTime.getSeconds()).padStart(2, '0');

    return {
        "{YYYY}": yyyy,
        "{MM}": mm,
        "{DD}": dd,
        "{DATE}": `${yyyy}-${mm}-${dd}`,
        "{TIME}": `${hh}${min}${ss}`,
        "{HH}": hh,
        "{MIN}": min,
        "{SS}": ss
    };
}

// --- RENAME ENGINE WITH PLACEHOLDERS & FIND/REPLACE ---
function applyRenamePattern() {
    const pattern = document.getElementById("pattern-input").value;
    const findText = document.getElementById("find-input").value;
    const replaceText = document.getElementById("replace-input").value;
    
    uploadedFiles.forEach((item, index) => {
        let lastDotIndex = item.originalName.lastIndexOf('.');
        let nameWithoutExt = lastDotIndex !== -1 ? item.originalName.substring(0, lastDotIndex) : item.originalName;
        let ext = lastDotIndex !== -1 ? item.originalName.substring(lastDotIndex) : "";

        let processedName = nameWithoutExt;
        if (findText !== "") {
            processedName = processedName.split(findText).join(replaceText);
        }

        const dateReplacements = getFileDateComponents(item.fileObject);
        let newName = pattern;

        for (let [placeholder, value] of Object.entries(dateReplacements)) {
            newName = newName.replaceAll(placeholder, value);
        }

        newName = newName.replaceAll("{NAME}", processedName);

        newName = newName.replace(/\{(#+)\}/g, (match, hashes) => {
            let length = hashes.length;
            return String(index + 1).padStart(length, '0');
        });

        if (ext && !newName.toLowerCase().endsWith(ext.toLowerCase())) {
            newName += ext;
        }

        item.newName = newName;
    });

    renderTable();
}

// --- PREVIEW HANDLER ---
function showPreview(index) {
    const item = uploadedFiles[index];
    const container = document.getElementById("preview-container");

    if (item.fileObject.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function(e) {
            container.innerHTML = `<img src="${e.target.result}" class="max-h-52 max-w-full object-contain rounded shadow-lg">`;
        }
        reader.readAsDataURL(item.fileObject);
    } else {
        container.innerHTML = `<p class="text-slate-400 text-xs">File: <b>${item.originalName}</b><br><br>(Preview unavailable)</p>`;
    }
}

// --- RULES MODAL HANDLERS ---
function openRulesModal() {
    const container = document.getElementById("rules-list-container");
    container.innerHTML = "";

    autoRules.forEach((rule, idx) => {
        container.innerHTML += `
            <div class="p-2 border border-slate-700 rounded bg-slate-950 text-xs flex flex-col gap-1">
                <div class="flex justify-between items-center">
                    <span class="font-bold text-slate-300">Priority #${rule.priority}</span>
                    <label class="flex items-center gap-1 cursor-pointer text-slate-400">
                        <input type="checkbox" ${rule.enabled ? 'checked' : ''} onchange="toggleRule(${idx}, this.checked)"> Active
                    </label>
                </div>
                <div class="text-slate-400">If <b>${rule.condition}</b> is <code>${rule.value}</code></div>
                <div class="text-slate-400">➔ Move to: <b class="text-indigo-400">${rule.target}</b></div>
            </div>
        `;
    });

    document.getElementById("rules-modal").classList.remove("hidden");
}

function closeRulesModal() {
    document.getElementById("rules-modal").classList.add("hidden");
}

function toggleRule(index, isChecked) {
    autoRules[index].enabled = isChecked;
}

function updateRulesSummary() {
    const summaryDiv = document.getElementById("rules-summary");
    summaryDiv.innerHTML = "";
    autoRules.filter(r => r.enabled).forEach(rule => {
        summaryDiv.innerHTML += `<div>• <b>.${rule.value.split(',').join('/.')}</b> ➔ ${rule.target}</div>`;
    });
    
    uploadedFiles.forEach(item => {
        item.destination = matchAutoDestination(item.originalName);
    });
    renderTable();
}

function saveRules() {
    closeRulesModal();
    updateRulesSummary();
    alert(currentLang === "id" ? "Auto Organize Rules berhasil disimpan!" : "Auto Organize Rules saved successfully!");
}

// --- PROCESS & DOWNLOAD ZIP ---
async function processAndDownloadZip() {
    if (uploadedFiles.length === 0) {
        alert(currentLang === "id" ? "Belum ada file yang dipilih!" : "No files selected!");
        return;
    }

    const zip = new JSZip();
    
    for (let item of uploadedFiles) {
        let folderPath = item.destination === "Root" ? "" : item.destination + "/";
        zip.file(folderPath + item.newName, item.fileObject);
        item.status = "SUCCESS";
    }

    renderTable();

    try {
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "Organized_Files.zip");
        alert(currentLang === "id" ? "Proses berhasil! File ZIP ter-download." : "Success! Organized ZIP downloaded.");
    } catch (error) {
        alert("ZIP Export Error: " + error);
    }
}
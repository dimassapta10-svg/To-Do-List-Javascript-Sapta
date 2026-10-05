const inputTask = document.getElementById('inputTask');
const listContainer = document.getElementById('listContainer');
const tombol = document.getElementById('tombol');

// elemen statistik
const statTotal = document.getElementById('statTotal');
const statSelesai = document.getElementById('statSelesai');
const statBelum = document.getElementById('statBelum');

// elemen pesan kosong atau selesai
const pesanKosong = document.getElementById('pesanKosong');
const pesanSelesai = document.getElementById('pesanSelesai');

// elemen peringatan input ketika kosong
const pesanPeringatan = document.getElementById('pesanPeringatan');
const row = document.getElementById('row');

// menambah tugas lewat tombol
tombol.onclick = function () {
    if (inputTask.value.trim() === '') {
        pesanPeringatan.classList.remove('hidden');
        // kolom jadi merah dan bergoyang (animasinya bakal diulang tiap kali)
        row.classList.remove('error');
        void row.offsetWidth;
        row.classList.add('error');
        inputTask.focus();
    } else {
        let li = document.createElement('li');
        li.textContent = inputTask.value;
        listContainer.append(li);

        // tombol hapus akan ada tanda(x)
        let span = document.createElement('span');
        span.textContent = '\u00d7';
        li.append(span);

        inputTask.value = '';
        pesanPeringatan.classList.add('hidden');
        row.classList.remove('error');
    }
    hitungStatistik();
    saveData();
}

// peringatan hilang saat mulai mengetik
inputTask.addEventListener('input', function () {
    pesanPeringatan.classList.add('hidden');
    row.classList.remove('error');
});

// menambahkan tugas dengan menekan Enter
inputTask.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        tombol.click();
    }
});

// klik tugas = tandai selesai, klik x = hapus
listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
    }
    hitungStatistik();
    saveData();
});

// menghitung total, selesai, dan belum selesai
function hitungStatistik() {
    let total = listContainer.children.length;
    let selesai = listContainer.querySelectorAll('li.completed').length;

    statTotal.textContent = total;
    statSelesai.textContent = selesai;
    statBelum.textContent = total - selesai;

    // pesan kalo daftarnya kosong
    if (total === 0) {
        pesanKosong.classList.remove('hidden');
    } else {
        pesanKosong.classList.add('hidden');
    }

    // pesan kalo semua tugasnya selesai
    if (total > 0 && selesai === total) {
        pesanSelesai.classList.remove('hidden');
    } else {
        pesanSelesai.classList.add('hidden');
    }
}

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
    hitungStatistik();
}

showTask();

// yeay done

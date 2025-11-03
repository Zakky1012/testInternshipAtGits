const readline = require('readline');

function denseRanking(rankedScores, gitsScores) {
    // 1. Dapatkan daftar skor unik pemain lain.
    // Set secara otomatis menghapus duplikat. Array.from menjadikannya kembali array.
    const uniqueRanked = Array.from(new Set(rankedScores));

    const gitsRanks = [];

    // 2. Tentukan Peringkat untuk setiap skor GITS
    for (const gitsScore of gitsScores) {
        let rank;
        
        // Cari indeks skor unik pertama yang skor GITS lebih besar atau sama dengannya.
        // Karena uniqueRanked sudah terurut menurun, ini akan langsung memberikan peringkat pemain.
        const foundIndex = uniqueRanked.findIndex(score => gitsScore >= score);
        
        if (foundIndex !== -1) {
            // Peringkat Dense Rank adalah indeks di array skor unik + 1.
            rank = foundIndex + 1;
        } else {
            // Jika GITS lebih rendah dari semua skor unik yang ada, 
            // peringkatnya adalah satu lebih dari jumlah skor unik.
            rank = uniqueRanked.length + 1;
        }
        
        gitsRanks.push(rank);
    }

    return gitsRanks;
}

// --- Logika Pengambilan Input Interaktif Sesuai Format Soal ---

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
const prompts = [
    "1. Masukkan jumlah pemain (N, misal: 7): ",
    "2. Masukkan daftar skor pemain (spasi, misal: 100 100 50 40 40 20 10): ",
    "3. Masukkan jumlah permainan GITS (M, misal: 4): ",
    "4. Masukkan skor GITS (spasi, misal: 5 25 50 120): "
];
let step = 0;

function promptUser() {
    if (step < prompts.length) {
        rl.question(prompts[step], (answer) => {
            lines.push(answer);
            step++;
            promptUser(); // Lanjut ke prompt berikutnya
        });
    } else {
        rl.close();
        processInput(); // Semua input selesai, mulai pemrosesan
    }
}

function processInput() {
    // Baris 1 (lines[0]): Jumlah pemain (N) - diabaikan untuk perhitungan Dense Ranking
    const rankedScores = lines[1].split(' ').map(Number).filter(n => !isNaN(n));
    // Baris 3 (lines[2]): Jumlah permainan GITS (M) - diabaikan untuk perhitungan Dense Ranking
    const gitsScores = lines[3].split(' ').map(Number).filter(n => !isNaN(n));

    if (rankedScores.length === 0 || gitsScores.length === 0) {
        console.log("\n❌ Error: Pastikan Anda memasukkan daftar skor yang valid.");
        return;
    }

    // Panggil fungsi Dense Ranking
    const result = denseRanking(rankedScores, gitsScores);

    console.log("\n==========================================");
    console.log("            ✅ HASIL DENSE RANKING ✅       ");
    console.log("==========================================");
    console.log(`Skor Pemain Lain: ${rankedScores.join(' ')}`);
    console.log(`Skor GITS:        ${gitsScores.join(' ')}`);
    console.log(`\n➡️ Output Peringkat GITS: ${result.join(' ')}`);
    console.log("==========================================");
}

// Mulai interaksi input
promptUser();
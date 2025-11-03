const readline = require('readline');

function generateA000124Sequence(n) {

  const sequence = [];

  // Looping dari i=0 hingga i=n.
  for (let i = 0; i <= n; i++) {
    // Rumus A000124: a(i) = i * (i + 1) / 2 + 1
    const value = (i * (i + 1)) / 2 + 1;
    sequence.push(value);
  }
  
  // Mengambil n elemen pertama (a(0) hingga a(n-1))
  if (n === 0) return sequence[0] !== undefined ? String(sequence[0]) : "";

  return sequence.slice(0, n).join('-');
}

// --- Logika Pengambilan Input Interaktif menggunakan Readline ---

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("🔢 Masukkan jumlah elemen (N, misal: 7): ", (answer) => {
    // 1. Konversi jawaban (string) menjadi bilangan bulat
    const inputN = parseInt(answer.trim());
    
    rl.close();

    if (isNaN(inputN) || inputN < 0 || !Number.isInteger(inputN)) {
        console.log("\n Input tidak valid. Masukkan bilangan bulat non-negatif.");
    } else {
        // 2. Panggil fungsi dengan input yang valid
        const output = generateA000124Sequence(inputN);
        
        // 3. Tampilkan output
        console.log("\n==================================");
        console.log(`➡️ Input: ${inputN}`);
        console.log(`➡️ Output: ${output}`);
        console.log("==================================");
    }
});
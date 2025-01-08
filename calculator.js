const display = document.getElementById("display");

// Fungsi untuk menambahkan input ke layar
function appendToDisplay(input) {
    // Jika layar hanya menampilkan 0, ganti dengan input pertama (kecuali operator)
    if (display.value === "0" && !["+", "-", "*", "/", "%", "."].includes(input)) {
        display.value = input;
    } else if (["+", "-", "*", "/", "%"].includes(input)) {
        // Jangan tambahkan operator dua kali berturut-turut
        if (!/[\+\-\*/%]$/.test(display.value)) {
            display.value += input;
        }
    } else {
        // Cegah lebih dari satu titik desimal di angka yang sama
        if (input === "." && /(\.\d*)$/.test(display.value)) {
            return;
        }
        display.value += input;
    }
}

// Fungsi untuk membersihkan layar
function clearDisplay() {
    display.value = "0";
}

// Fungsi untuk menghapus karakter terakhir
function backspace() {
    display.value = display.value.slice(0, -1) || "0";
}

// Fungsi untuk melakukan kalkulasi
function calculate() {
    try {
        // Salin nilai ekspresi dari layar
        let expression = display.value;

        // Ubah ekspresi untuk kalkulasi persentase
        expression = expression.replace(/(\d+)%/g, "($1/100)");

        // Periksa apakah ekspresi valid
        if (/^[\d+\-*/%().]+$/.test(expression)) {
            display.value = eval(expression).toString(); // Evaluasi ekspresi
        } else {
            display.value = "0"; // Ekspresi tidak valid
        }
    } catch (error) {
        display.value = "0"; // Tangani error
    }
}

// Tambahkan event listener untuk tombol-tombol
document.getElementById("clear").addEventListener("click", clearDisplay);
document.getElementById("backspace").addEventListener("click", backspace);
document.getElementById("equals").addEventListener("click", calculate);

// Tambahkan event listener untuk angka dan titik desimal
["seven", "eight", "nine", "four", "five", "six", "one", "two", "three", "zero", "decimal"].forEach(id => {
    document.getElementById(id).addEventListener("click", () => {
        appendToDisplay(document.getElementById(id).textContent);
    });
});

// Tambahkan event listener untuk operator
document.getElementById("add").addEventListener("click", () => appendToDisplay("+"));
document.getElementById("subtract").addEventListener("click", () => appendToDisplay("-"));
document.getElementById("multiply").addEventListener("click", () => appendToDisplay("*"));
document.getElementById("divide").addEventListener("click", () => appendToDisplay("/"));
document.getElementById("mod").addEventListener("click", () => appendToDisplay("%"));

// Tambahkan dukungan keyboard
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(key) || key === ".") {
        appendToDisplay(key);
    } else if (["+", "-", "*", "/", "%"].includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "Escape") {
        clearDisplay();
    }
});

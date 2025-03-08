// Tuşlar ve ses dosyalarını eşleştiren dizi
const notes = [
    { key: "A", sound: "boom" },
    { key: "S", sound: "clap" },
    { key: "D", sound: "hihat" },
    { key: "F", sound: "kick" },
    { key: "G", sound: "openhat" },
    { key: "H", sound: "ride" },
    { key: "J", sound: "snare" },
    { key: "K", sound: "tink" },
    { key: "L", sound: "tom" }
];

// Klavye tuşlarına basıldığında etkinleştirilecek event listener
document.addEventListener("keydown", function(event) {
    const key = event.key.toUpperCase();     // Basılan tuşun karakterini alıyoruz ve büyük harfe çeviriyoruz
    const button = document.querySelector(`button[data-key="${event.keyCode}"]`);
    if (!button) return;
    
    const sound = new Audio(button.dataset.sound);
    sound.play();
    
    highlightNote(key);
});

// Belirtilen tuşu vurgulayan fonksiyon
function highlightNote(key) {
    const notes = document.querySelectorAll(".note");
    notes.forEach(note => {
        if (note.textContent === key) {
            note.classList.add("active");
            setTimeout(() => note.classList.remove("active"), 300);
        }
    });
}

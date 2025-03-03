// DOM içeriği tamamen yüklendiğinde çalışır
document.addEventListener("DOMContentLoaded", function () {
    // kullanıcıdan bir isim giirlmesi istediğimiz promt kutusu açıcak
    let userName = prompt("Lütfen adınızı girin:");
    if (!userName) {
        userName = "Ziyaretçi"; // Kullanıcı boş bırakırsa varsayılan bir isim kullan
    }
    
    // kullanıcının ismini HTML içindeki myName span etiketine yerleştirir
    document.getElementById("myName").textContent = userName;

    // saati ve günü gösteren fonksiyon
    function showTime() {
        let now = new Date();
        let hours = now.getHours().toString().padStart(2, "0");
        let minutes = now.getMinutes().toString().padStart(2, "0");
        let seconds = now.getSeconds().toString().padStart(2, "0");

        let days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
        let dayName = days[now.getDay()];

        let timeString = `${hours}:${minutes}:${seconds} - ${dayName}`;
        document.getElementById("myClock").textContent = timeString;
    }

    showTime(); // İlk yüklemede çalıştır
    setInterval(showTime, 1000); // Her saniye güncelle
});

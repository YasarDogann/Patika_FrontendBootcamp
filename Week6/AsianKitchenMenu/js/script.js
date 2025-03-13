// her yemeğin id, title, kategorisi, fiyat, açıklama ve resminin olduğu bir menu listesi
const menu = [
    {
      id: 1,
      title: "Tteokbokki",
      category: "Korea",
      price: 10.99,
      img: "https://www.forkknifeswoon.com/wp-content/uploads/2024/07/blackberry-buttermilk-cake-fork-knife-swoon-01-1.jpg",
      desc: "Spicy rice cakes, serving with fish cake."
    },
    {
      id: 2,
      title: "Chicken Ramen",
      category: "Japan",
      price: 7.99,
      img: "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
      desc: "Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg."
    },
    {
      id: 3,
      title: "Bibimbap",
      category: "Korea",
      price: 8.99,
      img: "https://dwellbymichelle.com/wp-content/uploads/2020/05/DWELL-bibimbap.jpg",
      desc: "Boiling vegetables, serving with special hot sauce"
    },
    {
      id: 4,
      title: "Dan Dan Mian",
      category: "China",
      price: 5.99,
      img: "https://assets.goal.com/images/v3/bltcb97ace24899eff9/Icardi.jpg?auto=webp&format=pjpg&width=1080&quality=60",
      desc: "Dan dan noodle, serving with green onion"
    },
    {
      id: 5,
      title: "Yangzhou Fried Rice",
      category: "China",
      price: 12.99,
      img: "https://salu-salo.com/wp-content/uploads/2013/02/Yangzhou-Fried-Rice1.jpg",
      desc: "Yangzhou style fried rice, serving with bean and pickles"
    },
    {
      id: 6,
      title: "Onigiri",
      category: "Japan",
      price: 9.99,
      img: "https://www.manusmenu.com/wp-content/uploads/2017/08/Onigiri-3-1-of-1.jpg",
      desc: "Rice Sandwich, serving with soy sauce"
    }
  ];

// menüde yer alan kategorileri dinamik olarak oluşturduk.
// All ile bütün ürünleri gösterecek kategori
const categories = ["All", ...new Set(menu.map(item => item.category))];

// Butonları oluşturma
const createButtons = () => {
  // HTML'de bulunan butonları ekleyeceğimiz yeri seçiyoruz
  const btnContainer = document.querySelector(".btn-container");
  
  // Butonları oluşturuyoruz. Her kategori için bir buton HTML kodu ekleniyor.
  const buttonHTML = categories
    .map(category => {
      return `<button class="btn-item" data-id="${category}">${category}</button>`;
    })
    .join("");
  
  btnContainer.innerHTML = buttonHTML;
  
  // Buton event listener'ları
  const filterButtons = document.querySelectorAll(".btn-item");
  filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const category = e.target.dataset.id;
      const filteredMenu = category === "All" ? menu : menu.filter(item => item.category === category);
      displayMenuItems(filteredMenu);
    });
  });
};

// Menü öğelerini görüntüleme
const displayMenuItems = (menuItems) => {
  const menuContainer = document.querySelector(".section-center");
  const displayMenu = menuItems.map(item => {
    return `
      <div class="menu-items">
        <img src="${item.img}" alt="${item.title}" class="photo">
        <div class="menu-info">
          <div class="menu-title">
            <h4>${item.title}</h4>
            <h4 class="price">$${item.price}</h4>
          </div>
          <div class="menu-text">${item.desc}</div>
        </div>
      </div>
    `;
  }).join("");
  
  menuContainer.innerHTML = displayMenu;
};

// Sayfa yüklendiğinde
window.addEventListener("DOMContentLoaded", () => {
  createButtons();
  displayMenuItems(menu);
});

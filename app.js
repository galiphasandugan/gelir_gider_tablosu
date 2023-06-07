// ! en üst blok
const inputGelir = document.getElementById("input-gelir");
const btnEkle = document.getElementById("btn-ekle");
//! orta blok
const harcama_miktari = document.getElementById("input-harcama-miktari");
const inputZaman = document.getElementById("input-zaman");
const inputHarcama = document.getElementById("input-harcama");
const btnKaydet = document.getElementById("btn-kaydet");

// ! alt blok
const geliriniz = document.getElementById("geliriniz");
const gideriniz = document.getElementById("gideriniz");
const kalan = document.getElementById("kalan");

// !en alt refresh tagı
const temizle = document.getElementById("btn-temizle");

// ! modal tag i
const modal = document.getElementById("modal");
const tbody = document.getElementById("text-center");

const koray = document.querySelector(".koray");

const gelirler = [];
const giderler = [];
let total_gelir = 0;
let total_gider = 0;

const harcama = [];

// ! eventlar

//? gider ekleme
btnEkle.addEventListener("click", () => {
  if (inputGelir.value != "") {
    gelir();

    inputGelir.value = "";
    inputGelir.focus();

    koray.style = "display:block";
  }
});

//? harcama kaydet
btnKaydet.addEventListener("click", (e) => {
  if (harcama_miktari.value != "") {
    
    gider();
    harcama_miktari.value = "";
    harcama_miktari.focus();
  } else {
    alert("lütfen değer giriniz");
  }
});

const hidden = () => {
  modal.style.display = "none";
};

tbody.addEventListener("click", (e) => {
  if (e.target.id == "del") {
    tbody.lastElementChild.remove();
    modal.style.display = "block";
    setTimeout(hidden, 2000);

    
  }
});

//? temizleme
temizle.addEventListener("click", () => {
  window.location = "index.html";
  // ! form.reset()
  //! çalışması için öncelikle form etiketinin tetiklenmesi gerekiyor
});

// ! fonctions

//?koray işlemi

const gelir = () => {
  gelirler.push(Number(inputGelir.value));
  total_gelir = gelirler.reduce((a, i) => a + i, 0);
  geliriniz.textContent = total_gelir;

  //!kalan
  rest();
};

const gider = () => {
  giderler.push(Number(harcama_miktari.value));
  total_gider = giderler.reduce((a, i) => a + i, 0);
  gideriniz.textContent = total_gider;

  //!kalan
  rest();
  ekleme();
};

const rest = () => {
  kalan.textContent = total_gelir - total_gider;
};

//? harcama tabloya kayıt ekleme
const ekleme = () => {
  let harcama = [];

  let newObject = {
    harcamaYapilanYer: inputHarcama.value,
    tarih: inputZaman.value,
    fiyati: Number(harcama_miktari.value),
  };

  harcama.push(newObject);

  for (let i = 0; i <= harcama.length; i++) {
    tbody.innerHTML += `
    
    <tr>
    <td>${harcama[i].harcamaYapilanYer}</td>
    <td>${harcama[i].tarih}</td>
    <td id="hrcm">${harcama[i].fiyati}</td>
    <td class="td"><button id="del" class="del">DEL</button></td>
    </tr>`;
  }
};

//? current datetime to input date
function getDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  // PadStart method adds 0 to the beginning of the string
  // If the string length is less than 2
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}`;
}
inputZaman.value = getDateTime();



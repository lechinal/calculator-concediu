document.addEventListener("DOMContentLoaded", () => {
  // --- NOU: SELECTAREA ELEMENTELOR PENTRU TOGGLE ---
  const toggleAnualBtn = document.getElementById("toggle-anual-btn");
  const toggleProportionalBtn = document.getElementById(
    "toggle-proportional-btn"
  );
  const anualSection = document.getElementById("anual-calculator");
  const proportionalSection = document.getElementById(
    "proportional-calculator"
  );
  const allSections = document.querySelectorAll(".calculator-section");
  const allToggleBtns = document.querySelectorAll(".toggle-btn");

  // --- NOU: FUNCȚIA DE AFIȘARE/ASCUNDERE ---
  const toggleSection = (sectionToShow, btnToActivate) => {
    // 1. Ascunde toate secțiunile și dezactivează toate butoanele
    allSections.forEach((section) => {
      section.classList.add("is-collapsed");
    });
    allToggleBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    // 2. Afișează secțiunea dorită și activează butonul corespunzător
    if (sectionToShow && btnToActivate) {
      sectionToShow.classList.remove("is-collapsed");
      btnToActivate.classList.add("active");
    }
  };

  // --- NOU: ADĂUGAREA EVENIMENTELOR PE BUTOANELE DE TOGGLE ---
  toggleAnualBtn.addEventListener("click", () => {
    // Dacă secțiunea este deja deschisă, o închidem. Altfel, o deschidem.
    if (toggleAnualBtn.classList.contains("active")) {
      toggleSection(null, null);
    } else {
      toggleSection(anualSection, toggleAnualBtn);
    }
  });

  toggleProportionalBtn.addEventListener("click", () => {
    if (toggleProportionalBtn.classList.contains("active")) {
      toggleSection(null, null);
    } else {
      toggleSection(proportionalSection, toggleProportionalBtn);
    }
  });

  // --- SELECTAREA ELEMENTELOR PENTRU CALCULATORUL ANUAL ---
  const totalZileAnualInput = document.getElementById("total-zile-anual");
  const zileLuateAnualInput = document.getElementById("zile-luate-anual");
  const calculeazaAnualBtn = document.getElementById("calculeaza-anual");
  const rezultatAnualDiv = document.getElementById("rezultat-anual");

  // --- SELECTAREA ELEMENTELOR PENTRU CALCULATORUL PROPORȚIONAL ---
  const totalZileProportionalInput = document.getElementById(
    "total-zile-proportional"
  );
  const dataAngajareInput = document.getElementById("data-angajare");
  const dataPlecareInput = document.getElementById("data-plecare");
  const calculeazaProportionalBtn = document.getElementById(
    "calculeaza-proportional"
  );
  const rezultatProportionalDiv = document.getElementById(
    "rezultat-proportional"
  );

  // --- LOGICA PENTRU CALCULATORUL ANUAL ---
  calculeazaAnualBtn.addEventListener("click", () => {
    rezultatAnualDiv.classList.remove("success", "error");

    const totalZile = parseInt(totalZileAnualInput.value);
    const zileLuate = parseInt(zileLuateAnualInput.value);

    setTimeout(() => {
      if (isNaN(totalZile) || isNaN(zileLuate)) {
        rezultatAnualDiv.textContent = "Eroare: Introduceți numere valide.";
        rezultatAnualDiv.classList.add("error"); // Adăugăm clasa de eroare
        return;
      }

      const zileRamase = totalZile - zileLuate;

      if (zileRamase >= 0) {
        rezultatAnualDiv.textContent = `V-au mai rămas ${zileRamase} zile de concediu.`;
      } else {
        rezultatAnualDiv.textContent = `Ați depășit cu ${Math.abs(
          zileRamase
        )} zile de concediu.`;
      }
      rezultatAnualDiv.classList.add("success"); // Adăugăm clasa de succes
    }, 10);
  });

  calculeazaAnualBtn.addEventListener("click", () => {
    rezultatAnualDiv.classList.remove("success", "error");

    setTimeout(() => {
      const totalZile = parseInt(totalZileAnualInput.value);
      const zileLuate = parseInt(zileLuateAnualInput.value);

      if (isNaN(totalZile) || isNaN(zileLuate)) {
        rezultatAnualDiv.innerHTML = "Eroare: Introduceți numere valide.";
        rezultatAnualDiv.classList.add("error");
        return;
      }

      const zileRamase = totalZile - zileLuate;

      if (zileRamase >= 0) {
        // Aici construim HTML-ul cu span pentru număr
        rezultatAnualDiv.innerHTML = `V-au mai rămas <span class="highlight">${zileRamase}</span> zile de concediu.`;
      } else {
        // La fel și aici, pentru numărul absolut
        rezultatAnualDiv.innerHTML = `Ați depășit cu <span class="highlight">${Math.abs(
          zileRamase
        )}</span> zile de concediu.`;
      }

      rezultatAnualDiv.classList.add("success");
    }, 10);
  });

  // --- LOGICA PENTRU CALCULATORUL PROPORȚIONAL ---
  calculeazaProportionalBtn.addEventListener("click", () => {
    rezultatProportionalDiv.classList.remove("success", "error");

    setTimeout(() => {
      const totalZileContract = parseInt(totalZileProportionalInput.value);
      const dataAngajare = dataAngajareInput.value;
      const dataPlecare = dataPlecareInput.value;

      if (isNaN(totalZileContract) || !dataAngajare || !dataPlecare) {
        rezultatProportionalDiv.innerHTML =
          "Eroare: Completați toate câmpurile.";
        rezultatProportionalDiv.classList.add("error");
        return;
      }

      const startDate = new Date(dataAngajare);
      const endDate = new Date(dataPlecare);

      if (endDate < startDate) {
        rezultatProportionalDiv.innerHTML =
          "Eroare: Data plecării nu poate fi înainte de data angajării.";
        rezultatProportionalDiv.classList.add("error");
        return;
      }

      const anul = startDate.getFullYear();
      const zileInAn =
        (anul % 4 === 0 && anul % 100 !== 0) || anul % 400 === 0 ? 366 : 365;
      const diffTimp = endDate.getTime() - startDate.getTime();
      const zileLucrate = diffTimp / (1000 * 3600 * 24) + 1;
      const zileCuvenite = (totalZileContract / zileInAn) * zileLucrate;

      // Și aici construim HTML-ul, folosind toFixed pentru zecimale
      rezultatProportionalDiv.innerHTML = `Pentru perioada lucrată, se cuvin <span class="highlight">${zileCuvenite.toFixed(
        2
      )}</span> zile de concediu.`;

      rezultatProportionalDiv.classList.add("success");
    }, 10);
  });
});

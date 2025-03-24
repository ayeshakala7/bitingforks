
// dashed line
document.addEventListener("DOMContentLoaded", function () {
  const dashedLine = document.querySelector('.dashed-line');

  if (!dashedLine) {
    console.error("Dashed line element not found!");
    return;
  }

  dashedLine.addEventListener('mouseenter', () => {
    dashedLine.style.animationPlayState = 'running'; // Start  when hovered
  });

  dashedLine.addEventListener('mouseleave', () => {
    dashedLine.style.animationPlayState = 'paused'; // Pause when mouse leaves
  });
});

// recipe 
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".recipe-card img").forEach((image) => {
    let interval;
    const card = image.closest(".recipe-card");
    const emoji = card.dataset.emoji;
    const container = document.getElementById("emoji-container");

    if (!container) {
      console.error("Emoji container not found!");
      return;
    }

    //  the bounds of the card image minus image
    const cardRect = card.getBoundingClientRect();

    image.addEventListener("mouseenter", () => {
      interval = setInterval(() => {
        const emojiElement = document.createElement("div");
        emojiElement.className = "emoji-rain";
        emojiElement.textContent = emoji;

        const xPos = Math.random() * window.innerWidth;

        // Start the emojis 10cm higher 
        const yPos = Math.random() * (cardRect.top - 50) - 375; // 10cm above the card
        emojiElement.style.left = `${xPos}px`;
        emojiElement.style.top = `${yPos}px`;

        container.appendChild(emojiElement);

        // rem after animation completes
        setTimeout(() => {
          emojiElement.remove();
        }, 3000);
      }, 270); //  time between emojis
    });

    image.addEventListener("mouseleave", () => {
      clearInterval(interval);
    });
  });
});

 
// This is for the FOOTER
document.addEventListener("DOMContentLoaded", () => {
  const subscribeBtn = document.getElementById("subscribeBtn");
  const emailInput = document.getElementById("emailInput");
  const signupMessage = document.getElementById("signupMessage");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  subscribeBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (email && isValidEmail(email)) {
      const messages = [
        "Thank you! Your deets have been forwarded to Gru",
        "The coven welcomes you! Stay tuned for some delicious bites. 🧛‍♂️",
      ];
      signupMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
      signupMessage.style.color = "#2d3436"; // Dark color for visibility
      emailInput.value = "";
      signupMessage.style.fontSize = "medium";
    } else {
      signupMessage.textContent = "Please enter a valid email!";
      signupMessage.style.color = "#ff0000"; // Red for errors
      signupMessage.style.fontSize = "medium";
    }
  });
});
  

///////////////////////////////////////////////////////////////////////
// SHOP PAGE 

// FILTER 
document.addEventListener('DOMContentLoaded', function () {
  const typeSelect = document.getElementById('type');
  const flavourSelect = document.getElementById('flavour');
  const priceRange = document.getElementById('price');
  const priceValue = document.getElementById('price-value');
  const productGrid = document.getElementById('product-grid');

  // Update price value when the slider is moved
  priceRange.addEventListener('input', function () {
      priceValue.textContent = priceRange.value;
      filterProducts();  // We only filtering whenever the slider value changes
  });

  //  product changes based on selected filters
  function filterProducts() {
      const typeValue = typeSelect.value;
      const flavourValue = flavourSelect.value;
      const maxPrice = parseFloat(priceRange.value);

      // loop through each product card to apply filters
      const productCards = productGrid.querySelectorAll('.product-card');
      productCards.forEach(function (card) {
          const cardType = card.getAttribute('data-type');
          const cardFlavour = card.getAttribute('data-flavour');
          const cardPrice = parseFloat(card.getAttribute('data-price'));

          let matchesFilter = true;

          //  type filter
          if (typeValue !== 'all' && cardType !== typeValue) {
              matchesFilter = false;
          }

          //  flavour filter
          if (flavourValue !== 'all' && cardFlavour !== flavourValue) {
              matchesFilter = false;
          }

          //  price filter only if the slider is above 120
          if (maxPrice > 120 && cardPrice > maxPrice) {
              matchesFilter = false;
          }

          // see or hide the product based on whether it matches all filters
          if (matchesFilter) {
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  }

  // Initialize on page load
  filterProducts();

  // Event listeners for the other filters
  typeSelect.addEventListener('change', filterProducts);
  flavourSelect.addEventListener('change', filterProducts);
});


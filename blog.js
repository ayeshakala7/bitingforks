document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-btn");
    const recipes = document.querySelectorAll(".recipe-card");

    if (!buttons.length || !recipes.length) {
        console.error("Error: No filter buttons or recipe cards found.");
        return; // Stop if elements are missing
    }

    console.log("Buttons found:", buttons.length);
    console.log("Recipes found:", recipes.length);

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            console.log("Button clicked:", this.textContent);

            buttons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-category");
            console.log("Selected category:", category);

            recipes.forEach((recipe) => {
                const recipeCategory = recipe.getAttribute("data-category");
                console.log("Recipe category:", recipeCategory);

                if (category === "all" || recipeCategory === category) {
                    recipe.style.display = "block"; //  matching recipes
                } else {
                    recipe.style.display = "none"; // hide others
                }
            });
        });
    });
});


// FILTER IMAGE
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".filter-btn");

    // Mapping category to images or GIFs
    const images = {
        all: "gif/all.gif",
        dessert: "gif/dessert.gif",
        cake: "gif/cake.gif",
        breakfast: "gif/breakfast.gif",
        savory: "gif/savory.gif"
    };

    let hoverImage = document.createElement("img");
    hoverImage.classList.add("hover-image");
    document.body.appendChild(hoverImage);

    buttons.forEach(button => {
        button.addEventListener("mouseenter", (e) => {
            const category = button.getAttribute("data-category");

            if (images[category]) {
                hoverImage.src = images[category];
                hoverImage.classList.add("visible"); // Show image
            }
        });

        button.addEventListener("mousemove", (e) => {
            hoverImage.style.left = `${e.pageX + 20}px`;
            hoverImage.style.top = `${e.pageY}px`;
        });

        button.addEventListener("mouseleave", () => {
            hoverImage.classList.remove("visible"); // Hide image
        });
    });
});

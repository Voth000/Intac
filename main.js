let isAnimating = false;

window.onload = function () {
    // Selectors
    const sectionButtons = document.querySelectorAll("#a .button");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const minSpacing = 150; // Minimum spacing between buttons

    // Step 1: Initial setup (Hide initial elements, and prepare for animation)
    gsap.set("#center, #a, #b", { opacity: 0, visibility: "visible" }); // Hide elements initially
    gsap.set("#a, #b", { "backdrop-filter": "none" }); // Remove backdrop-filter from #a and #b
    gsap.set("#a", { "box-shadow": "none" }); // Remove box-shadow from #a
    gsap.set("h1", { "font-size": "6em" }); // Set the font size of h1 immediately

    // Step 2: Animate #center to be visible over 10 seconds
    gsap.to("#center", { opacity: 1, duration: 10 });

    // Step 3: Animate random button positions
    sectionButtons.forEach((button, index) => {
        const initialPosition = button.getBoundingClientRect();
        let randomX, randomY, overlapping;

        do {
            overlapping = false;
            randomX = Math.random() * (windowWidth - button.offsetWidth);
            randomY = Math.random() * (windowHeight - button.offsetHeight);

            // Check for overlap with already positioned buttons
            for (let i = 0; i < index; i++) {
                const otherButton = sectionButtons[i].getBoundingClientRect();
                if (
                    Math.abs(randomX - otherButton.x) < minSpacing &&
                    Math.abs(randomY - otherButton.y) < minSpacing
                ) {
                    overlapping = true;
                    break;
                }
            }
        } while (overlapping); // Retry until a valid position is found

        // Animate to random positions
        gsap.to(button, {
            x: randomX - initialPosition.x,
            y: randomY - initialPosition.y,
            duration: 4,
            ease: "power2.inOut",
        });
    });

    // Step 4: Show #a and #b after 2 seconds (fade in effect)
    setTimeout(() => {
        gsap.to("#a", { opacity: 1, duration: 1 });
        gsap.to("#b", { opacity: 1, duration: 1 });
    }, 2000);

    // Step 5: Reset button positions and apply blur effect to #a and #b after 7 seconds
    setTimeout(() => {
        sectionButtons.forEach((button) =>
            gsap.to(button, { x: 0, y: 0, duration: 2, ease: "power2.inOut" })
        );

        // Apply blur effect to #a and #b
        gsap.to("#a, #b", { css: { "backdrop-filter": "blur(8px)" }, duration: 0 });
    }, 7000);
};

// Select all buttons and content inside #b
const buttons = document.querySelectorAll('.button');
const contents = document.querySelectorAll('#b .content');  // Select only contents inside section#b
const transitionContainer = document.querySelector('.transition-container');
const tiles = document.querySelectorAll('.transition-container .tile');

function handleButtonClick(event) {
    if (isAnimating) return; // Prevent actions during ongoing animations
    isAnimating = true;

    const selectedButtonId = event.target.id;

    buttons.forEach(button => button.classList.remove("selected"));
    event.target.classList.add("selected");

    contents.forEach(content => content.classList.remove("selected-content"));
    const selectedContent = document.querySelector(`#b .content#${selectedButtonId}`);
    selectedContent.classList.add("selected-content");

    animateTilesOut(() => {
        // Reset flag after animation completes
        isAnimating = false;
    });
}


// Function to animate the tiles exiting
function animateTilesOut(onComplete) {
    let tl = gsap.timeline({ ease: "power4.inOut", onComplete });

    // Set all tiles to start at width 100% for the animation (exit)
    tl.set(tiles, { width: "100%", x: 0  });

    // Animate the tiles expanding and moving to the right (exit effect)
    tl.to(tiles, {
        duration: 0.4,
        
        x: "100%",  // Move to the right (offscreen)
        stagger: -0.05, // Stagger tiles' animation
        delay: 0.2, // Delay before animation starts
    });

    // Reset the tiles back to 0% width and left: 0 for the next animation
    tl.set(tiles, { x: "0", width: "0" });

    
}

// Add click event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

////

var acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        if (isAnimating) return; // Prevent toggling during animations

        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
}


window.onload = function () {
    // Select the anchor links
    const links = document.querySelectorAll("a[href^='#']");  // Select all links starting with #
    const contents = document.querySelectorAll('#b .content');  // All content elements in #b

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  // Prevent the default link behavior (scrolling)

            const targetId = link.getAttribute('href').substring(1);  // Get the target id (e.g., 'ben')
            const targetContent = document.getElementById(targetId);  // Find the corresponding content

            // Hide all content first
            contents.forEach(content => content.classList.remove("selected-content"));

            // Show the target content
            targetContent.classList.add("selected-content");

            // Optionally highlight the clicked link
            links.forEach(link => link.classList.remove("selected"));
            link.classList.add("selected");
        });
    });
};


let isAnimating = false; // Flag for button navigation animations
// Function to handle button click (for navigation)
function handleButtonClick(event) {
    if (isAnimating) return; // Prevent actions during ongoing animations
    isAnimating = true;

    const selectedButtonId = event.target.id; // Get the ID of the clicked button

    // Update button styles to reflect selection
    const buttons = document.querySelectorAll("#a .button");
    buttons.forEach(button => button.classList.remove("selected"));
    event.target.classList.add("selected");

    // Hide all content sections first
    const contents = document.querySelectorAll("#b .content");
    contents.forEach(content => content.classList.remove("selected-content"));
    
    // Find and show the selected content section
    const selectedContent = document.querySelector(`#b .content#${selectedButtonId}`);
    if (selectedContent) {
        selectedContent.classList.add("selected-content"); // Show the selected content
        console.log(`Content with ID ${selectedButtonId} is now visible`); // Debugging log to confirm visibility
    }

    // Trigger the tile animation after the content has been revealed
    animateTilesOut(() => {
        // Reset flag after animation completes
        isAnimating = false;
    });
}

// Example of setting up event listeners for the buttons (to trigger handleButtonClick)
document.querySelectorAll('#a .button').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

window.addEventListener("load", function () {
    const hash = window.location.hash.substring(1); // Extract the hash part from the URL

    // Ensure that #a and #b are visible
    gsap.set("#a, #b", { opacity: 1, visibility: "visible" }); // Make #a and #b visible

    // Check if the hash exists and is not empty
    if (hash) {
        // Find and highlight the corresponding button in #a
        const selectedButton = document.querySelector(`#a .button#${hash}`);
        if (selectedButton) {
            selectedButton.classList.add("selected"); // Highlight the corresponding button
        }

        // Find and show the corresponding content in #b
        const selectedContent = document.querySelector(`#b .content#${hash}`);
        if (selectedContent) {
            selectedContent.classList.add("selected-content"); // Add the selected-content class to make it visible
            console.log(`Content with ID ${hash} is now visible`); // Debugging log to confirm visibility
        }

        // Optionally trigger tile exit animation after a short delay
        setTimeout(function () {
            animateTilesOut(); // Call your tile exit animation function
        }, 300); // Adjust delay to match content fade-in duration
    } else {
        console.log("No matching content found for hash:", hash);
    }
});




window.onload = function () {
    // If the page has a hash in the URL, skip the animation and just scroll to the section
    const currentHash = window.location.hash;

    // If the URL contains a hash, just scroll to the section and skip the animation
    if (currentHash) {
        const targetElement = document.querySelector(currentHash);
        if (targetElement) {
            // Scroll smoothly to the target element without animation
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        isPageAnimating = false; // Stop the animation flag if we're directly loading to a section
        return; // Exit early so the animation code does not run
    }

    // Selectors for page load animation
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

        // After the page load animation is done, allow navigation
        isPageAnimating = false;
    }, 7000);
};

// Select all buttons and content inside #b
const buttons = document.querySelectorAll('.button');
const contents = document.querySelectorAll('#b .content');  // Select only contents inside section#b
const transitionContainer = document.querySelector('.transition-container');
const tiles = document.querySelectorAll('.transition-container .tile');
// Function to handle button clicks and show corresponding content
function handleButtonClick(event) {
    if (isAnimating) return; // Prevent actions during ongoing animations
    isAnimating = true;

    const selectedButtonId = event.target.id; // Get the ID of the clicked button

    // Update button styles to reflect selection
    buttons.forEach(button => button.classList.remove("selected"));
    event.target.classList.add("selected");

    // Hide all content sections first
    contents.forEach(content => content.classList.remove("selected-content"));
    
    // Find and show the selected content section
    const selectedContent = document.querySelector(`#b .content#${selectedButtonId}`);
    if (selectedContent) {
        selectedContent.classList.add("selected-content"); // Show the selected content
    }

    // Trigger the tile animation after the content has been revealed
    animateTilesOut(() => {
        // Reset flag after animation completes
        isAnimating = false;
    });
}


// Function to animate tiles out
function animateTilesOut(onComplete) {
    let tl = gsap.timeline({ ease: "power4.inOut", onComplete });

    // Set all tiles to start at width 100% for the animation (exit)
    const tiles = document.querySelectorAll('.tile'); // Example selector, change as needed
    tl.set(tiles, { width: "100%", x: 0 });

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

// Add event listeners to buttons
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




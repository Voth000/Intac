window.onload = function() {
    // Step 1: Ensure initial elements are hidden until animation starts
    gsap.set("#center, #a, #b", { opacity: 0, visibility: 'visible' });

    // Step 2: Animate #center to be visible over 10 seconds
    gsap.to("#center", { opacity: 1, duration: 10 });

    // Step 3: Animate #a and #b immediately (but with no backdrop-filter)
    gsap.set("#a, #b", { "backdrop-filter": "none" });
    gsap.set("#a", { "box-shadow": "none" });
    gsap.set("h1", { "font-size": "6em" });


    // Step 4: Start button animation immediately and move buttons to random positions
    const buttons = document.querySelectorAll("#a .button");
    
    const minSpacing = 150;
    const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

   buttons.forEach((button, index) => {
            const initialPosition = button.getBoundingClientRect();
            button.dataset.x = initialPosition.x;
            button.dataset.y = initialPosition.y;

            // Ensure the buttons don't overlap by checking their random positions
            let randomX, randomY;
            let overlapping;
            do {
                overlapping = false;
                randomX = Math.random() * (windowWidth - 100); // 100 to ensure the button stays inside the viewport
                randomY = Math.random() * (windowHeight - 100); // 100 to ensure the button stays inside the viewport

                // Check if the new position overlaps with any other button
                for (let i = 0; i < index; i++) {
                    const otherButton = buttons[i];
                    const otherRect = otherButton.getBoundingClientRect();
                    const distX = Math.abs(randomX - otherRect.x);
                    const distY = Math.abs(randomY - otherRect.y);

                    // If the distance between buttons is less than the minimum spacing, mark as overlapping
                    if (distX < minSpacing && distY < minSpacing) {
                        overlapping = true;
                        break;
                    }
                }
            } while (overlapping); // Keep trying until a non-overlapping position is found

            // Move each button to a random position over 10 seconds
            gsap.to(button, {
                x: randomX - initialPosition.x,
                y: randomY - initialPosition.y,
                duration: 4, // Animate buttons for 10 seconds
                ease: "power2.inOut"
            });
        });

    // Step 5: After 2 seconds, make #a and #b visible and restore backdrop-filter after 10 seconds
    setTimeout(() => {
        gsap.to("#a", { opacity: 1, duration: 1 });  // Make #a visible after 2 seconds
        gsap.to("#b", { opacity: 1, duration: 1 });  // Make #b visible after 2 seconds
    }, 2000); // After 2 seconds

    // Step 6: After 10 seconds, reset button positions and restore backdrop-filter
    setTimeout(() => {
        buttons.forEach(button => {
            gsap.to(button, {
                x: 0, 
                y: 0, 
                duration: 2, 
                ease: "power2.inOut"
            });
        });

        // Re-enable backdrop-filter after 10 seconds
        gsap.set("#a", { "backdrop-filter": "blur(8px)" });
        gsap.set("#b", { "backdrop-filter": "blur(8px)" });
        gsap.set("#a", { "box-shadow": "0px 4px 4px 0px rgba(116, 116, 116, 0.25)" }); 
        gsap.set("h1", { "font-size": "8em" });// Restore box-shadow

    }, 10000); // Wait for 10 seconds before resetting positions and restoring filters
};

// Select all buttons and content inside #b
const buttons = document.querySelectorAll('.button');
const contents = document.querySelectorAll('#b .content');  // Select only contents inside section#b
const transitionContainer = document.querySelector('.transition-container');
const tiles = document.querySelectorAll('.transition-container .tile');

// Function to handle button click and reveal content with animation
function handleButtonClick(event) {
    const selectedButtonId = event.target.id;

    // Remove 'selected' class from all buttons
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    event.target.classList.add('selected');

    // Hide all content first
    contents.forEach(content => {
        content.classList.remove('selected-content');
    });

    // Show the selected content immediately
    const selectedContent = document.querySelector(`#b .content#${selectedButtonId}`);
    selectedContent.classList.add('selected-content'); // Show the content immediately

    // Trigger the tile exit animation
    animateTilesOut();
}

// Function to animate the tiles exiting
function animateTilesOut() {
    let tl = gsap.timeline({ ease: "power4.inOut" });

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
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}



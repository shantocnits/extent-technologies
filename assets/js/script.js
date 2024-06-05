// Navbar Start..
const menuItem = document.querySelector(".menu");
const openMenuBtn = document.querySelector(".open-menu-btn");
const closeMenuBtn = document.querySelector(".close-menu-btn");

// Function to check if an element is a child of another element
const isDescendant = (parent, child) => {
    let node = child.parentNode;
    while (node != null) {
        if (node === parent) return true;
        node = node.parentNode;
    }
    return false;
};

// Toggle the sidebar when open/close buttons are clicked
[openMenuBtn, closeMenuBtn].forEach((btn) => {
    btn.addEventListener("click", () => {
        menuItem.classList.toggle("open");
        menuItem.style.transition = "transform 0.8s ease";
    });
});

// Close sidebar when clicking outside of it
document.addEventListener("click", (event) => {
    const isClickedInsideMenu = isDescendant(menuItem, event.target);
    if (!isClickedInsideMenu && !event.target.classList.contains("open-menu-btn")) {
        menuItem.classList.remove("open");
    }
});

// Remove inline style and 'open' class after transition ends
menuItem.addEventListener("transitionend", function(event) {
    if (event.propertyName === "transform" && !menuItem.classList.contains("open")) {
        menuItem.removeAttribute("style");
    }
});

// Toggle active class for dropdowns
menuItem.querySelectorAll(".dropdown > i").forEach((arrow) => {
    arrow.addEventListener("click", function(){
        this.closest(".dropdown").classList.toggle("active");
    });
});

// Navbar End.. //



// Hero Sidebar Start //
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const menuWrapper = document.querySelector(".menu-wrapper");
const hasCollapsible = document.querySelectorAll(".has-collapsible");

// Function to close the menu
function closeMenuHandler() {
  menuWrapper.classList.remove("show");
}

// Sidenav Toggle
openMenu.addEventListener("click", function () {
  menuWrapper.classList.add("show");
});

closeMenu.addEventListener("click", closeMenuHandler);

// Collapsible Menu
hasCollapsible.forEach(function (collapsible) {
  collapsible.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent event from bubbling up to document
    const isActive = collapsible.classList.contains("active");

    // Close all other collapsibles within the same parent
    collapsible.parentElement.querySelectorAll(".has-collapsible").forEach(function (otherCollapsible) {
      if (otherCollapsible !== collapsible) {
        otherCollapsible.classList.remove("active");
        const otherMenuChild = otherCollapsible.querySelector('.menu-child');
        otherMenuChild.style.maxHeight = otherMenuChild.scrollHeight + 'px'; // Set to current height for smooth transition
        setTimeout(() => {
          otherMenuChild.style.maxHeight = '0';
          otherMenuChild.style.opacity = '0';
        }, 0); // Delay to allow CSS changes to take effect
      }
    });

    if (isActive) {
      collapsible.classList.remove("active");
      const menuChild = collapsible.querySelector('.menu-child');
      menuChild.style.maxHeight = menuChild.scrollHeight + 'px'; // Set to current height for smooth transition
      setTimeout(() => {
        menuChild.style.maxHeight = '0';
        menuChild.style.opacity = '0';
      }, 0); // Delay to allow CSS changes to take effect
    } else {
      collapsible.classList.add("active");
      const menuChild = collapsible.querySelector('.menu-child');
      menuChild.style.maxHeight = menuChild.scrollHeight + 'px';
      menuChild.style.opacity = '1';

      // Reset max-height after the transition to allow for dynamic content changes
      menuChild.addEventListener('transitionend', function resetMaxHeight() {
        if (collapsible.classList.contains("active")) {
          menuChild.style.maxHeight = 'none';
        }
        menuChild.removeEventListener('transitionend', resetMaxHeight);
      });
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  const isClickInsideMenu = menuWrapper.contains(event.target);
  const isClickOnOpenMenu = openMenu.contains(event.target);

  if (!isClickInsideMenu && !isClickOnOpenMenu) {
    closeMenuHandler();
  }
});
// Hero Sidebar End //




// Topbar Text Effect Start //

// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false;

// Typerwrite text content. Use a pipe to indicate the start of the second line "|".  
var textArray = [
  "Free Shipping On All Orders Over $100! "
];

// Speed (in milliseconds) of typing.
var speedForward = 20, //Typing Speed
    speedWait = 1000, // Wait between typing and backspacing
    speedBetweenLines = 1000, //Wait between first and second lines
    speedBackspace = 28; //Backspace Speed

//Run the loop
typeWriter("output", textArray);

function typeWriter(id, ar) {
  var element = $("#" + id),
      aString = ar[a],
      eHeader = element.children("h1"), //Header element
      eParagraph = element.children("p"); //Subheader element
  
  // Determine if animation should be typing or backspacing
  if (!isBackspacing) {
    
    // If full string hasn't yet been typed out, continue typing
    if (i < aString.length) {
      
      // If character about to be typed is a pipe, switch to second line and continue.
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedBetweenLines);
        
      // If character isn't a pipe, continue typing.
      } else {
        // Type header or subheader depending on whether pipe has been detected
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedForward);
      }
      
    // If full string has been typed, switch to backspace mode.
    } else if (i == aString.length) {
      
      isBackspacing = true;
      setTimeout(function(){ typeWriter(id, ar); }, speedWait);
      
    }
    
  // If backspacing is enabled
  } else {
    
    // If either the header or the paragraph still has text, continue backspacing
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
      
      // If paragraph still has text, continue erasing, otherwise switch to the header.
      if (eParagraph.text().length > 0) {
        eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function(){ typeWriter(id, ar); }, speedBackspace);
    
    // If neither head or paragraph still has text, switch to next quote in array and start typing.
    } else { 
      
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
      setTimeout(function(){ typeWriter(id, ar); }, 50);
      
    }
  }
}

// Topbar Text Effect End //


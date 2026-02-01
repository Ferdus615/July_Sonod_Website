// DOM Elements
const themeToggle = document.getElementById("themeToggle");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");
const contentArea = document.getElementById("contentArea");
const navLinks = document.querySelectorAll("nav a");
const pageLinks = document.querySelectorAll(".page-link");

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  const icon = themeToggle.querySelector("i");
  if (document.body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
  const icon = mobileMenuBtn.querySelector("i");
  if (mainNav.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Page Navigation
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // e.preventDefault();

    // Close mobile menu if open
    mainNav.classList.remove("active");
    mobileMenuBtn.querySelector("i").classList.remove("fa-times");
    mobileMenuBtn.querySelector("i").classList.add("fa-bars");

    // Get page ID
    const pageId = link.getAttribute("data-page");

    // Update active nav link
    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    link.classList.add("active");

    // Hide all pages
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
    });

    // Show selected page
    document.getElementById(`${pageId}Page`).classList.add("active");

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Section Navigation on Sections Page
pageLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Update active section link
    pageLinks.forEach((pageLink) => pageLink.classList.remove("active"));
    link.classList.add("active");

    // Get section ID
    const sectionId = link.getAttribute("data-section");

    // Hide all section contents
    document.querySelectorAll(".section-content").forEach((section) => {
      section.classList.remove("active");
    });

    // Show selected section
    document.getElementById(`${sectionId}Section`).classList.add("active");
  });
});

// Accordion functionality
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const accordion = header.parentElement;
    accordion.classList.toggle("active");
  });
});

// CTA button functionality
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("click", function (e) {
    if (this.hasAttribute("data-page")) {
      e.preventDefault();
      const pageId = this.getAttribute("data-page");

      // Update active nav link
      navLinks.forEach((navLink) => navLink.classList.remove("active"));
      document
        .querySelector(`nav a[data-page="${pageId}"]`)
        .classList.add("active");

      // Hide all pages
      document.querySelectorAll(".page").forEach((page) => {
        page.classList.remove("active");
      });

      // Show selected page
      document.getElementById(`${pageId}Page`).classList.add("active");

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
});

// ==================== gonovote ======================

document.getElementById("submitBtn").addEventListener("click", function () {
  const yesOption = document.getElementById("yes");
  const noOption = document.getElementById("no");

  if (!yesOption.checked && !noOption.checked) {
    alert("দয়া করে আপনার সম্মতি নির্বাচন করুন (হ্যাঁ/না)।");
    return;
  }

  if (yesOption.checked) {
    alert(
      "আপনার সম্মতি জ্ঞাপনের জন্য ধন্যবাদ! জুলাই জাতীয় সনদ বাস্তবায়নের জন্য আপনার সমর্থন রেকর্ড করা হয়েছে।",
    );
  } else {
    alert(
      "জুলাই জাতীয় সনদ প্রস্তাবসমূহের প্রতি আপনার সম্মতি জ্ঞাপন না করার সিদ্ধান্ত রেকর্ড করা হয়েছে।",
    );
  }

  // Reset form after submission
  yesOption.checked = false;
  noOption.checked = false;
});

// Add visual feedback on option selection
const options = document.querySelectorAll(".option");
options.forEach((option) => {
  option.addEventListener("click", function () {
    const radio = this.querySelector('input[type="radio"]');
    radio.checked = true;

    // Remove visual selection from all options
    options.forEach((opt) => {
      opt.style.backgroundColor = "transparent";
    });

    // Add visual selection to clicked option
    this.style.backgroundColor = "rgba(52, 152, 219, 0.1)";
    this.style.borderRadius = "5px";
    this.style.padding = "5px";
  });
});

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Set initial theme based on time
  const hour = new Date().getHours();
  if (hour >= 18 || hour < 6) {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    themeToggle.querySelector("i").classList.remove("fa-moon");
    themeToggle.querySelector("i").classList.add("fa-sun");
  }

  // Initialize first accordion as open
  document.querySelector(".accordion").classList.add("active");
});

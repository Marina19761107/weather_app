document.addEventListener("DOMContentLoaded", () => {
  // Get the dropdown trigger button
  const dropdownTrigger = document.querySelector(".dropdown-trigger");
  const dropdown = document.querySelector(".dropdown");

  // Toggle dropdown on button click
  dropdownTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.classList.toggle("is-active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
});

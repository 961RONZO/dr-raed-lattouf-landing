const header = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const bookingForm = document.getElementById("bookingForm");
const formNote = document.getElementById("formNote");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 16);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const name = String(formData.get("name") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const preparedMessage = [
    "Hello Dr. Lattouf Clinics, I would like to book a consultation.",
    name ? `Name: ${name}` : "",
    contact ? `Contact: ${contact}` : "",
    service ? `Interested in: ${service}` : "",
    message ? `Goal: ${message}` : ""
  ].filter(Boolean).join("\n");

  navigator.clipboard?.writeText(preparedMessage).catch(() => {});
  formNote.textContent = "Booking message prepared. It has been copied when browser permissions allow. Send it through Instagram, or connect this form to WhatsApp once the clinic number is available.";
  formNote.classList.add("is-success");
  window.open("https://www.instagram.com/drlattoufclinics", "_blank", "noopener,noreferrer");
});

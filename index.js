let bookings = [];
let editIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const filter = document.getElementById("filter");

  form.addEventListener("submit", handleBooking);
  filter.addEventListener("change", displayEntries);
});

function handleBooking(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const bus = document.getElementById("bus").value;

  const entry = { name, email, phone, bus };

  if (editIndex !== null) {
    bookings[editIndex] = entry;
    editIndex = null;
  } else {
    bookings.push(entry);
  }

  document.getElementById("bookingForm").reset();
  displayEntries();
}

function displayEntries() {
  const filterValue = document.getElementById("filter").value;
  const container = document.getElementById("entries");
  container.innerHTML = "";

  bookings.forEach((entry, index) => {
    if (filterValue === "all" || entry.bus === filterValue) {
      const div = document.createElement("div");
      div.className = "entry";
      div.innerHTML = `
        <p><strong>Name:</strong> ${entry.name}</p>
        <p><strong>Email:</strong> ${entry.email}</p>
        <p><strong>Phone:</strong> ${entry.phone}</p>
        <p><strong>Bus:</strong> ${entry.bus}</p>
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      `;
      container.appendChild(div);
    }
  });
}

function deleteEntry(index) {
  bookings.splice(index, 1);
  displayEntries();
}

function editEntry(index) {
  const entry = bookings[index];
  document.getElementById("name").value = entry.name;
  document.getElementById("email").value = entry.email;
  document.getElementById("phone").value = entry.phone;
  document.getElementById("bus").value = entry.bus;
  editIndex = index;
}

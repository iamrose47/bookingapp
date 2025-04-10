const API_URL = "https://crudcrud.com/api/4564d125ac5a4a748c631b319635f47e/bookings";
let editId = null;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("bookingForm").addEventListener("submit", handleBooking);
  document.getElementById("filter").addEventListener("change", fetchAndDisplay);
  fetchAndDisplay();
});

async function handleBooking(e) {
  e.preventDefault();

  const entry = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    bus: document.getElementById("bus").value
  };

  try {
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, entry);
      editId = null;
    } else {
      await axios.post(API_URL, entry);
    }

    document.getElementById("bookingForm").reset();
    fetchAndDisplay();
  } catch (err) {
    console.error("Error booking:", err);
  }
}

async function fetchAndDisplay() {
  try {
    const res = await axios.get(API_URL);
    const bookings = res.data;
    const filterValue = document.getElementById("filter").value;
    const container = document.getElementById("entries");

    container.innerHTML = "";

    bookings.forEach((entry) => {
      if (filterValue === "all" || entry.bus === filterValue) {
        const div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = `
          <p><strong>Name:</strong> ${entry.name}</p>
          <p><strong>Email:</strong> ${entry.email}</p>
          <p><strong>Phone:</strong> ${entry.phone}</p>
          <p><strong>Bus:</strong> ${entry.bus}</p>
          <button onclick="editEntry('${entry._id}')">Edit</button>
          <button onclick="deleteEntry('${entry._id}')">Delete</button>
        `;
        container.appendChild(div);
      }
    });
  } catch (err) {
    console.error("Error fetching entries:", err);
  }
}

async function deleteEntry(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchAndDisplay();
  } catch (err) {
    console.error("Error deleting entry:", err);
  }
}

async function editEntry(id) {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    const entry = res.data;

    document.getElementById("name").value = entry.name;
    document.getElementById("email").value = entry.email;
    document.getElementById("phone").value = entry.phone;
    document.getElementById("bus").value = entry.bus;

    editId = id;
  } catch (err) {
    console.error("Error editing entry:", err);
  }
}

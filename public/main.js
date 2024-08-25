document.addEventListener('DOMContentLoaded', function () {
  fetchAppointments();
});

function addAppointment() {
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;

  if (username && email) {
      var appointmentData = { username: username, email: email };
      axios.post('http://52.90.231.173:3000/api/users', appointmentData)
          .then(function (response) {
              console.log(response.data);
              document.getElementById('username').value = '';
              document.getElementById('email').value = '';
              fetchAppointments();
          })
          .catch(function (error) {
              console.error('Error adding appointment:', error);
          });
  }
}

function fetchAppointments() {
  axios.get('http://52.90.231.173:3000/api/users')
      .then(function (response) {
          displayAppointments(response.data);
      })
      .catch(function (error) {
          console.error('Error retrieving appointments:', error);
      });
}

function displayAppointments(appointments) {
  var appointmentList = document.getElementById('appointmentList');
  appointmentList.innerHTML = '';
  appointments.forEach(function (appointment) {
      var appointmentItem = document.createElement('div');
      appointmentItem.innerHTML = `
          <p>Username: ${appointment.username}</p>
          <p>Email: ${appointment.email}</p>
          <button onclick="deleteUser(${appointment.id})">Delete</button>
      `;
      appointmentList.appendChild(appointmentItem);
  });
}

function deleteUser(id) {
  axios.delete(`http://52.90.231.173:3000/api/users/${id}`)
      .then(function (response) {
          console.log('User deleted:', response.data);
          fetchAppointments();
      })
      .catch(function (error) {
          console.error('Error deleting user:', error);
      });
}

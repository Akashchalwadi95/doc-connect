export const callDoctor = (doctor) => {
  if (doctor.phone) {
    window.location.href = `tel:${doctor.phone}`;
  } else {
    alert("Phone number not available for this doctor.");
  }
};
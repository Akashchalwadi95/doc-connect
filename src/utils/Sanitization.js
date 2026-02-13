export function isValidEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongPassword(password) {
  // At least 8 chars, one number, one special char, one lowercase, one uppercase
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}


  const sanitizeName = (name) => {
    return name.trim().replace(/[^a-zA-Z\s]/g, "");
  }

  const sanitizePhone = (phone) => {
    return phone.replace(/\D/g, "");
  }

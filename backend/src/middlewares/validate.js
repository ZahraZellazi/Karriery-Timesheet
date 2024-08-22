const validateSignup = (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
  
    if (!firstname) return res.status(400).json({ code: 'MISSING_FIELD', message: 'First name is required' });
    if (!lastname) return res.status(400).json({ code: 'MISSING_FIELD', message: 'Last name is required' });
    if (!email) return res.status(400).json({ code: 'MISSING_FIELD', message: 'Email is required' });
    if (!password) return res.status(400).json({ code: 'MISSING_FIELD', message: 'Password is required' });
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ code: 'INVALID_EMAIL', message: 'Invalid email address' });
    }
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ code: 'WEAK_PASSWORD', message: 'Password must be at least 8 characters long, contain at least one special character, and one uppercase letter' });
    }
  
    next();
  };
  
  module.exports = {
    validateSignup
  };
  
import { Request, Response, NextFunction } from 'express';

const emailValidator = (req: Request, res: Response, next: NextFunction): void => {
  const email = req.body?.email;
  if (!email || typeof email !== 'string') {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  const parts = email.split('@');
  if (parts.length !== 2) {
    res.status(400).json({ message: 'Invalid email format' });
    return;
  }

  const [username, domain] = parts;
  const isAlphaNumeric = /^[a-zA-Z0-9]+$/.test(username);

  if (domain !== 'gmail.com' || !isAlphaNumeric) {
    res.status(400).json({
      message: 'Invalid email: must be a gmail.com address and contain only letters/numbers before the @.'
    });
    return;
  }
  if (domain !== 'gmail.com' || !isAlphaNumeric) {
    res.status(400).json({
      message: 'Invalid email: must be a gmail.com address and contain only letters/numbers before the @.'
    });
    return;
  }
  if (domain !== 'gmail.com' || !isAlphaNumeric) {
    res.status(400).json({
      message: 'Invalid email: must be a gmail.com address and contain only letters/numbers before the @.'
    });
    return;
  }
  if (domain !== 'gmail.com' || !isAlphaNumeric) {
    res.status(400).json({
      message: 'Invalid email: must be a gmail.com address and contain only letters/numbers before the @.'
    });
    return;
  }
  if (domain !== 'gmail.com' || !isAlphaNumeric) {
    res.status(400).json({
      message: 'Invalid email: must be a gmail.com address and contain only letters/numbers before the @.'
    });
    return;
  }
  if (domain !== 'gmail.com' || !isAlphaNumeric) {
    res.status(400).json({
      message: 'Invalid email: must be a gmail.com address and contain only letters/numbers before the @.'
    });
    return;
  }
  next();
};

export default emailValidator;
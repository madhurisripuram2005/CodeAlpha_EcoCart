import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../database/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secure_ecocart_jwt_secret_key_2026_codealpha';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export const authController = {
  /**
   * Register a new customer
   * POST /api/auth/register
   */
  register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      // Input Validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Full name is required (minimum 2 characters).'
        });
      }

      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({
          success: false,
          message: 'A valid email address is required.'
        });
      }

      if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long.'
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      // Check for duplicate email
      const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email address already exists.'
        });
      }

      // Hash password securely (never plaintext!)
      const passwordHash = bcrypt.hashSync(password, 10);

      // Force role to 'customer' to prevent privilege escalation via registration
      const insert = db.prepare(`
        INSERT INTO users (name, email, password_hash, role)
        VALUES (?, ?, ?, 'customer')
      `);

      const result = insert.run(name.trim(), normalizedEmail, passwordHash);
      const newUser = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(result.lastInsertRowid);

      // Issue JWT token
      const token = generateToken(newUser);
      res.cookie('token', token, COOKIE_OPTIONS);

      return res.status(201).json({
        success: true,
        message: 'Registration successful. Welcome to EcoCart!',
        token,
        user: newUser
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Authenticate user & issue token
   * POST /api/auth/login
   */
  login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required.'
        });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      // Sanitize user object (omit password_hash)
      const sanitizedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at
      };

      const token = generateToken(sanitizedUser);
      res.cookie('token', token, COOKIE_OPTIONS);

      return res.json({
        success: true,
        message: 'Login successful.',
        token,
        user: sanitizedUser
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Clear session cookie
   * POST /api/auth/logout
   */
  logout(req, res) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    return res.json({
      success: true,
      message: 'Logged out successfully.'
    });
  },

  /**
   * Retrieve currently authenticated user
   * GET /api/auth/me
   */
  getMe(req, res) {
    return res.json({
      success: true,
      user: req.user
    });
  }
};

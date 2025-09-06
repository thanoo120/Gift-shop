// server/middleware/security.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const config = require('../config/config');

// General rate limiting
const limiter = rateLimit({
    windowMs: config.security.rateLimitWindowMs,
    max: config.security.rateLimitMaxRequests,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Strict rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many authentication attempts, please try again later.',
    skipSuccessfulRequests: true
});

// Input validation and sanitization
const sanitizeInput = (req, res, next) => {
    // Sanitize request body, query, and params
    if (req.body) {
        req.body = sanitizeObject(req.body);
    }
    if (req.query) {
        req.query = sanitizeObject(req.query);
    }
    if (req.params) {
        req.params = sanitizeObject(req.params);
    }
    next();
};

// Recursive sanitization function
const sanitizeObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        if (typeof obj === 'string') {
            // Remove potential XSS vectors
            return obj
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+\s*=/gi, '')
                .trim();
        }
        return obj;
    }

    const sanitized = Array.isArray(obj) ? [] : {};
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Prevent prototype pollution
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                continue;
            }
            sanitized[key] = sanitizeObject(obj[key]);
        }
    }
    
    return sanitized;
};

// CSRF Protection (for state-changing operations)
const csrfProtection = (req, res, next) => {
    // Skip CSRF for GET requests
    if (req.method === 'GET') {
        return next();
    }

    const token = req.headers['x-csrf-token'] || req.body._csrf;
    const sessionToken = req.session?.csrfToken;

    if (!token || !sessionToken || token !== sessionToken) {
        return res.status(403).json({
            error: 'Invalid CSRF token',
            code: 'CSRF_VALIDATION_FAILED'
        });
    }

    next();
};

// Security headers configuration
const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "https://cdn.auth0.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", `https://${config.auth0.domain}`]
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
});

// Prevent parameter pollution
const preventParamPollution = (req, res, next) => {
    // Convert arrays to first value for specific fields
    const fieldsToClean = ['username', 'email', 'productName', 'quantity'];
    
    fieldsToClean.forEach(field => {
        if (req.query[field] && Array.isArray(req.query[field])) {
            req.query[field] = req.query[field][0];
        }
        if (req.body && req.body[field] && Array.isArray(req.body[field])) {
            req.body[field] = req.body[field][0];
        }
    });
    
    next();
};

// Log security events
const securityLogger = (eventType) => {
    return (req, res, next) => {
        console.log(`[SECURITY] ${eventType} - User: ${req.user?.username || 'Anonymous'} - IP: ${req.ip} - Path: ${req.path}`);
        next();
    };
};

module.exports = {
    limiter,
    authLimiter,
    sanitizeInput,
    csrfProtection,
    securityHeaders,
    mongoSanitize: mongoSanitize(),
    preventParamPollution,
    securityLogger
};
import { Op } from 'sequelize';

const LIKE_SYMBOL = Symbol.for('like');
const SENSITIVE_FIELDS = ['password_hash', 'password', 'token', 'secret', 'createdAt', 'updatedAt'];

export const sanitizeUser = (user = {}) => {
  if (!user || typeof user !== 'object') return {};

  const sanitized = { ...user };

  SENSITIVE_FIELDS.forEach((field) => {
    delete sanitized[field];
  });

  return sanitized;
};

export const buildUserFilters = (query = {}) => {
  if (!query || !query.nombre) return {};

  return {
    [Op.or]: [
      { firstname: { [LIKE_SYMBOL]: `%${query.nombre}%` } },
      { lastname: { [LIKE_SYMBOL]: `%${query.nombre}%` } },
    ],
  };
};

export const normalizeFilterForSequelize = (filters = {}) => {
  const normalized = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      normalized[key] = value.map((item) => normalizeFilterForSequelize(item));
      return;
    }

    if (value && typeof value === 'object' && value[LIKE_SYMBOL]) {
      normalized[key] = { [Op.like]: value[LIKE_SYMBOL] };
      return;
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      normalized[key] = normalizeFilterForSequelize(value);
      return;
    }

    normalized[key] = value;
  });

  return normalized;
};

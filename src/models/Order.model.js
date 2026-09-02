import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';
import User from './User.model.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  tableName: 'pedidos',
  timestamps: true,
  underscored: true,
});

User.hasMany(Order, { foreignKey: 'user_id', as: 'pedidos' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'usuario' });

export default Order;

import { Op } from "sequelize";
import sequelize from "../db/database.js";
import User from "../models/User.model.js";
import Order from "../models/Order.model.js";
import {
  sanitizeUser,
  buildUserFilters,
  normalizeFilterForSequelize,
} from "../utils/data-utils.js";

export const getAllUsers = async (req, res) => {
  try {
    const filters = buildUserFilters(req.query);
    const where = normalizeFilterForSequelize(filters);

    const users = await User.findAll({
      where,
      attributes: { exclude: ["password_hash", "createdAt", "updatedAt"] },
      order: [["id", "ASC"]],
    });

    res.json({
      count: users.length,
      data: users.map((user) => sanitizeUser(user.toJSON())),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "No se pudo obtener la información de usuarios.",
        error: error.message,
      });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password_hash", "createdAt", "updatedAt"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json({ data: sanitizeUser(user.toJSON()) });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "No se pudo consultar el usuario.",
        error: error.message,
      });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password_hash", "createdAt", "updatedAt"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json({ data: sanitizeUser(user.toJSON()) });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "No se pudo buscar el usuario por email.",
        error: error.message,
      });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    if (!firstname || !lastname || !email) {
      return res
        .status(400)
        .json({ message: "Se requieren nombre, apellido y email." });
    }

    const user = await User.create({ firstname, lastname, email });

    res.status(201).json({
      message: "Usuario creado con éxito.",
      data: sanitizeUser(user.toJSON()),
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "No se pudo crear el usuario.", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;

    await user.save();

    res.json({
      message: "Usuario actualizado con éxito.",
      data: sanitizeUser(user.toJSON()),
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        message: "No se pudo actualizar el usuario.",
        error: error.message,
      });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    await user.destroy();

    res.json({ message: "Usuario eliminado con éxito.", id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "No se pudo eliminar el usuario.",
        error: error.message,
      });
  }
};

export const registerUserWithOrder = async (req, res) => {
  const { firstname, lastname, email, total } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const user = await User.create(
      { firstname, lastname, email },
      { transaction },
    );
    await Order.create(
      { total, user_id: user.id, estado: "pendiente" },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({
      message: "Usuario y pedido creados con éxito.",
      user: sanitizeUser(user.toJSON()),
      pedido: { total, estado: "pendiente" },
    });
  } catch (error) {
    await transaction.rollback();
    console.error(
      "Rollback ejecutado por error en transacción:",
      error.message,
    );
    res
      .status(400)
      .json({
        message: "La transacción falló y se ejecutó rollback.",
        error: error.message,
      });
  }
};

export const getUserWithOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Order,
          as: "pedidos",
        },
      ],
      attributes: { exclude: ["password_hash", "createdAt", "updatedAt"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json({ data: sanitizeUser(user.toJSON()) });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "No se pudo recuperar el usuario con sus pedidos.",
        error: error.message,
      });
  }
};

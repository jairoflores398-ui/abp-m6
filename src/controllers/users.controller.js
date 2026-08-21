import User from "../models/User.model.js";

export const getAllUsers = (req, res) => {
    try {
        const users = User.findAll();
        res.json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:
                "No se pude obtener la data de usuarios, intente más tarde.",
        });
    }
};

export const getUserById = (req, res) => {
    try {
        let { id } = req.params;

        const user = User.findById(id);
        if (!user)
            return res.status(404).json({ message: "Usuario no encontrado." });

        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:
                "No se pude obtener la data del usuario, intente más tarde.",
        });
    }
};

export const getUserByEmail = (req, res) => {
    try {
        let { email } = req.params;

        const user = User.findByEmail(email);
        if (!user)
            return res.status(404).json({ message: "Usuario no encontrado." });

        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:
                "No se pude obtener la data del usuario, intente más tarde.",
        });
    }
};

export const createUser = (req, res) => {
    try {
        let { firstname, lastname, email } = req.body;

        if (!firstname || !lastname || !email) {
            return res
                .status(400)
                .json({ message: "No se proporcionan los campos requeridos." });
        }

        const newUser = new User(firstname, lastname, email);

        newUser.save();

        res.status(201).json({
            message: "Usuario creado con éxito.",
            user: newUser,
        });
    } catch (error) {
        if (error.code) {
            return res.status(error.code).json({ message: error.message });
        }
        res.status(500).json({
            message: "No se pude crear el usuario, intente más tarde.",
        });
    }
};

export const updateUser = (req, res) => {
    try {
        
        let { id } = req.params;

        let { firstname, lastname, email } = req.body;

        const user = User.findById(id);

        if (!user)
            return res.status(404).json({ message: "Usuario no encontrado." });

        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.email = email || user.email;

        user.update();

        res.status(201).json({
            message: "Usuario actualizado con éxito.",
            user,
        });
    } catch (error) {
        console.log(error);
        if (error.code) {
            return res.status(error.code).json({ message: error.message });
        }

        res.status(500).json({
            message: "No se pudo crear el usuario, intente más tarde.",
        });
    }
};


export const deleteUser = (req, res) => {
    try {
        
        let { id } = req.params;

        const user = User.findById(id);

        if (!user)
            return res.status(404).json({ message: "Usuario no encontrado." });

        user.delete();

        res.status(200).json({message: "Usuario eliminado con éxito."});

    } catch (error) {
        console.log(error);
        if (error.code) {
            return res.status(error.code).json({ message: error.message });
        }

        res.status(500).json({
            message: "Error al intentar eliminar el usuario, intente más tarde.",
        });
    }
};
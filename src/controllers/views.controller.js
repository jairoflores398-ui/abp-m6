import User from "../models/User.model.js";

export const homeView = (req, res) => {
    try {
        res.render("home");

    } catch (error) {
        res.status(500).send("Error al cargar vista home.");
    }
}

export const usersView = (req, res) => {
    try {
        const users = User.findAll();

        res.render("users", {
            users
        });

    } catch (error) {
        res.status(500).send("Error al cargar vista de usuarios.");
    }
}

export const profileUserView = (req, res) => {
    try {

        let { id } = req.params;
        const user = User.findById(id);

        res.render("profileUser", {
            user,
            id
        });

    } catch (error) {
        res.status(500).send("Error al cargar vista de usuarios.");
    }
}


export const userEditView = (req, res) => {
    try {

        let { id } = req.params;
        const user = User.findById(id);

        res.render("editUser", {
            user,
            id
        });

    } catch (error) {
        res.status(500).send("Error al cargar vista de edición de usuarios.");
    }
}

export const userAddView = (req, res) => {
    try {
        res.render("addUser");

    } catch (error) {
        res.status(500).send("Error al cargar vista home.");
    }
}

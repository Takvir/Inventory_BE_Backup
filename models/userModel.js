// models/userModel.js
const bcrypt = require('bcrypt');
const pool = require('../db/pool');
const jwt = require('jsonwebtoken');

const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
};

const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

const createUser = async (user) => {
    const { user_name, password, branch_id, user_type } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute('INSERT INTO users (user_name, password, branch_id, user_type) VALUES (?, ?, ?, ?)', [user_name, hashedPassword, branch_id, user_type]);
    return { id: result.insertId, user_name, password: hashedPassword, branch_id, user_type };
};

const updateUser = async (id, user) => {
    const { user_name, password, branch_id, user_type } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute('UPDATE users SET user_name = ?, password = ?, branch_id = ?, user_type = ? WHERE id = ?', [user_name, hashedPassword, branch_id, user_type, id]);
};

const deleteUser = async (id) => {
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
};

const getUserByUsername = async (username) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_name = ?', [username]);
    return rows[0];
};

const authenticateUser = async (username, password) => {
    const user = await getUserByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            { id: user.id, user_type: user.user_type, branch_id: user.branch_id }, // Ensure branch_id is included
            'your_jwt_secret_key',
            { expiresIn: '1h' }
        );
        return { token, user_type: user.user_type, branch_id: user.branch_id }; // Ensure branch_id is included in the response
    } else {
        throw new Error('Invalid credentials');
    }
};




module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authenticateUser  // Ensure this function is exported
};

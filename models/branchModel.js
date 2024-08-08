const pool = require('../db/pool');

const getAllBranches = async () => {
    const [rows] = await pool.query('SELECT * FROM branch');
    return rows;
};

const getBranchById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM branch WHERE branch_id = ?', [id]);
    return rows[0];
};

const createBranch = async (branch) => {
    const { branch_id, branch_name } = branch;
    const [result] = await pool.execute('INSERT INTO branch (branch_id, branch_name) VALUES (?, ?)', [branch_id, branch_name]);
    return { id: branch_id, branch_name };
};

const updateBranch = async (id, branch) => {
    const { branch_name } = branch;
    await pool.execute('UPDATE branch SET branch_name = ? WHERE branch_id = ?', [branch_name, id]);
};

const deleteBranch = async (id) => {
    await pool.execute('DELETE FROM branch WHERE branch_id = ?', [id]);
};

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};

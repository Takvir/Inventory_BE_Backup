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
    const { branch_id, branch_name, employee_number } = branch;
    const [result] = await pool.execute('INSERT INTO branch (branch_id, branch_name, employee_number) VALUES (?, ?, ?)', [branch_id, branch_name, employee_number]);
    return { id: branch_id, branch_name };
};

const updateBranch = async (id, branch) => {
    const { branch_name, employee_number } = branch;
    await pool.execute('UPDATE branch SET branch_name = ?, employee_number = ?  WHERE branch_id = ?', [branch_name, employee_number, id]);
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

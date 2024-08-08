const pool = require('../db/pool');
const groupModel = require('./groupModel');

const getAllAssets = async () => {
    const [rows] = await pool.query(`
        SELECT a.*, b.branch_name, g.group_name
        FROM asset a
        JOIN branch b ON a.branch_id = b.branch_id
        JOIN \`group\` g ON a.group_id = g.group_id
    `);
    return rows;
};

const getAssetById = async (id) => {
    const [rows] = await pool.query(`
        SELECT a.*, b.branch_name, g.group_name
        FROM asset a
        JOIN branch b ON a.branch_id = b.branch_id
        JOIN \`group\` g ON a.group_id = g.group_id
        WHERE a.asset_id = ?
    `, [id]);
    return rows[0];
};

const getAssetsByBranchId = async (branchId) => {
    const [rows] = await pool.query(`
        SELECT a.*, b.branch_name, g.group_name
        FROM asset a
        JOIN branch b ON a.branch_id = b.branch_id
        JOIN \`group\` g ON a.group_id = g.group_id
        WHERE a.branch_id = ?
    `, [branchId]);
    return rows;
};

const createAsset = async (asset) => {
    const { branch_id, branch_name, group_id, desktop_name, configuration, tag_name, warranty, price, purchase_date, status, asset_get_by, serial_number, sub_branch } = asset;
    const [result] = await pool.execute(
        'INSERT INTO asset (branch_id, branch_name, group_id, desktop_name, configuration, tag_name, warranty, price, purchase_date, status, asset_get_by, serial_number, sub_branch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [branch_id, branch_name, group_id, desktop_name, configuration, tag_name || null, warranty, price, purchase_date, status, asset_get_by, serial_number, sub_branch]
    );

    // Decrement stock_in_hand in group table
    await groupModel.decrementStockInHand(group_id, 1);

    return { id: result.insertId, ...asset };
};

const updateAsset = async (id, asset) => {
    const { branch_id, branch_name, group_id, desktop_name, configuration, tag_name, warranty, price, purchase_date, status, asset_get_by, serial_number, sub_branch } = asset;
    await pool.execute(
        'UPDATE asset SET branch_id = ?, branch_name = ?, group_id = ?, desktop_name = ?, configuration = ?, tag_name = ?, warranty = ?, price = ?, purchase_date = ?, status = ?, asset_get_by = ?, serial_number = ?, sub_branch = ? WHERE asset_id = ?',
        [branch_id, branch_name, group_id, desktop_name, configuration, tag_name, warranty, price, purchase_date, status, asset_get_by, serial_number, sub_branch, id]
    );
};
const deleteAsset = async (id) => {
    await pool.execute('DELETE FROM asset WHERE asset_id = ?', [id]);
};

const getAssetsByBranchAndGroup = async (branchId, groupId) => {
    const [rows] = await pool.query(`
        SELECT a.*, b.branch_name, g.group_name
        FROM asset a
        JOIN branch b ON a.branch_id = b.branch_id
        JOIN \`group\` g ON a.group_id = g.group_id
        WHERE a.branch_id = ? AND a.group_id = ?
    `, [branchId, groupId]);
    return rows;
};

const getAssetsByGroupId = async (groupId) => {
    const [rows] = await pool.query(`
        SELECT a.*, b.branch_name, g.group_name
        FROM asset a
        JOIN branch b ON a.branch_id = b.branch_id
        JOIN \`group\` g ON a.group_id = g.group_id
        WHERE a.group_id = ?
    `, [groupId]);
    return rows;
};

const getAssetCountByBranch = async () => {
    const [rows] = await pool.query(`
        SELECT b.branch_id, b.branch_name, COUNT(a.asset_id) AS asset_count
        FROM branch b
        LEFT JOIN asset a ON b.branch_id = a.branch_id
        GROUP BY b.branch_id, b.branch_name
    `);
    return rows;
};

const getAssetCountByBranchAndGroup = async () => {
    const [rows] = await pool.query(`
        SELECT b.branch_id, b.branch_name, g.group_id, g.group_name, COUNT(a.asset_id) AS asset_count
        FROM branch b
        LEFT JOIN \`group\` g ON b.branch_id = g.branch_id
        LEFT JOIN asset a ON g.group_id = a.group_id
        GROUP BY b.branch_id, b.branch_name, g.group_id, g.group_name
    `);
    return rows;
};

module.exports = {
    getAllAssets,
    getAssetById,
    getAssetsByBranchId,
    createAsset,
    updateAsset,
    deleteAsset,
    getAssetsByBranchAndGroup,
    getAssetsByGroupId,
    getAssetCountByBranch,
    getAssetCountByBranchAndGroup
};

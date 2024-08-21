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

const getAssetsByBranchGroupAndSubBranch = async (branchId, groupId, subBranch) => {
    const [rows] = await pool.query(`
        SELECT a.*, b.branch_name, g.group_name
        FROM asset a
        JOIN branch b ON a.branch_id = b.branch_id
        JOIN \`group\` g ON a.group_id = g.group_id
        WHERE a.branch_id = ? AND a.group_id = ? AND a.sub_branch = ?
    `, [branchId, groupId, subBranch]);
    return rows;
};

const createAsset = async (asset) => {
    const { branch_id, branch_name, group_id, desktop_name, configuration, tag_name, warranty, price, purchase_date, status, asset_get_by, serial_number, sub_branch, OS, RAM, Storage, work_order, challan_no } = asset;
    const [result] = await pool.execute(
        'INSERT INTO asset (branch_id, branch_name, group_id, desktop_name, configuration, tag_name, warranty, price, purchase_date, status, asset_get_by, serial_number, sub_branch, OS, RAM, Storage, work_order, challan_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [branch_id, branch_name, group_id, desktop_name, configuration, tag_name || null, warranty, price, purchase_date, status, asset_get_by, serial_number, sub_branch,OS,RAM,Storage,work_order,challan_no]
    );

    // Decrement stock_in_hand in group table if status is Active
    if (status === 'Active') {
        await groupModel.decrementStockInHand(group_id, 1);
    }  
    else if (status === 'InActive') {
        await groupModel.decrementStockInHand(group_id, 1);
    }
    else if (status === 'Faulty') {
        await groupModel.decrementStockInHand(group_id, 1);
    }    


    return { id: result.insertId, ...asset };
};

const updateAsset = async (id, asset) => {
    const { branch_id, branch_name, group_id, desktop_name, configuration, tag_name, warranty, price, purchase_date, status, asset_get_by, serial_number, sub_branch, OS, RAM, Storage, work_order, challan_no } = asset;

    // Retrieve the current status of the asset before updating
    const [currentAssetRows] = await pool.query('SELECT status FROM asset WHERE asset_id = ?', [id]);
    const currentStatus = currentAssetRows[0]?.status;

    // Update the asset
    await pool.execute(
        'UPDATE asset SET branch_id = ?, branch_name = ?, group_id = ?, desktop_name = ?, configuration = ?, tag_name = ?, warranty = ?, price = ?, purchase_date = ?, status = ?, asset_get_by = ?, serial_number = ?, sub_branch = ?, OS = ?, RAM = ?, Storage = ?, work_order = ?, challan_no = ? WHERE asset_id = ?',
        [branch_id, branch_name, group_id, desktop_name, configuration, tag_name, warranty, price, purchase_date, status, asset_get_by, serial_number, sub_branch, OS, RAM, Storage, work_order, challan_no, id]
    );

    // If the status changes to Active, decrement stock_in_hand
    if (status === 'Active' && currentStatus !== 'Active') {
        await groupModel.decrementStockInHand(group_id, 1);
    }

    // If the status changes from Active to InActive or Faulty, increment stock_in_hand (optional, if you want to track available stock)
    if (currentStatus === 'Active' && status !== 'Active') {
        await groupModel.incrementStockInHand(group_id, 1);
    }

    if (status === 'InActive' && currentStatus !== 'InActive') {
        await groupModel.decrementStockInHand(group_id, 1);
    }

    if (currentStatus === 'InActive' && status !== 'InActive') {
        await groupModel.incrementStockInHand(group_id, 1);
    }

    if (status === 'Faulty' && currentStatus !== 'Faulty') {
        await groupModel.decrementStockInHand(group_id, 1);
    }

    if (currentStatus === 'Faulty' && status !== 'Faulty') {
        await groupModel.incrementStockInHand(group_id, 1);
    }
};

const deleteAsset = async (id) => {
    await pool.execute('DELETE FROM asset WHERE asset_id = ?', [id]);
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

const getAssetsByBranchAndSubBranch = async (branchId, subBranch) => {
    const [rows] = await pool.query(`
        SELECT a.*, b.branch_name, g.group_name
        FROM asset a
        JOIN branch b ON a.branch_id = b.branch_id
        JOIN \`group\` g ON a.group_id = g.group_id
        WHERE a.branch_id = ? AND a.sub_branch = ?
    `, [branchId, subBranch]);
    return rows;
};

module.exports = {
    getAllAssets,
    getAssetById,
    getAssetsByBranchId,
    getAssetsByBranchAndGroup,
    getAssetsByGroupId,
    getAssetsByBranchGroupAndSubBranch,
    createAsset,
    updateAsset,
    deleteAsset,
    getAssetCountByBranch,
    getAssetCountByBranchAndGroup,
    getAssetsByBranchAndSubBranch
};

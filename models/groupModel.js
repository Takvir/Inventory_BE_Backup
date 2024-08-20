const pool = require('../db/pool');

const getAllGroups = async () => {
    const [rows] = await pool.query('SELECT * FROM `group`');
    return rows;
};

const getGroupById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM `group` WHERE group_id = ?', [id]);
    return rows[0];
};

const createGroup = async (group) => {
    const { group_id, group_name, stock_in_hand, user_group } = group;
    const [result] = await pool.execute(
        'INSERT INTO `group` (group_id, group_name, stock_in_hand, user_group) VALUES (?, ?, ?, ?)',
        [group_id, group_name, stock_in_hand, user_group]
    );
    return { id: result.insertId, ...group };
};

const updateGroup = async (id, group) => {
    const { group_name, stock_in_hand, user_group } = group;
    await pool.execute(
        'UPDATE `group` SET group_name = ?, stock_in_hand = ?, user_group = ? WHERE group_id = ?',
        [group_name, stock_in_hand, user_group, id]
    );
};

const deleteGroup = async (id) => {
    await pool.execute('DELETE FROM `group` WHERE group_id = ?', [id]);
};

const decrementStockInHand = async (groupId, quantity) => {
    await pool.execute('UPDATE `group` SET stock_in_hand = stock_in_hand - ? WHERE group_id = ?', [quantity, groupId]);
};

module.exports = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    decrementStockInHand
};

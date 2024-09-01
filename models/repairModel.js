const pool = require('../db/pool');

const getAllRepairs = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT r.*, 
                   a.desktop_name, 
                   a.serial_number, 
                   a.configuration, 
                   a.tag_name, 
                   a.branch_name, 
                   a.branch_id, 
                   a.purchase_date, 
                   g.group_id, 
                   g.group_name
            FROM repair r
            JOIN asset a ON r.asset_id = a.asset_id
            LEFT JOIN \`group\` g ON a.group_id = g.group_id
        `);
        return rows;
    } catch (error) {
        console.error('Error fetching repairs:', error);
        throw error;
    }
};



const getRepairById = async (id) => {
    const [rows] = await pool.query(`
        SELECT r.*, a.desktop_name, a.serial_number 
        FROM repair r
        JOIN asset a ON r.asset_id = a.asset_id
        WHERE r.repair_id = ?
    `, [id]);
    return rows[0];
};

const getRepairsByAssetId = async (assetId) => {
    const [rows] = await pool.query(`
        SELECT r.*, a.desktop_name, a.serial_number , a.configuration , a.tag_name , a.branch_name
        FROM repair r
        JOIN asset a ON r.asset_id = a.asset_id
        WHERE r.asset_id = ?
    `, [assetId]);
    return rows;
};

const createRepair = async (repair) => {
    const { repair_id, asset_id, repair_date, repair_cost, repair_status, repair_notes } = repair;
    const [result] = await pool.execute(
        'INSERT INTO repair (repair_id, asset_id, repair_date, repair_cost, repair_status, repair_notes) VALUES (?, ?, ?, ?, ?, ?)',
        [repair_id, asset_id, repair_date, repair_cost, repair_status, repair_notes]
    );
    return { id: repair_id, ...repair };
};

const updateRepair = async (id, repair) => {
    const { repair_date, repair_cost, repair_status, repair_notes } = repair;
    await pool.execute(
        'UPDATE repair SET repair_date = ?, repair_cost = ?, repair_status = ?, repair_notes = ?, updated_at = NOW() WHERE repair_id = ?',
        [repair_date, repair_cost, repair_status, repair_notes, id]
    );
};

const deleteRepair = async (id) => {
    await pool.execute('DELETE FROM repair WHERE repair_id = ?', [id]);
};

module.exports = {
    getAllRepairs,
    getRepairById,
    getRepairsByAssetId,
    createRepair,
    updateRepair,
    deleteRepair
};

const express = require('express');
const cors = require('cors');
const branchRoutes = require('./routes/branch');
const groupRoutes = require('./routes/group');
const assetRoutes = require('./routes/asset');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/branches', branchRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/assets', assetRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

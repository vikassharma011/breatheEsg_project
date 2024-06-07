import React from 'react';
import { Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Paper, Chip, Grid, Avatar, Select, MenuItem } from '@mui/material';

const data = [
  { title: 'Assessment 1', type: 'BRSR', suppliers: 20, score: '-', risk: 'Medium', status: 'PENDING', result: '-' },
  { title: 'Assessment 2', type: 'BRSR', suppliers: 25, score: 98, risk: 'Low', status: 'COMPLETE', result: 'View' },
  { title: 'Assessment 3', type: 'BRSR', suppliers: 35, score: 22, risk: 'High', status: 'COMPLETE', result: 'View' },
  { title: 'Assessment 3', type: 'Custom', suppliers: 49, score: 23, risk: 'Medium', status: 'COMPLETE', result: 'View' },
  { title: 'Assessment 3', type: 'Custom', suppliers: 100, score: 42, risk: 'Medium', status: 'COMPLETE', result: 'View' },
];

const getStatusChip = (status) => {
  switch (status) {
    case 'PENDING':
      return <Chip label="PENDING" color="warning" />;
    case 'COMPLETE':
      return <Chip label="COMPLETE" color="success" />;
    default:
      return <Chip label={status} />;
  }
};

const getRiskChip = (risk) => {
  switch (risk) {
    case 'Low':
      return <Chip label="Low" color="success" />;
    case 'Medium':
      return <Chip label="Medium" color="warning" />;
    case 'High':
      return <Chip label="High" color="error" />;
    default:
      return <Chip label={risk} />;
  }
};

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Avatar alt="John Doe" src="/path/to/profile.jpg" />
        </Grid>
        <Grid item xs={12}>
        {/*  */}
          <Grid container justifyContent="flex-end" alignItems="center">
            <Select defaultValue="FY 2023-24" sx={{ mr: 2 }}>
              <MenuItem value="FY 2023-24">FY 2023-24</MenuItem>
              <MenuItem value="FY 2022-23">FY 2022-23</MenuItem>
            </Select>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
              Submit for Approval
            </Button>
            <Avatar alt="John Doe" src="/path/to/profile.jpg" />
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
  <TableContainer component={Paper} sx={{ maxHeight: 400, overflowX: 'auto' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><Checkbox /></TableCell>
          <TableCell>Assessment Title</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>No. of Suppliers</TableCell>
          <TableCell>Score</TableCell>
          <TableCell>Risk Classification</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Result</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell><Checkbox /></TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.suppliers}</TableCell>
            <TableCell>{row.score}</TableCell>
            <TableCell>{getRiskChip(row.risk)}</TableCell>
            <TableCell>{getStatusChip(row.status)}</TableCell>
            <TableCell>
              {row.result === 'View' ? <Button variant="contained" color="primary" size="small">View</Button> : row.result}
            </TableCell>
            <TableCell>
              <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>Share</Button>
              <Button variant="contained" color="secondary" size="small">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Box>

    </Box>
  );
};

export default Dashboard;

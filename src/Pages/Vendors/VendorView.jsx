import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TablePagination,
} from "@mui/material";
const visitorsData = [
  {
    name: "Mohan Bandgar",
    visitDate: "2/15/2025",
    state: "Sangli Miraj Kupwad",
    city: "Sangli Miraj Kupwad",
    email: "bandgarmohan87@gmail.com",
    mobileNo: "",
  },
  {
    name: "Sagar Babar",
    visitDate: "4/19/2025",
    state: "Solapur",
    city: "Solapur",
    email: "sagarbabar.sb@gmail.com",
    mobileNo: "+919340682708",
  },
  // Add more data as needed
];

const VendorView = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filteredVisitors, setFilteredVisitors] = useState(visitorsData);

  // Handle search change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Filter visitors based on search query
    const filtered = visitorsData.filter(
      (visitor) =>
        visitor.name.toLowerCase().includes(value.toLowerCase()) ||
        visitor.email.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredVisitors(filtered);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={2}>
      {/* Back Button */}
      <Button variant="outlined" size="small">
        ← Back
      </Button>

      {/* Business Info */}
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={8}>
          <Typography variant="subtitle2">Business Name: abc</Typography>
          <Typography variant="body2">Phone: +919876543210</Typography>
          <Typography variant="body2">
            End Date: 15/05/2025 1:00:54 PM
          </Typography>
          <Typography variant="body2">Subscription Days: 89</Typography>
          <Typography variant="body2">Vendor Status: Active</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2">Category: Events Decoration</Typography>
          <Typography variant="body2">
            Language: English, Marathi, Konkani
          </Typography>
          <Typography variant="body2">
            Sub Categories: Wedding, Birthday, Baby Shower, Naming, Anniversary,
            Fabrication
          </Typography>
          <Typography variant="body2">
            Start Date: 15/02/2025 1:00:54 PM
          </Typography>
          <Typography variant="body2">
            Location: Pune, Maharashtra, 411046
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <img
            src="https://via.placeholder.com/80"
            alt="Main"
            style={{ borderRadius: 4 }}
          />
        </Grid>
      </Grid>

      {/* Not Available Dates */}
      <Card sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Not Available Dates
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>NaN/NaN/NaN</TableCell>
              <TableCell>{`[object Object]`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Social Media Links */}
      <Card sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Social Media Links
        </Typography>
        <Typography variant="body2">[Links go here]</Typography>
      </Card>

      {/* Albums */}
      <Card sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Albums
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Total Images</TableCell>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>No data</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Products */}
      <Card sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Products
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4}>No data</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Profile Visitors */}
      <Card sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Profile Visitors
        </Typography>

        {/* Search & Pagination Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="body2">Show {rowsPerPage} entries</Typography>
          <TextField
            variant="standard"
            size="small"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Visit Date</TableCell>
              <TableCell>State</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVisitors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((visitor, index) => (
                <TableRow key={index}>
                  <TableCell>{visitor.name}</TableCell>
                  <TableCell>{visitor.visitDate}</TableCell>
                  <TableCell>{visitor.state}</TableCell>
                  <TableCell>{visitor.city}</TableCell>
                  <TableCell>{visitor.email}</TableCell>
                  <TableCell>{visitor.mobileNo}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredVisitors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Block Button */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="error">
          Block
        </Button>
      </Box>
    </Box>
  );
};

export default VendorView;

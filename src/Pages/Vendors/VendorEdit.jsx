import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { mockVendors } from "../../const/form";

const VendorEdit = ({ vendorData }) => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const productsData = mockVendors.find((val) => val.id === vendorData);
  console.log(productsData, "productsData");
  const filteredData = productsData.products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={2}>
      {/* Business Info */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography>
            <b>Business Name:</b> {productsData.name}
          </Typography>
          <Typography>
            <b>Phone:</b> {productsData.mobile}
          </Typography>
          <Typography>
            <b>End Date:</b> {productsData.endDate}
          </Typography>
          <Typography>
            <b>Location:</b> {productsData.location}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <b>Category:</b> {productsData.category}
          </Typography>
          <Typography>
            <b>Languages:</b> {productsData.language}
          </Typography>
          <Typography>
            <b>Start Date:</b> {productsData.startDate}
          </Typography>
          <Typography>
            <b>Sub Categories:</b> {productsData.subCategory}
          </Typography>
          <Card sx={{ width: 100, height: 100, mt: 1 }}>
            <CardMedia
              image={productsData.image}
              component="img"
              alt="Main Image"
            />
          </Card>
        </Grid>
      </Grid>

      {/* Calendar */}
      <Box mt={4}>
        <Typography variant="h6">Calendar</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{productsData.startDate}</TableCell>
                <TableCell>Another event</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Albums */}
      <Box mt={4}>
        <Typography variant="h6">Albums</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Open</TableCell>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <img src="https://via.placeholder.com/80" alt="Album" />
                </TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>Sample Album</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Products with Search + Pagination */}
      <Box mt={4}>
        <Typography variant="h6">Products</Typography>
        <Box display="flex" justifyContent="flex-end" mb={1}>
          <TextField
            size="small"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <img src={row.image} alt="Product" width="60" />
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>

      {/* Accept / Reject Buttons */}
      <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
        <Button variant="contained" color="success">
          Accept
        </Button>
        <Button variant="contained" color="error">
          Reject
        </Button>
      </Box>
    </Box>
  );
};

export default VendorEdit;
VendorEdit.propTypes = {
  vendorData: PropTypes.object,
};

import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
  TextField,
  TableContainer,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import BlockModal from "./BlockModal";
import { mockVendors } from "../../const/form";
// import { useNavigate } from "react-router-dom";

const VendorTable = ({ setVendorData, setFeature }) => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [blockVendorId, setBlockVendorId] = useState(null);

  // const navigate = useNavigate();

  const filtered = mockVendors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleBlock = (id) => {
    setBlockVendorId(id);
    setModalOpen(true);
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        <h2>Vendors</h2>
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 10, float: "right" }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Name",
                  "Category",
                  "Sub Category",
                  "Mobile",
                  "Package Price",
                  "Starting From",
                  "Language",
                  "Location",
                  "Profile Icon",
                  "Status",
                  "Action",
                ].map((h, i) => (
                  <TableCell
                    key={i}
                    style={{
                      fontWeight: "bold",
                      background: "#4e47a2",
                      color: "#fff",
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.category}</TableCell>
                    <TableCell>{vendor.subCategory}</TableCell>
                    <TableCell>{vendor.mobile}</TableCell>
                    <TableCell>{vendor.price}</TableCell>
                    <TableCell>{vendor.startingFrom}</TableCell>
                    <TableCell>{vendor.language}</TableCell>
                    <TableCell>{vendor.location}</TableCell>
                    <TableCell>
                      <img src={vendor.image} alt="Profile" width={40} />
                    </TableCell>
                    <TableCell>{vendor.status}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setVendorData(vendor.id), setFeature("viewVendor");
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => handleBlock(vendor.id)}>
                        <BlockIcon color="error" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setVendorData(vendor.id), setFeature("vendorEdit");
                        }}
                      >
                        <EditIcon color="primary" />
                      </IconButton>

                      {/* <IconButton ><VisibilityIcon /></IconButton>
                  <IconButton onClick={() => handleBlock(vendor.id)}><BlockIcon color="error" /></IconButton>
                  <IconButton ><EditIcon color="primary" /></IconButton> */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </TableContainer>
      </div>
      <BlockModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        vendorId={blockVendorId}
      />
    </>
  );
};

export default VendorTable;
VendorTable.propTypes = {
  setVendorData: PropTypes.func,
  setFeature: PropTypes.func,
};

import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TablePagination,
} from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";

// const initialData = [
//   {
//     name: 'Decoration Product',
//     fields: [
//       { title: 'Decoration Product Name', placeholder: 'Product Description', type: 'Text Field' },
//     ],
//     open: true,
//   },
//   {
//     name: 'Events Planner',
//     fields: [
//       { title: 'Oja', placeholder: 'Ott', type: 'Text Field' },
//       { title: 'Monopoly', placeholder: 'Enter Your Monopoly', type: 'Text Field' },
//     ],
//     open: true,
//   },
//   {
//     name: 'Decoration Product',
//     fields: [
//       { title: 'Decoration Product Name', placeholder: 'Product Description', type: 'Text Field' },
//     ],
//     open: true,
//   },
//   {
//     name: 'Events Planner',
//     fields: [
//       { title: 'Oja', placeholder: 'Ott', type: 'Text Field' },
//       { title: 'Monopoly', placeholder: 'Enter Your Monopoly', type: 'Text Field' },
//     ],
//     open: true,
//   },
//   {
//     name: 'Decoration Product',
//     fields: [
//       { title: 'Decoration Product Name', placeholder: 'Product Description', type: 'Text Field' },
//     ],
//     open: true,
//   },
//   {
//     name: 'Events Planner',
//     fields: [
//       { title: 'Oja', placeholder: 'Ott', type: 'Text Field' },
//       { title: 'Monopoly', placeholder: 'Enter Your Monopoly', type: 'Text Field' },
//     ],
//     open: true,
//   },

// ];

export default function CategoryTable({ formData }) {
  const [categories, setCategories] = useState(formData?.tableBody);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleToggle = (index) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated[index].open = !updated[index].open;
      return updated;
    });
  };

  const handleDeleteField = (catIndex, fieldIndex) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated[catIndex].fields.splice(fieldIndex, 1);

      // If no fields left, remove the category
      if (updated[catIndex].fields.length === 0) {
        updated.splice(catIndex, 1);
      }
      return updated;
    });
  };

  const openEditModal = (catIndex, field = null, fieldIndex = null) => {
    setSelectedCategoryIndex(catIndex);
    setEditingField(
      field
        ? { ...field, fieldIndex }
        : { title: "", placeholder: "", type: "Text Field" },
    );
    setModalOpen(true);
  };

  const handleSave = () => {
    setCategories((prev) => {
      const updated = [...prev];
      const fields = [...updated[selectedCategoryIndex].fields];
      if (editingField.fieldIndex != null) {
        fields[editingField.fieldIndex] = editingField;
      } else {
        fields.push(editingField);
      }
      updated[selectedCategoryIndex].fields = fields;
      return updated;
    });
    setModalOpen(false);
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.fields.some(
        (f) =>
          f.title.toLowerCase().includes(search.toLowerCase()) ||
          f.placeholder.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0); // Reset to the first page
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          size="small"
          variant="outlined"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={() => openEditModal(0)}>
          Add Field
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#5b54a6" }}>
              {formData.tableHead?.map((val, index) => (
                <TableCell sx={{ color: "white" }} key={index}>
                  {val?.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cat, catIndex) => (
                <React.Fragment key={cat.name}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleToggle(catIndex)}
                      >
                        {cat.open ? <IoIosArrowUp /> : <IoIosArrowUp />}
                      </IconButton>
                      {cat.name}
                    </TableCell>
                    <TableCell colSpan={4}></TableCell>
                  </TableRow>
                  {cat.open &&
                    cat.fields.map((field, fieldIndex) => (
                      <TableRow key={fieldIndex}>
                        <TableCell></TableCell>
                        <TableCell>{field.title}</TableCell>
                        <TableCell>{field.placeholder}</TableCell>
                        <TableCell>{field.type}</TableCell>
                        <TableCell>
                          <IconButton
                            color="info"
                            onClick={() =>
                              openEditModal(catIndex, field, fieldIndex)
                            }
                            sx={{ mr: 1 }}
                          >
                            <MdEdit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() =>
                              handleDeleteField(catIndex, fieldIndex)
                            }
                          >
                            <MdDelete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCategories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          {editingField?.fieldIndex != null ? "Edit" : "Add"} Field
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategoryIndex || ""}
              onChange={(e) => setSelectedCategoryIndex(e.target.value)}
              label="Category"
            >
              {categories.map((cat, index) => (
                <MenuItem key={index} value={index}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={editingField?.title || ""}
            onChange={(e) =>
              setEditingField((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Placeholder"
            fullWidth
            value={editingField?.placeholder || ""}
            onChange={(e) =>
              setEditingField((prev) => ({
                ...prev,
                placeholder: e.target.value,
              }))
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              value={editingField?.type || ""}
              label="Type"
              onChange={(e) =>
                setEditingField((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <MenuItem value="Text Field">Text Field</MenuItem>
              <MenuItem value="Number">Number</MenuItem>
              <MenuItem value="Date">Date</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
CategoryTable.propTypes = {
  formData: PropTypes.object,
};

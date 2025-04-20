import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Avatar, TextField, Box, FormControl, InputLabel,
  Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton
} from "@mui/material";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { enqueueSnackbar } from "notistack";

const initialCards = [
  {
    id: 1,
    image: "https://via.placeholder.com/50",
    name: "Royal Wedding Card A",
    price: "500",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/50",
    name: "Traditional Wedding Card B",
    price: "750",
  },
];

const WeddingCard = () => {
  const [data, setData] = useState(initialCards);
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ image: "", name: "", price: "" });
  const [editId, setEditId] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const handleOpen = () => {
    setEditId(null);
    setForm({ image: "", name: "", price: "" });
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ image: "", name: "", price: "" });
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (editId !== null) {
      setData((prev) =>
        prev.map((item) => (item.id === editId ? { ...form, id: editId } : item))
      );
      enqueueSnackbar("Card updated successfully", { variant: "success" });
    } else {
      const newItem = { ...form, id: Date.now() };
      setData((prev) => [newItem, ...prev]);
      enqueueSnackbar("New card added", { variant: "success" });
    }
    handleClose();
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this card?");
    if (confirm) {
      setData((prev) => prev.filter((item) => item.id !== id));
      enqueueSnackbar("Card deleted successfully", { variant: "success" });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [entries, searchTerm]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  const filteredDataRaw = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price.toString().includes(searchTerm)
  );

  const sortedData = [...filteredDataRaw].sort((a, b) => {
    if (sortConfig.key === "name") {
      return sortConfig.direction === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortConfig.key === "price") {
      return sortConfig.direction === "asc"
        ? parseFloat(a.price) - parseFloat(b.price)
        : parseFloat(b.price) - parseFloat(a.price);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const filteredData = sortedData.slice(startIndex, startIndex + entries);

  return (
    <div style={{ padding: "20px", marginBottom: "4px", marginTop: "4px" }}>
      <h2 className="font-bold py-2">Wedding Cards</h2>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Entries</InputLabel>
          <Select
            value={entries}
            label="Entries"
            onChange={(e) => {
              const selected = Number(e.target.value);
              setEntries(selected);
              enqueueSnackbar(`Entries updated to: ${selected}`, { variant: "info" });
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleOpen}>Add</Button>
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#e3f2fd' }}>Preview Image</TableCell>
              <TableCell sx={{ backgroundColor: '#e3f2fd' }}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  Card Name
                  <IconButton
                    onClick={() => handleSort("price")}
                    sx={{ padding: '2px', fontSize: '16px' }}
                    size="small"
                  >
                    {sortConfig.key === "price" && sortConfig.direction === "asc" ? (
                      <MdArrowUpward fontSize="inherit" />
                    ) : (
                      <MdArrowDownward fontSize="inherit" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#e3f2fd' }} >
                <Box display="flex" alignItems="center" gap={0.5}>
                  Card Price
                  <IconButton
                    onClick={() => handleSort("name")}
                    sx={{ padding: '2px', fontSize: '16px' }}
                    size="small"
                  >
                    {sortConfig.key === "name" && sortConfig.direction === "asc" ? (
                      <MdArrowUpward fontSize="inherit" />
                    ) : (
                      <MdArrowDownward fontSize="inherit" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#e3f2fd' }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell><Avatar variant="rounded" src={item.image} alt={item.name} /></TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" size="small" sx={{ mr: 1 }} onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No matching records found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={2}>
        <Button
          variant="contained"
          size="small"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          variant="contained"
          size="small"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>{editId ? "Edit Wedding Card" : "Add New Wedding Card"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Button
              variant="outlined"
              component="label"
              sx={{ '&:hover': { backgroundColor: '#e0f0ff' } }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
                  }
                }}
              />
            </Button>

            <TextField
              label="Card Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Card Price"
              name="price"
              value={form.price}
              onChange={handleChange}
              type="number"
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WeddingCard;

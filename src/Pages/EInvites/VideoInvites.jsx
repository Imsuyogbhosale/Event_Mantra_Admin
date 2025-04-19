import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Avatar, TextField, Box, FormControl, InputLabel,
  Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";

const initialData = [
  {
    id: 1,
    image: "https://via.placeholder.com/50",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    name: "Wedding Invite A",
    price: "1500",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/50",
    video: "https://www.w3schools.com/html/movie.mp4",
    name: "Engagement Invite B",
    price: "2000",
  },
];

const VideoInvites = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(5);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ image: "", video: "", name: "", price: "" });
  const [editId, setEditId] = useState(null);

  const handleOpen = () => {
    setEditId(null); // Add mode
    setForm({ image: "", video: "", name: "", price: "" });
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ image: "", video: "", name: "", price: "" });
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
    } else {
      const newItem = { ...form, id: Date.now() };
      setData((prev) => [newItem, ...prev]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (confirm) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const filteredData = data
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.price.toString().includes(searchTerm)
    )
    .slice(0, entries);

  return (
    <div style={{ padding: "20px", marginBottom: "4px", marginTop: "4px" }}>
      <h2 className="font-bold py-2">Video Invites</h2>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Entries</InputLabel>
          <Select
            value={entries}
            label="Entries"
            onChange={(e) => setEntries(Number(e.target.value))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Add
        </Button>

        <TextField
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
              <TableCell>Preview Image</TableCell>
              <TableCell>Video</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price (INR)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Avatar variant="rounded" src={item.image} alt={item.name} />
                  </TableCell>
                  <TableCell>
                    <video width="100" controls>
                      <source src={item.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No matching records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Box */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>{editId ? "Edit Video Invite" : "Add New Video Invite"}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "60%", display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Button
              variant="outlined"
              component="label"
              sx={{
                '&:hover': {
                  backgroundColor: '#e0f0ff',
                },
              }}
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

            <Button
              variant="outlined"
              component="label"
              sx={{
                '&:hover': {
                  backgroundColor: '#e0f0ff',
                },
              }}
            >
              Upload Video
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm((prev) => ({ ...prev, video: URL.createObjectURL(file) }));
                  }
                }}
              />
            </Button>

            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              inputProps={{ style: { textAlign: 'center' } }}
            />
            <TextField
              label="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
              type="number"
              fullWidth
              inputProps={{ style: { textAlign: 'center' } }}
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

export default VideoInvites;

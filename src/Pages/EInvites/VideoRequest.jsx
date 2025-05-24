import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { enqueueSnackbar } from "notistack";

const initialCards = [
  {
    id: 1,
    image: "https://via.placeholder.com/50",
    name: "Royal Wedding Card A",
    video: "https://via.placeholder.com/150", // Placeholder for video preview
    mobile: "9876543210",
    orderDate: "2023-04-18",
    status: "Delivered",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/50",
    name: "Traditional Wedding Card B",
    video: "https://via.placeholder.com/150", // Placeholder for video preview
    mobile: "9123456780",
    orderDate: "2023-04-19",
    status: "Pending",
  },
];

const VideoRequest = () => {
  const [data, setData] = useState(initialCards);
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    image: "",
    name: "",
    video: "",
    mobile: "",
    orderDate: "",
    status: "",
  });
  const [editId, setEditId] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const handleOpen = () => {
    setEditId(null);
    setForm({
      image: "",
      name: "",
      video: "",
      mobile: "",
      orderDate: "",
      status: "",
    });
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      image: "",
      name: "",
      video: "",
      mobile: "",
      orderDate: "",
      status: "",
    });
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...form, id: editId } : item,
        ),
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
    const confirm = window.confirm(
      "Are you sure you want to delete this card?",
    );
    if (confirm) {
      setData((prev) => prev.filter((item) => item.id !== id));
      enqueueSnackbar("Card deleted successfully", { variant: "success" });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [entries, searchTerm]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      } else {
        return { key, direction: "asc" };
      }
    });
  };

  const filteredDataRaw = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile.includes(searchTerm) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedData = [...filteredDataRaw].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const { key, direction } = sortConfig;

    let aVal = a[key];
    let bVal = b[key];

    if (key === "orderDate") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    if (typeof aVal === "string" && typeof bVal === "string") {
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    if (aVal instanceof Date && bVal instanceof Date) {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const filteredData = sortedData.slice(startIndex, startIndex + entries);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div style={{ padding: "20px", marginBottom: "4px", marginTop: "4px" }}>
      <h2 className="font-bold py-2">Video Requests</h2>

      <Box
        display="flex"
        justifyContent="space-between"
        gap={2}
        alignItems="center"
        mb={2}
      >
        <Box display="flex" gap={2}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Entries</InputLabel>
            <Select
              value={entries}
              label="Entries"
              onChange={(e) => {
                const selected = Number(e.target.value);
                setEntries(selected);
                enqueueSnackbar(`Entries updated to: ${selected}`, {
                  variant: "info",
                });
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add
          </Button>
        </Box>
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
              <TableCell sx={{ backgroundColor: "#e3f2fd" }}>
                Thumbnail
              </TableCell>
              <TableCell sx={{ backgroundColor: "#e3f2fd" }}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  Name
                  <IconButton
                    onClick={() => handleSort("name")}
                    sx={{ padding: "2px", fontSize: "16px" }}
                    size="small"
                  >
                    {sortConfig.key === "name" ? (
                      sortConfig.direction === "asc" ? (
                        <MdArrowUpward fontSize="inherit" />
                      ) : (
                        <MdArrowDownward fontSize="inherit" />
                      )
                    ) : (
                      <MdArrowDownward
                        fontSize="inherit"
                        style={{ opacity: 0.3 }}
                      />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: "#e3f2fd" }}>Video</TableCell>
              <TableCell sx={{ backgroundColor: "#e3f2fd" }}>Mobile</TableCell>
              <TableCell sx={{ backgroundColor: "#e3f2fd" }}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  Order Date
                  <IconButton
                    onClick={() => handleSort("orderDate")}
                    sx={{ padding: "2px", fontSize: "16px" }}
                    size="small"
                  >
                    {sortConfig.key === "orderDate" ? (
                      sortConfig.direction === "asc" ? (
                        <MdArrowUpward fontSize="inherit" />
                      ) : (
                        <MdArrowDownward fontSize="inherit" />
                      )
                    ) : (
                      <MdArrowDownward
                        fontSize="inherit"
                        style={{ opacity: 0.3 }}
                      />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ backgroundColor: "#e3f2fd" }}>Status</TableCell>
              <TableCell sx={{ backgroundColor: "#e3f2fd" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={item.image}
                      alt={item.name}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <a
                      href={item.video}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch
                    </a>
                  </TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.orderDate}</TableCell>
                  <TableCell>{item.status}</TableCell>
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
                <TableCell colSpan={7} align="center">
                  No matching records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
        gap={1}
        flexWrap="wrap"
      >
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i + 1}
            variant={i + 1 === currentPage ? "contained" : "outlined"}
            size="small"
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)", borderRadius: 2 },
        }}
      >
        <DialogTitle>
          {editId ? "Edit Video Request" : "Add New Video Request"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Button
              variant="outlined"
              component="label"
              sx={{ "&:hover": { backgroundColor: "#e0f0ff" } }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm((prev) => ({
                      ...prev,
                      image: URL.createObjectURL(file),
                    }));
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

            {/* New field for video file upload */}
            <Button
              variant="outlined"
              component="label"
              sx={{ "&:hover": { backgroundColor: "#e0f0ff" } }}
            >
              Upload Video
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm((prev) => ({
                      ...prev,
                      video: URL.createObjectURL(file),
                    }));
                  }
                }}
              />
            </Button>
            {form.video && (
              <Box mt={2}>
                <video width="200" controls>
                  <source src={form.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            )}
            <TextField
              label="Mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Order Date"
              name="orderDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.orderDate}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VideoRequest;

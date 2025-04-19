import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TablePagination, TextField, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Button, Input, Box
} from '@mui/material';
import { MdEdit, MdDelete } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";

const initialData = [
  {
    icon: 'https://via.placeholder.com/50x50?text=Event',
    category: 'Events Decoration',
    subCategory: 'Fabrication Decoration || Wedding Decoration || Birthday Decoration || Baby shower Decoration || Naming ceremony Decoration || Anniversary Decoration',
  },
  {
    icon: 'https://via.placeholder.com/50x50?text=Light',
    category: 'Lights',
    subCategory: 'Disco light || Frey light || Crystal light || laser lights || Rood show light',
  },
  {
    icon: 'https://via.placeholder.com/50x50?text=Product',
    category: 'Decoration Product',
    subCategory: 'Chair/ vip chair || Table / Rounded table || Sofa / vip sofa',
  },
  {
    icon: 'https://via.placeholder.com/50x50?text=Oracle',
    category: 'Decor',
    subCategory: 'Clean',
  },
  {
    icon: 'https://via.placeholder.com/50x50?text=Hall',
    category: 'Halls',
    subCategory: 'Disconnection wedding || Pre Wedding shoot location || 4/5/7 star hotel hall || Banquet halls || Small function hall AC / non - AC',
  },
  {
    icon: 'https://via.placeholder.com/50x50?text=Event',
    category: 'Events Decoration',
    subCategory: 'Fabrication Decoration || Wedding Decoration || Birthday Decoration || Baby shower Decoration || Naming ceremony Decoration || Anniversary Decoration',
  },
  {
    icon: 'https://via.placeholder.com/50x50?text=Light',
    category: 'Lights',
    subCategory: 'Disco light || Frey light || Crystal light || laser lights || Rood show light',
  },
  {
    icon: 'https://via.placeholder.com/50x50?text=Product',
    category: 'Decoration Product',
    subCategory: 'Chair/ vip chair || Table / Rounded table || Sofa / vip sofa',
  },
  {
    icon: 'https://via.placeholder.com/50x50?text=Oracle',
    category: 'Decor',
    subCategory: 'Clean',
  },
  {
    icon: 'https://via.placeholder.com/50x50?text=Hall',
    category: 'Halls',
    subCategory: 'Disconnection wedding || Pre Wedding shoot location || 4/5/7 star hotel hall || Banquet halls || Small function hall AC / non - AC',
  },
];

const CategoryTable = () => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedRow, setSelectedRow] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openMoveUp, setOpenMoveUp] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [newPosition, setNewPosition] = useState('');

  const [newCategory, setNewCategory] = useState({
    icon: '',
    category: '',
    subCategory: '',
  });

  const filteredData = data.filter(item =>
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setNewPosition('');
    setOpenEdit(true);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDelete(true);
  };

  const handleMoveUpClick = (row) => {
    setSelectedRow(row);
    setOpenMoveUp(true);
  };

  const handleUpdatePosition = () => {
    const updated = [...data];
    const oldIndex = data.indexOf(selectedRow);
    const newIndex = parseInt(newPosition) - 1;
    if (newIndex >= 0 && newIndex < data.length) {
      updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, selectedRow);
      setData(updated);
    }
    setOpenEdit(false);
  };

  const handleConfirmDelete = () => {
    setData(data.filter(item => item !== selectedRow));
    setOpenDelete(false);
  };

  const handleConfirmMoveUp = () => {
    const idx = data.indexOf(selectedRow);
    if (idx > 0) {
      const updated = [...data];
      [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
      setData(updated);
    }
    setOpenMoveUp(false);
  };

  const handleAddNewCategory = () => {
    if (newCategory.category && newCategory.subCategory) {
      setData([{ ...newCategory, icon: URL.createObjectURL(newCategory.icon) }, ...data]);
      setOpenAdd(false);
      setNewCategory({ icon: '', category: '', subCategory: '' });
    }
  };

  return (
    <>
      {/* Top Controls */}
      <Box className="flex justify-between items-center mb-4" sx={{ mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add Category
        </Button>
      </Box>

      {/* Table Content */}
      <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#5b54a6'}}>
                <TableCell ><strong>Icon</strong></TableCell>
                <TableCell ><strong>Category</strong></TableCell>
                <TableCell ><strong>Sub Category</strong></TableCell>
                <TableCell ><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell><img src={row.icon} alt="icon" width={50} height={50} /></TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.subCategory}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditClick(row)}><MdEdit /></IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(row)}><MdDelete /></IconButton>
                    <IconButton color="info" onClick={() => handleMoveUpClick(row)}><IoIosArrowUp /></IconButton>
                  </TableCell>
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
      </Paper>

      {/* Edit Modal */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Category Position</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the position for <strong>{selectedRow?.category}</strong>
          </DialogContentText>
          <TextField
            label="New Position"
            type="number"
            fullWidth
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdatePosition}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{selectedRow?.category}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Move Up Modal */}
      <Dialog open={openMoveUp} onClose={() => setOpenMoveUp(false)}>
        <DialogTitle>Move Category Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Move <strong>{selectedRow?.category}</strong> one position up?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMoveUp(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmMoveUp}>Yes</Button>
        </DialogActions>
      </Dialog>

      {/* Add Category Modal */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <Input
            type="file"
            fullWidth
            required
            onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.files[0] })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Category"
            value={newCategory.category}
            onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Sub Category"
            value={newCategory.subCategory}
            onChange={(e) => setNewCategory({ ...newCategory, subCategory: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Close</Button>
          <Button variant="contained" onClick={handleAddNewCategory}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoryTable;

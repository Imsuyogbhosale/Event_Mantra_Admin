import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { FaSort } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const DataTable = ({
  data,
  column,
  showSearch = true,
  addButtonName,
  onClickAddButton = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState();
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedGroups, setExpandedGroups] = useState({});

  // detect shape
  const isGrouped =
    Array.isArray(data) && data[0] && Array.isArray(data[0].fields);

  // 1) Build a uniform "flat list" for search/sort/pagination
  const flatList = isGrouped
    ? data.flatMap((grp) =>
        grp.fields.map((f) => ({ ...f, category: grp.category })),
      )
    : data;

  // 2) Filter
  const filtered = flatList.filter((row) =>
    Object.values(row).some(
      (v) =>
        typeof v === "string" &&
        v.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  // 3) Sort
  const sorted = [...filtered].sort((a, b) => {
    if (!sortColumn) return 0;
    const A = a[sortColumn],
      B = b[sortColumn];
    if (typeof A === "number" && typeof B === "number") {
      return sortOrder === "asc" ? A - B : B - A;
    }
    if (typeof A === "string" && typeof B === "string") {
      return sortOrder === "asc" ? A.localeCompare(B) : B.localeCompare(A);
    }
    return 0;
  });

  // 4) Paginate (only used when not grouping)
  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // 5) Build groups (only if grouped)
  const groupedData = isGrouped
    ? sorted.reduce((acc, row) => {
        (acc[row.category] ||= []).push(row);
        return acc;
      }, {})
    : null;

  // handlers
  const handleSort = (key) => {
    if (sortColumn === key) setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    else {
      setSortColumn(key);
      setSortOrder("asc");
    }
  };
  const toggleGroup = (cat) =>
    setExpandedGroups((prev) => ({ ...prev, [cat]: !prev[cat] }));

  return (
    <Box p={2}>
      {/* ── Top Bar ── */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        {showSearch && (
          <TextField
            size="small"
            placeholder="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0);
            }}
            InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
            sx={{ width: 300 }}
          />
        )}
        {addButtonName && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onClickAddButton}
          >
            Add Field
          </Button>
        )}
      </Box>

      {/* ── Table ── */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#5b54a6" }}>
              {column.map((col) => (
                <TableCell
                  key={col.key}
                  onClick={() => col.sortTable && handleSort(col.key)}
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: col.sortTable ? "pointer" : "default",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    {col.label}
                    {col.sortTable && <FaSort style={{ marginLeft: 6 }} />}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isGrouped
              ? // ── grouped/accordion view ──
                Object.entries(groupedData).map(([category, rows], index) => (
                  <React.Fragment key={category}>
                    <TableRow
                      onClick={() => toggleGroup(category)}
                      sx={{ backgroundColor: "#f5f5f5", cursor: "pointer" }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell
                        colSpan={column.length}
                        sx={{ fontWeight: "bold", mr: 1 }}
                      >
                        <Typography component="span" sx={{ mr: 1 }}>
                          {expandedGroups[category] ? "▾" : "▸"}
                        </Typography>
                        {category}
                      </TableCell>
                    </TableRow>
                    {expandedGroups[category] &&
                      rows.map((row, i) => (
                        <TableRow key={i}>
                          {column.map((col) => (
                            <TableCell key={col.key}>{row[col.key]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                  </React.Fragment>
                ))
              : // ── flat/paginated view ──
                paginated.map((row, idx) => (
                  <TableRow key={idx}>
                    {column.map((col) => (
                      <TableCell key={col.key}>
                        {col.key === "actions" ? (
                          <>
                            <IconButton
                              size="small"
                              onClick={() => col.onEdit?.(row)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => col.onDelete?.(row)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </>
                        ) : (
                          row[col.key]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {/* ── Pagination ── */}
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Box>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
  column: PropTypes.array,
  addButtonName: PropTypes.string,
  onClickAddButton: PropTypes.func,
  showSearch: PropTypes.bool,
};

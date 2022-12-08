import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { BiNoEntry } from "react-icons/bi";
import HorizontalStack from "./util/HorizontalStack";

const SortBySelect = ({ onSortBy, sortBy, sorts }) => {
  return (
    <HorizontalStack spacing={1}>
      <Typography color="text.secondary" variant="subtitle2">
        Sort by:
      </Typography>
      <Select
        size="small"
        value={sortBy}
        sx={{ minWidth: 150 }}
        onChange={onSortBy}
      >
        {Object.keys(sorts).map((sortName) => (
          <MenuItem value={sorts[sortName]} key={sorts[sortName]}>
            {sortName}
          </MenuItem>
        ))}
      </Select>
    </HorizontalStack>
  );
};

export default SortBySelect;

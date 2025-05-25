import PropTypes from "prop-types";
import React from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  Chip,
  InputLabel,
  OutlinedInput,
  Autocomplete,
  Typography,
  Button,
} from "@mui/material";
import { useFormikContext } from "formik";

const ReusableFormField = ({ type, name, label, options = [], ...rest }) => {
  const { values, setFieldValue, touched, errors, handleBlur } =
    useFormikContext();

  const error = touched[name] && Boolean(errors[name]);
  const helperText = touched[name] && errors[name];

  switch (type) {
    case "text":
      return (
        <TextField
          fullWidth
          label={label}
          name={name}
          value={values[name]}
          onChange={(e) => setFieldValue(name, e.target.value)}
          onBlur={handleBlur}
          error={error}
          helperText={helperText}
          size="small"
          {...rest}
        />
      );

    case "file":
      return (
        <FormControl fullWidth>
          <input
            id={`${name}-upload`}
            name={name}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              setFieldValue(name, e.currentTarget.files[0]);
            }}
          />
          <Button
            variant="outlined"
            onClick={() => document.getElementById(`${name}-upload`).click()}
          >
            {label}
          </Button>
          {values[name] && (
            <Typography variant="body2" mt={1}>
              Selected File: {values[name].name}
            </Typography>
          )}
          {error && (
            <Typography color="error" variant="body2">
              {helperText}
            </Typography>
          )}
        </FormControl>
      );

    case "select":
      return (
        <FormControl fullWidth size="small" error={error}>
          <InputLabel>{label}</InputLabel>
          <Select
            name={name}
            value={values[name]}
            onChange={(e) => setFieldValue(name, e.target.value)}
            onBlur={handleBlur}
            input={<OutlinedInput label={label} />}
            {...rest}
          >
            {options.map((option) => (
              <MenuItem
                key={option.value || option}
                value={option.value || option}
              >
                {option.label || option}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="caption" color="error">
            {helperText}
          </Typography>
        </FormControl>
      );

    case "multiselect":
      return (
        <Autocomplete
          multiple
          size="small"
          options={options}
          value={values[name]}
          onChange={(e, val) => setFieldValue(name, val)}
          onBlur={handleBlur}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip key={option} label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={label}
              error={error}
              helperText={helperText}
            />
          )}
          {...rest}
        />
      );

    case "checkbox":
      return (
        <FormControl component="fieldset" error={error}>
          <FormLabel component="legend">{label}</FormLabel>
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.value || option}
                control={
                  <Checkbox
                    checked={values[name]?.includes(option.value || option)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const value = option.value || option;
                      const current = values[name] || [];
                      setFieldValue(
                        name,
                        checked
                          ? [...current, value]
                          : current.filter((v) => v !== value),
                      );
                    }}
                    name={name}
                  />
                }
                label={option.label || option}
              />
            ))}
          </FormGroup>
          <Typography variant="caption" color="error">
            {helperText}
          </Typography>
        </FormControl>
      );

    case "radio":
      return (
        <FormControl component="fieldset" error={error}>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            name={name}
            value={values[name]}
            onChange={(e) => setFieldValue(name, e.target.value)}
            onBlur={handleBlur}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value || option}
                value={option.value || option}
                control={<Radio />}
                label={option.label || option}
              />
            ))}
          </RadioGroup>
          <Typography variant="caption" color="error">
            {helperText}
          </Typography>
        </FormControl>
      );

    default:
      return null;
  }
};

export default ReusableFormField;

ReusableFormField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
};

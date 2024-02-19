import React from 'react';

function MultipleFileInput({ onChange }) {
  const handleChange = (event) => {
    const files = event.currentTarget.files;
    onChange(files);
  };

  return (
    <input
      type="file"
      onChange={handleChange}
      multiple  // Allow multiple file selection
    />
  );
}

export default MultipleFileInput;



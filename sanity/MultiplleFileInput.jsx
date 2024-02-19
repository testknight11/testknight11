
import {useCallback} from 'react'

function MultipleFileInput({ props}) {
  const {elementProps, onChange, value = ''} = props


  
  const handleChange = useCallback((event) => {
    const files = event.currentTarget.files;
    onChange(files);

	}, [onChange])


  return (
    <input
      type="file"
      onChange={handleChange}
      multiple  // Allow multiple file selection
    />
  );
}

export default MultipleFileInput;










// /components/MyCustomStringInput.jsx



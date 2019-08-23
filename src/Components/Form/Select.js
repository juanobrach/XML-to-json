import React from 'react';
import Select, { components } from 'react-select';


/*
* DropdDownIndicator
* Render custom select dropdown for each field
*/
const DropdownIndicator = (
  props
) => {
  return (
    <React.Fragment>
        <components.DropdownIndicator  className={'select-custom'} {...props}>
            <span className="select-custom-arrow"></span>
        </components.DropdownIndicator>
    </React.Fragment>
  );
};

export default ({options,
    field,
    form,
    value,
    handleChange}) => {
        console.log('form', form);
        console.log('field:', field)
    const customStyles = {
        control: (base, state) => ({
          ...base,
          background: "#ffff",
          // match with the menu
          borderRadius: 0,
          // Overwrittes the different states of border
          borderColor: 'gray',
          // Removes weird border around container
          boxShadow: null,
          "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "inherit" : "inherit"
          }
        }),
        menu: base => ({
          ...base,
          // override border radius to match the box
          borderRadius: 0,
          // beautify the word cut by adding a dash see https://caniuse.com/#search=hyphens for the compatibility
          hyphens: "auto",
          // kill the gap
          marginTop: 0,
          textAlign: "left",
          // prevent menu to scroll y
          wordWrap: "break-word"
        }),
        menuList: base => ({
          ...base,
          // kill the white space on first and last option
          padding: 0
        })
    }

    const handleSelectChange = (option) =>{
        form.setFieldValue(field.name, option.value)
        if(field.name === 'version'){
            form.setFieldValue('motor', null);          
            form.setFieldValue('year', null);          
        }
        handleChange(option);
    }
    
    return(
        <Select
            closeMenuOnSelect={true}
            components={{ DropdownIndicator }}
            name={field.name}
            options={options}
            styles={customStyles}
            onChange={(option) => { handleSelectChange(option) } }
        />
)};
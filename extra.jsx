// BaseNode.jsx
import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  config = {},
  onDataChange,
  children 
}) => {
  const {
    title = 'Node',
    width = 200,
    height = 80,
    style = {},
    handles = [],
    fields = [],
    defaultValues = {},
    className = ''
  } = config;

  // Initialize state for all fields
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach(field => {
      const dataKey = field.dataKey || field.name;
      initialValues[field.name] = data?.[dataKey] || defaultValues[field.name] || field.defaultValue || '';
    });
    return initialValues;
  });

  const handleFieldChange = (fieldName, value) => {
    const newValues = { ...fieldValues, [fieldName]: value };
    setFieldValues(newValues);
    
    // Call onDataChange if provided to update parent state
    if (onDataChange) {
      onDataChange(id, newValues);
    }
  };

  const renderField = (field) => {
    const { name, type, label, options, placeholder, ...fieldProps } = field;
    const value = fieldValues[name];

    switch (type) {
      case 'text':
        return (
          <input
            key={name}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            {...fieldProps}
          />
        );
      
      case 'select':
        return (
          <select
            key={name}
            value={value}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            {...fieldProps}
          >
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label || option.value}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            key={name}
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(name, Number(e.target.value))}
            {...fieldProps}
          />
        );
      
      case 'checkbox':
        return (
          <input
            key={name}
            type="checkbox"
            checked={value}
            onChange={(e) => handleFieldChange(name, e.target.checked)}
            {...fieldProps}
          />
        );
      
      default:
        return null;
    }
  };

  const defaultStyle = {
    width,
    height,
    border: '1px solid black',
    padding: '8px',
    backgroundColor: 'white',
    borderRadius: '4px',
    fontSize: '12px',
    ...style
  };

  return (
    <div className={className} style={defaultStyle}>
      {/* Header */}
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        {title}
      </div>

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {fields.map(field => (
          <label key={field.name} style={{ display: 'flex', flexDirection: 'column', fontSize: '10px' }}>
            {field.label}:
            {renderField(field)}
          </label>
        ))}
      </div>

      {/* Custom children */}
      {children}

      {/* Handles */}
      {handles.map(handle => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};
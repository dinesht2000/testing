import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  config = {},
  onDataChange 
}) => {
  const {
    title = 'Node',
    width = 200,
    height = 80,
    style = {},
    handles = [],
    fields = [],
    defaultValues = {},
    className = '',
    description
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
    const { name, type, label, options, placeholder, style: fieldStyle, ...fieldProps } = field;
    const value = fieldValues[name];

    const inputStyle = {
      fontSize: '12px',
      padding: '2px 4px',
      border: '1px solid #ccc',
      borderRadius: '2px',
      width: '100%',
      ...fieldStyle
    };

    switch (type) {
      case 'text':
        return (
          <input
            key={name}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            style={inputStyle}
            {...fieldProps}
          />
        );
      
      case 'select':
        return (
          <select
            key={name}
            value={value}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            style={inputStyle}
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
            style={inputStyle}
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
      
      case 'textarea':
        return (
          <textarea
            key={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleFieldChange(name, e.target.value)}
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '40px'
            }}
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
    display: 'flex',
    flexDirection: 'column',
    ...style
  };

  return (
    <div className={className} style={defaultStyle}>
      {/* Header */}
      <div style={{ 
        fontWeight: 'bold', 
        marginBottom: '8px',
        fontSize: '14px',
        textAlign: 'center'
      }}>
        {title}
      </div>

      {/* Description for nodes without fields */}
      {description && fields.length === 0 && (
        <div style={{ 
          fontSize: '11px',
          color: '#666',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          {description}
        </div>
      )}

      {/* Fields */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '6px',
        flex: 1
      }}>
        {fields.map(field => (
          <div key={field.name} style={{ display: 'flex', flexDirection: 'column' }}>
            {field.label && (
              <label style={{ 
                fontSize: '10px', 
                fontWeight: 'bold',
                marginBottom: '2px',
                color: '#333'
              }}>
                {field.label}:
              </label>
            )}
            {renderField(field)}
          </div>
        ))}
      </div>

      {/* Handles */}
      {handles.map(handle => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{
            width: '10px',
            height: '10px',
            ...handle.style
          }}
        />
      ))}
    </div>
  );
};
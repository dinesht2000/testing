import { Position } from 'reactflow';

export const nodeConfigs = {
  customInput: {
    title: 'Input',
    width: 200,
    height: 120,
    fields: [
      {
        name: 'inputName',
        type: 'text',
        label: 'Name',
        defaultValue: (id) => id.replace('customInput-', 'input_')
      },
      {
        name: 'inputType',
        type: 'select',
        label: 'Type',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
      }
    ],
    handles: [
      {
        id: 'value',
        type: 'source',
        position: Position.Right
      }
    ]
  },

  customOutput: {
    title: 'Output',
    width: 200,
    height: 120,
    fields: [
      {
        name: 'outputName',
        type: 'text',
        label: 'Name',
        defaultValue: (id) => id.replace('customOutput-', 'output_')
      },
      {
        name: 'outputType',
        type: 'select',
        label: 'Type',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'Image' }
        ]
      }
    ],
    handles: [
      {
        id: 'value',
        type: 'target',
        position: Position.Left
      }
    ]
  },

  text: {
    title: 'Text',
    width: 200,
    height: 100,
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Text',
        defaultValue: '{{input}}',
        placeholder: 'Enter text...'
      }
    ],
    handles: [
      {
        id: 'output',
        type: 'source',
        position: Position.Right
      }
    ]
  },

  llm: {
    title: 'LLM',
    width: 200,
    height: 100,
    description: 'This is a LLM.',
    handles: [
      {
        id: 'system',
        type: 'target',
        position: Position.Left,
        style: { top: '33%' }
      },
      {
        id: 'prompt',
        type: 'target',
        position: Position.Left,
        style: { top: '67%' }
      },
      {
        id: 'response',
        type: 'source',
        position: Position.Right
      }
    ]
  }
};

// Helper function to get node config
export const getNodeConfig = (nodeType) => {
  return nodeConfigs[nodeType] || {};
};

// Helper function to create initial node data
export const createInitialNodeData = (nodeId, nodeType) => {
  const config = getNodeConfig(nodeType);
  const data = { id: nodeId, nodeType };
  
  // Initialize field values
  if (config.fields) {
    config.fields.forEach(field => {
      if (typeof field.defaultValue === 'function') {
        data[field.name] = field.defaultValue(nodeId);
      } else if (field.defaultValue !== undefined) {
        data[field.name] = field.defaultValue;
      }
    });
  }
  
  return data;
};
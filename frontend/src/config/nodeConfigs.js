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
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
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
  },

  // Example of how to add new node types easily
  filter: {
    title: 'Filter',
    width: 200,
    height: 140,
    fields: [
      {
        name: 'filterType',
        type: 'select',
        label: 'Filter Type',
        defaultValue: 'contains',
        options: [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'startsWith', label: 'Starts With' },
          { value: 'endsWith', label: 'Ends With' }
        ]
      },
      {
        name: 'filterValue',
        type: 'text',
        label: 'Filter Value',
        placeholder: 'Enter filter value...'
      }
    ],
    handles: [
      {
        id: 'input',
        type: 'target',
        position: Position.Left
      },
      {
        id: 'output',
        type: 'source',
        position: Position.Right
      }
    ]
  },

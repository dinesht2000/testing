import { createSlice } from '@reduxjs/toolkit';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

const initialState = {
  nodes: [],
  edges: [],
  nodeIDs: {},
};

const nodesSlice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    addNode(state, action) {
      state.nodes.push(action.payload);
    },
    onNodesChange(state, action) {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange(state, action) {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect(state, action) {
      state.edges = addEdge(
        {
          ...action.payload,
          type: 'smoothstep',
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
            height: 20,
            width: 20,
          },
        },
        state.edges
      );
    },
    updateNodeField(state, action) {
      const { nodeId, fieldName, fieldValue } = action.payload;
      state.nodes = state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              [fieldName]: fieldValue,
            },
          };
        }
        return node;
      });
    },
    incrementNodeID(state, action) {
      const type = action.payload;
      if (!state.nodeIDs[type]) {
        state.nodeIDs[type] = 0;
      }
      state.nodeIDs[type] += 1;
    },
  },
});

export const {
  addNode,
  onNodesChange,
  onEdgesChange,
  onConnect,
  updateNodeField,
  incrementNodeID,
} = nodesSlice.actions;

export default nodesSlice.reducer;

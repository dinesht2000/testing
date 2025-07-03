import { BaseNode } from './BaseNode';
import { getNodeConfig, createInitialNodeData } from '../config/nodeConfigs';
import { useDispatch } from 'react-redux';
import { updateNodeField } from '../store/nodesSlice';

export const ConfigurableNode = ({ id, data, type }) => {
  const dispatch = useDispatch();
  const config = getNodeConfig(type);

  // Ensure data has all required fields initialized
  const initializedData = {
    ...createInitialNodeData(id, type),
    ...data
  };

  const handleDataChange = (nodeId, fieldValues) => {
    // Update each field in the Redux store
    Object.entries(fieldValues).forEach(([fieldName, fieldValue]) => {
      dispatch(updateNodeField({
        nodeId,
        fieldName,
        fieldValue
      }));
    });
  };

  return (
    <BaseNode
      id={id}
      data={initializedData}
      config={config}
      onDataChange={handleDataChange}
    />
  );
};
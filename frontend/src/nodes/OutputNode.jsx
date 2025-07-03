import { ConfigurableNode } from '../components/ConfigurableNode';

export const OutputNode = (props) => {
  return <ConfigurableNode {...props} type="customOutput" />;
};
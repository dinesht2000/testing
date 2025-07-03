import { ConfigurableNode } from '../components/ConfigurableNode';

export const TextNode = (props) => {
  return <ConfigurableNode {...props} type="text" />;
};
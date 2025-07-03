import { ConfigurableNode } from '../components/ConfigurableNode';

export const LLmNode = (props) => {
  return <ConfigurableNode {...props} type="llm" />;
};
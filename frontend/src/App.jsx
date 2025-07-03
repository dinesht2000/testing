import { PipelineToolbar } from "./pipelines/PipelineToolbar";
import { PipelineUI } from "./pipelines/PipelineUI";
import { SubmitButton } from "./SubmitButton";


function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;

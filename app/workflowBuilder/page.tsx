import { ReactFlowProvider } from "@xyflow/react";
import WorkflowBuilder from "@/modules/WorkflowBuilderModule";

const WorkflowBuilderPage = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlowProvider>
        <WorkflowBuilder />
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowBuilderPage;

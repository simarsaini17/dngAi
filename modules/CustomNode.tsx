import CustomCard from "@/components/Card/CustomCard";
import { Handle, Position } from "@xyflow/react";
export const CustomNode = ({ data, id }: any) => {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ background: "#555" }}
      />
      <CustomCard
        title={data.title}
        description={data.description}
        tags={["Tag", "Tag"]}
        buttonLabel={data.buttonLabel}
      />
      <Handle
        type="source"
        id="b"
        position={Position.Right}
        style={{ background: "#555" }}
      />
    </div>
  );
};

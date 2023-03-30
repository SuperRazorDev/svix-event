import { Button } from "./Button";

export const EventItem = ({
  name,
  description,
  featureFlag,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex justify-between items-center bg-white rounded p-4 mb-4">
      <div>
        <div className="font-semibold text-sm mb-2">{name}</div>
        <div className="text-xs">{description}</div>
        {featureFlag && (
          <div className="text-xs font-semibold">Flag: {featureFlag}</div>
        )}
      </div>

      <div className="flex">
        <Button type="primary" className="mr-4" onClick={onEdit}>
          Edit
        </Button>
        <Button type="warning" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

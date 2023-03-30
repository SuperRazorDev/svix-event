import { useEffect, useState } from "react";
import {
  createEventType,
  deleteEventType,
  getEventTypes,
  updateEventType,
} from "./api/svix";
import { Button } from "./components/Button";
import { EventItem } from "./components/EventItem";
import { InputItem } from "./components/InputItem";
import { Modal } from "./components/Modal";

const initialFormValues = {
  name: "",
  description: "",
  featureFlag: "",
};

function App() {
  const [events, setEvents] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [isModalVisible, setModalVisble] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  const fetchEventTypes = async () => {
    const payload = await getEventTypes();
    setEvents(payload);
  };

  const inputChangeHandler = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const modalConfirmHandler = async () => {
    try {
      let payload = {
        name: formValues.name,
        description: formValues.description,
      };
      if (formValues.featureFlag.length) {
        payload = {
          ...payload,
          featureFlag: formValues.featureFlag,
        };
      }
      if (isCreating) {
        await createEventType(payload);
      }
      if (isEditing) {
        await updateEventType(payload);
      }
      fetchEventTypes();
      setModalVisble(false);
    } catch (e) {
      alert(`Failed to ${isCreating ? "create" : "update"} event`);
    }
  };

  const deleteHandler = async (name) => {
    try {
      await deleteEventType(name);
      fetchEventTypes();
    } catch {
      alert(`Failed to delete event:  ${name}`);
    }
  };

  const editHandler = (i) => {
    setFormValues({
      name: events[i].name,
      description: events[i].description,
      featureFlag: events[i].featureFlag,
    });
    setEditing(true);
    setModalVisble(true);
  };

  useEffect(() => {
    document.title = "Svix Event Types";
    try {
      fetchEventTypes();
    } catch (e) {
      alert("Failed to fetch event types");
    }
  }, []);

  useEffect(() => {
    if (!isModalVisible) {
      setEditing(false);
      setCreating(false);
    }
  }, [isModalVisible]);

  return (
    <div className="max-w-[750px] mx-auto mt-6">
      <h1 className="text-center text-lightgray text-4xl font-bold">
        Event Type List
      </h1>
      <div className="flex justify-end mt-4">
        <Button
          type="primary"
          onClick={() => {
            setFormValues(initialFormValues);
            setCreating(true);
            setModalVisble(true);
          }}
        >
          Add Event
        </Button>
      </div>
      <div className="bg-gray rounded p-4 mt-2">
        {events.map((event, index) => (
          <EventItem
            key={index}
            name={event.name}
            description={event.description}
            featureFlag={event.featureFlag}
            onEdit={() => editHandler(index)}
            onDelete={() => deleteHandler(event.name)}
          />
        ))}
      </div>
      <Modal
        isVisible={isModalVisible}
        setVisible={setModalVisble}
        confirmText={isCreating ? "Create" : "Update"}
        title={isCreating ? "Create New Event" : `Update Event`}
        onConfirm={modalConfirmHandler}
      >
        <InputItem
          type="text"
          label="Name"
          placeholder="e.g. invoice.paid"
          name="name"
          value={formValues.name || ""}
          onChange={inputChangeHandler}
          disabled={isEditing}
        />
        <InputItem
          type="textarea"
          label="Description"
          placeholder="When does this event occur?"
          name="description"
          value={formValues.description || ""}
          onChange={inputChangeHandler}
        />
        <InputItem
          type="text"
          label="Feature Flag"
          placeholder="Limit who can see this event type (optional)"
          name="featureFlag"
          value={formValues.featureFlag || ""}
          onChange={inputChangeHandler}
        />
      </Modal>
    </div>
  );
}

export default App;

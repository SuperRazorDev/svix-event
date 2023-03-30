import { Svix } from "svix";

const svix = new Svix("testsk_a3XxhcrOU99DCoqjcjwhtDuZemR3H1JH.eu");

const getEventTypes = async () => {
  const { data } = await svix.eventType.list();
  return data;
};

const createEventType = async (payload) => {
  const res = await svix.eventType.create(payload);
  return res;
};

const updateEventType = async (payload) => {
  const res = await svix.eventType.update(payload.name, payload);
  return res;
};

const deleteEventType = async (name) => {
  await svix.eventType.delete(name);
};

export { getEventTypes, createEventType, deleteEventType, updateEventType };

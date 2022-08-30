import { v4 as uuidv4 } from 'uuid';

export const createUniqueId = () => {
  return uuidv4().toString().replaceAll('-', '');
}

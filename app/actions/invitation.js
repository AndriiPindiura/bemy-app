import { IV_CHANGE_QUESTION } from '../types';

export default function changeQuestion(payload) {
  return { type: IV_CHANGE_QUESTION, payload };
}

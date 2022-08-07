import { error } from './error';
import { connectionError } from './connectionError';
import { trackStart } from './trackStart';
import { trackAdd } from './trackAdd';
import { botDisconnect } from './botDisconnect';
import { channelEmpty } from './channelEmpty';
import { queueEnd } from './queueEnd';

export const listeners = {
  error,
  connectionError,
  trackStart,
  trackAdd,
  botDisconnect,
  channelEmpty,
  queueEnd
};

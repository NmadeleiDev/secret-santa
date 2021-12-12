import { host, protocol } from 'pages/_app';

export const getUserLink = (userid: string) =>
  `${protocol}://${host}/login?id=${userid}`;
export const getRoomLink = (roomid: string) =>
  `${protocol}://${host}/invite?id=${roomid}`;

export const UUID_REGEX = /^\w{8}-(\w{4}-){3}\w{12}$/;

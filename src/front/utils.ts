import { host, protocol } from 'pages/_app';

export const getRoomLink = (roomid: string) =>
  `${protocol}://${host}/invite?id=${roomid}`;

export const UUID_REGEX = /^\w{8}-(\w{4}-){3}\w{12}$/;
export const UUID_REGEX_GROUP = new RegExp(
  `^${protocol}:\\/\\/${host}\/invite\\?id=(\\w{8}-(\\w{4}-){3}\\w{12})$|^(\\w{8}-(\\w{4}-){3}\\w{12})$`,
);
console.log(UUID_REGEX_GROUP);

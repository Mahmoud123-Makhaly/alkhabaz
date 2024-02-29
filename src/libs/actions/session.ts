'use server';

import { cookies } from 'next/headers';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

import { DTO } from '@tot/core/types';
import { env, Utils } from '@libs';

const _sessionCookieName = 'UAS_TOT';
const _sessionAppSettingCookieName = 'APPS_TOT';
export const setupSession = (user: DTO.IUserDTO): boolean => {
  const cookiesList = cookies();
  const _hash = Utils.createEncodedHash(user, ',', env.HASH_SECRET);

  if (Utils.cleanEmpty(user))
    if (
      !cookiesList.has(_sessionCookieName) ||
      (cookiesList.has(_sessionCookieName) &&
        !Utils.isValidEncodedHash(
          user,
          ',',
          env.HASH_SECRET,
          JSON.parse(cookiesList.get(_sessionCookieName)?.value ?? '').SID ?? '',
        ))
    ) {
      const _encUserData = encryptObject<DTO.IUserDTO>(user, getHashSubKey(env.HASH_SECRET));
      revalidatePath('/');
      const setStatus = cookiesList.set({
        name: _sessionCookieName,
        value: JSON.stringify({ SID: _hash, DID: _encUserData }),
        path: '/',
        secure: env.SITE_DOMAIN.startsWith('https://'),
      });
      return !!setStatus;
    }
  return false;
};

export const clearSession = () => {
  if (cookies().has(_sessionCookieName)) cookies().delete(_sessionCookieName);
};

export const isSessionActive = (user: DTO.IUserDTO) => {
  const cookiesList = cookies();
  if (cookiesList.has(_sessionCookieName)) {
    return Utils.isValidEncodedHash(
      user,
      ',',
      env.HASH_SECRET,
      JSON.parse(cookiesList.get(_sessionCookieName)?.value ?? '').SID ?? '',
    );
  } else return false;
};

const encryptObject = <T = unknown>(obj: T, salt: string, algorithm = 'aes-256-cbc'): string => {
  const key = crypto.scryptSync('tot', salt, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encryptedData = cipher.update(JSON.stringify(obj));
  encryptedData = Buffer.concat([encryptedData, cipher.final()]);
  return iv.toString('hex') + ':' + encryptedData.toString('hex');
};

export const decryptObject = <T = unknown>(data: string, salt: string, algorithm = 'aes-256-cbc'): T => {
  const key = crypto.scryptSync('tot', salt, 32);
  const [ivHex, encryptedDataHex] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedData = Buffer.from(encryptedDataHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decryptedData = decipher.update(encryptedData);
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);
  return JSON.parse(decryptedData.toString()) as T;
};

export const isIUserDTO = (obj: any): obj is DTO.IUserDTO => {
  return (obj as DTO.IUserDTO).id !== undefined;
};

export const getHashSubKey = (key: string, length: number = 10) => key.substring(0, length);

export const getStoreSettings = (key: 'IS_MULTIPLE_WAREHOUSE'): boolean | string | number | undefined => {
  return env[key];
};

export const getSessionAppSettingValueByKey = <T>(key: 'INV'): T | undefined => {
  const cookiesList = cookies();
  if (cookiesList.has(_sessionAppSettingCookieName)) {
    try {
      const obj = JSON.parse(cookiesList.get(_sessionAppSettingCookieName)?.value ?? '');

      if (['INV'].some(x => x === key)) {
        const obj = JSON.parse(cookiesList.get(_sessionAppSettingCookieName)?.value ?? '');
        const val = decryptObject<any>(obj[key] ?? '', getHashSubKey(env.HASH_SECRET));
        return val as T;
      }

      return obj?.[key] as T;
    } catch {
      return undefined;
    }
  } else return undefined;
};

export const SetInventory = (inventory: { id: string }): boolean => {
  const cookiesList = cookies();
  const _encData = encryptObject<{ id: string }>(inventory, getHashSubKey(env.HASH_SECRET));

  let obj = cookiesList.has(_sessionAppSettingCookieName)
    ? JSON.parse(cookiesList.get(_sessionAppSettingCookieName)?.value ?? '')
    : {};

  obj.INV = _encData;
  const setStatus = cookiesList.set({
    name: _sessionAppSettingCookieName,
    value: JSON.stringify(obj),
    path: '/',
    secure: env.SITE_DOMAIN.startsWith('https://'),
  });
  if (!!setStatus) revalidatePath('/');
  return !!setStatus;
};

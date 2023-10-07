import UserValidator from '../../../domain/validators/UserValidator';
import GetUser from './GetUser';
import { ServiceLocator } from '../../../infrastructure/config/service-locator';

export default async (userData: any, serviceLocator: ServiceLocator) => {
  const { userRepository } = serviceLocator;
  let user = await GetUser(userData.id, serviceLocator);
  if (user == null) throw new Error('Unknown ID');
  console.log(userData);
  user = { ...user, ...userData };
  console.log("usesdsdr",user);
  await UserValidator.tailor('update').validateAsync(user);
  return userRepository!.merge(user);
};

import constants from './constants';
import environment from './environment';

// Types
import PasswordManager from '../../domain/services/PasswordManager';
import AccessTokenManager from '../../application/security/AccessTokenManager';

import Serializer from '../../interfaces/serializers/Serializer';

import UserRepository from '../../domain/repositories/UserRepository';

// Implementations

import BcryptPasswordManager from '../security/BcryptPasswordManager';
import JwtAccessTokenManager from '../security/JwtAccessTokenManager';

import UserSerializer from '../../interfaces/serializers/UserSerializer';

// Mongo
import UserRepositoryMongo from '../repositories/mongoose/UserRepositoryMongo';
import BlogRepositoryMongo from '../repositories/mongoose/BlogRepositoryMongo';
import BlogRepository from "../../domain/repositories/BlogRepository";
import BlogSerializer from "../../interfaces/serializers/BlogSerializer";

export type ServiceLocator = {
  passwordManager: PasswordManager,
  accessTokenManager: AccessTokenManager,

  userSerializer: Serializer,
  blogSerializer: Serializer,

  userRepository?: UserRepository,
  blogRepository?:BlogRepository
};

function buildBeans() {
  const beans: ServiceLocator = {
    passwordManager: new BcryptPasswordManager(),
    accessTokenManager: new JwtAccessTokenManager(),

    userSerializer: new UserSerializer(),
    blogSerializer:new BlogSerializer(),
  };

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
    beans.userRepository = new UserRepositoryMongo();
    beans.blogRepository=new BlogRepositoryMongo();
  }

  return beans;
}

export default buildBeans();

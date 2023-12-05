import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  private usersRepository: IUsersRepository;
  private storageProvider: IStorageProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('StorageProvider')
    storageProvider: IStorageProvider,
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Invalid user!', 404);
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }

    await this.storageProvider.save(avatarFile, 'avatar');

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}

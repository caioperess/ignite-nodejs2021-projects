import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Partial<User>;
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  private usersRepository: IUsersRepository;
  private usersTokensRepository: IUsersTokensRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    dateProvider: IDateProvider,
  ) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid user credentials!');
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError('Invalid user credentials!');
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const refreshTokenExpiresDate = this.dateProvider.addTime(
      auth.refresh_token_expires_time,
      'hour',
    );

    await this.usersTokensRepository.create({
      expires_date: refreshTokenExpiresDate,
      refresh_token,
      user_id: user.id,
    });

    delete user.password;

    return { user, token, refresh_token };
  }
}

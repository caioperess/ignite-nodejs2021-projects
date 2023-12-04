import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/dayJsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let mailProviderInMemory: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send forgot password mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const user = {
      driver_license: '80827',
      email: 'zika@ju.org',
      name: 'Bryan',
      password: 'PvrGvP13p8xFpa',
    };

    const sendMailFn = jest.spyOn(mailProviderInMemory, 'sendMail');

    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMailFn).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('teste@mail.com'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateToken = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    const user = {
      driver_license: '80827',
      email: 'zika@ju.org',
      name: 'Bryan',
      password: 'PvrGvP13p8xFpa',
    };
    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(generateToken).toHaveBeenCalled();
  });
});

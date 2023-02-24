const resources = {
  translation: {
    navbar: {
      title: 'Hexlet Chat',
      exitButton: 'Выйти',
    },
    errors: {
      loginError: 'Неверные имя пользователя или пароль',
      nameLengthError: 'От 3 до 20 символов',
      requiredField: 'Обязательное поле',
      passwordLengthError: 'Не менее 6 символов',
      confirmPasswordRequired: 'Подтвердите пароль',
      confirmPasswordFail: 'Пароли должны совпадать',
    },
    loginPage: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      button: 'Войти',
      message: 'Нет аккаунта?',
      registrationLink: 'Регистрация',
    },
    registrationPage: {
      title: 'Регистрация',
      name: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      button: 'Зарегистрироваться',
    },
    mainPage: {
      channelThing: '#',
      channels: 'Каналы',
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
      newMessage: 'Введите сообщение...',
    },
    modal: {
      addChannel: 'Добавить канал',
      submitButton: 'Отправить',
      cancelButton: 'Отменить',
      deleteChannel: 'Удалить канал',
      deleteButton: 'Удалить',
      confirmation: 'Уверены?',
      renameChannel: 'Переименовать канал',
      renameButton: 'Переименовать',
    },
  }
};

export default resources;

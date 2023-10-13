const resources = {
  ru: {
    translation: {
      errors: {
        nameMinlength: 'От 3 до 20 символов',
        nameMaxlength: 'Максимум 20 символов',
        passwordMinLenth: 'Не менее 6 символов',
        required: 'Обязательное поле',
        confirmPassword: 'Пароли должны совпадать',
        notOneOfUser: 'Такой пользователь уже существует',
        notOneOfChannel: 'Должно быть уникальным',
        incorrectNameOrPass: 'Неверные имя пользователя или пароль',
        connectionError: 'Ошибка соединения',
        submitError: 'Не удалось отправить форму',
        registrationError: 'Ошибка регистрации',
        unknownError: 'Неизвестная ошибка',
      },
      header: {
        logoText: 'Hexlet chat',
        logInButton: 'Войти',
        logOutButton: 'Выйти',
      },
      authForm: {
        headline: 'Войти',
        logInButton: 'Войти',
        footerText: 'Нет аккаунта?',
        footerButton: 'Регистрация',
        nickname: 'Ваш ник',
        password: 'Пароль',
      },
      signUpForm: {
        headline: 'Регистрация',
        signUpButton: 'Зарегистрироваться',
        footerText: 'Уже зарегистрированы?',
        footerButton: 'Войти',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
      },
      chat: {
        headline: 'Каналы',
        defaultChannel: 'general',
        counter: {
          count_one: '{{count}} сообщение',
          count_few: '{{count}} сообщения',
          count_many: '{{count}} сообщений',
        },
        newMessage: 'Новое сообщение',
        inputText: 'Введите сообщение...',
        submitButton: 'Отправить',
        dropdownItemDelete: 'Удалить',
        dropdownItemRename: 'Переименовать',
        hiddenText: 'Управление каналом',
      },
      modals: {
        add: {
          headline: 'Добавить канал',
          cancelButton: 'Отменить',
          submitButton: 'Отправить',
          toastText: 'Канал создан',
          channelName: 'Имя канала',
        },
        rename: {
          headline: 'Переименовать канал',
          cancelButton: 'Отменить',
          submitButton: 'Отправить',
          toastText: 'Канал переименован',
          channelName: 'Имя канала',
        },
        remove: {
          headline: 'Удалить канал',
          subText: 'Уверены?',
          cancelButton: 'Отменить',
          submitButton: 'Отправить',
          toastText: 'Канал удалён',
          confirmation: 'Уверены?',
        },
      },
      page404: {
        headline: '404',
        thirdLevelHeadLine: 'Страница не найдена',
        textPartOne: 'Но вы можете перейти на ',
        textPartTwo: 'главную страницу',
      },
    },
  },
};

export default resources;

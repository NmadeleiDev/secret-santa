import MetaType from 'types/MetaType';

export const mainPageData = {
  title: 'Тайный санта',
  description: 'Поделись новогодним настроением с друзьями',
  registerHeader: 'Регистрация',
  createRoom: 'Создать комнату',
  successRegHeader: 'Поздравляю, ты в игре!',
  enterRoom: 'Войти в комнату',
  fabToolpip: 'Кто такой "Тайный санта"?',
  regForm: 'Кто ты?',
  ifHasUUID: 'Если ты уже участник этой комнаты - введи сюда свой код',
  regFormText:
    'Остался последний шаг. Введи свой код и мы добавим тебя в комнату ',
  signupText: 'В первый раз тут? ',
  signinText: 'Уже зареган? ',
  create: 'Создать',
  back: 'Назад',
  yourCode:
    'Твой персональный код, оставь его при себе. Он пригодится тебе для входа в комнату.',
  yourLink: 'Также ты можешь воспользоваться ссылкой:',
  yourRoomCode: 'Персональный код твоей комнаты',
  yourRoomLink:
    'Ссылка-приглашение в твою комнату. Поделись ей с друзьями. По ней ты и они сможете войти в комнату.',
  roomTitle: 'Выбор комнаты',
  enterRoomHeader: 'Введи код комнаты',
  enter: 'Войти',
  signup: 'Зарегистрироваться',
  room: 'Комната ',
  createRoomForm: 'Новая комната',
  usersQuantity: 'Количество пользователей в комнате: ',
  genericError: 'Упс... Что-то пошло не так',
  userNotFound: 'Пользователь не найден',
  roomNotFound: 'Комната не найдена. Проверь код комнаты',
  roomNotFoundGoHome: 'Комната не найдена, попробуй зайти с главной страницы',
  wrongFormat: 'Неверный формат кода',
  lockRoom: 'Составить пары',
  lockRoomTooltip:
    'Кнопка станет доступной при наличии 3 и более человек в комнате',
  removeUser: 'Удалить пользователя',
  lockSuccess: 'Ура! Пары составлены!',
  invitation: 'Ссылка для приглашения в комнату:',
  interests:
    'Опиши, что бы тебе хотелось и точно не хотелось получить в подарок.',
    likes: 'Вот что ему нравится: ',
    dislikes: 'А это не нравится: ',
};

export const mockMeta: MetaType = {
  title: 'Secret santa',
  description: 'Тайный санта. Собери друзей и твори магию рождества',
  keywords: 'christmas, present',
  ogTitle: 'Secret santa',
  ogDescription: 'Secret santa',
  ogSiteName: 'Secret santa',
  ogUrl: 'Secret santa',
  // ogImage: 'Secret santa',
  // ogImageSecureUrl: 'Secret santa',
  twitterTitle: 'Secret santa',
  twitterDescription: 'Secret santa',
  twitterUrl: 'Secret santa',
  twitterCard: 'Secret santa',
  // twitterImage: 'Secret santa',
};

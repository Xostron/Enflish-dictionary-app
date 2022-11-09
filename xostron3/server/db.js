// Для строковых запросов напрямую к БД
const Pool = require('pg').Pool


// Подключаем ORM Object Related Model
const { Sequelize, DataTypes, Model } = require('sequelize')

// БД
const myDb = {
    user: "postgres",
    password: '1980',
    host: "localhost",
    port: 5432,
    database: "xostron3",
    dialect: "postgres"
}

//драйвер postgres для SQL запросов (помощь к ORM) - для строковых запросов
const pool = new Pool(myDb)

//подключение к БД ORM (Object related model)
const sequelize = new Sequelize(
    database = myDb.database,
    username = myDb.user,
    password = myDb.password,
    {
        host: myDb.host,
        port: myDb.port,
        dialect: myDb.dialect
    })

// **************************Определяем таблицы БД через ORM******************************
//1 Модель dicteng - общий словарь приложения
// class DictEng extends Model { }
const DictEng = sequelize.define(
    'DictEng',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        word: { type: DataTypes.STRING, unique: true },
        transcription: { type: DataTypes.STRING },
        translate: { type: DataTypes.ARRAY(DataTypes.STRING) },
        example: { type: DataTypes.TEXT },
        img: { type: DataTypes.STRING }
    },
    {
        tableName: 'dicteng'
    }
)

//2 Модель users - пользователи
const User = sequelize.define(
    'User',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        login: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ['USER'] },
        img: { type: DataTypes.STRING }
    },
    { tableName: 'users' }
)
//3 Модель user_word - словарь пользователей
const User_word = sequelize.define(
    'User_word',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
        word_id: { type: DataTypes.INTEGER, references: { model: DictEng, key: 'id' } },
        word: { type: DataTypes.STRING },
        transcription: { type: DataTypes.STRING },
        translate: { type: DataTypes.ARRAY(DataTypes.STRING) },
        comment: { type: DataTypes.TEXT }
    },
    { tableName: 'user_word' }
)

//4 Модель user_word_stс - статистика слов каждого пользователя
const User_word_stc = sequelize.define(
    'User_word_stc',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
        user_word_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User_word, key: 'id' } },
        last_repeat_date: { type: DataTypes.DATE },
        repeat_count: { type: DataTypes.INTEGER, defaultValue: 0 },
        correct_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    { tableName: 'user_word_stc' }
)
//5 Модель user_session - статистика занятий каждого пользователя
const User_session = sequelize.define(
    'User_session',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
        date: { type: DataTypes.DATE },
        name_lesson: { type: DataTypes.STRING },
        ratio: { type: DataTypes.FLOAT },
    },
    { tableName: 'user_session' }
)
//6 карточка
const Card = sequelize.define(
    'Card',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
        name: { type: DataTypes.STRING, allowNull: false, defaultValue: 'MyCard' },
        img: { type: DataTypes.STRING },
        arr_word_id: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
        retweet: { type: DataTypes.INTEGER, allowNull: false }//по количесиву из basketCard
    },
    { tableName: 'card' }
)
//7 корзина карточек - 
const BasketCard = sequelize.define(
    'BasketCard',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
        card_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Card, key: 'id' } },
    },
    { tableName: 'basket_card' }
)

//8 Модель user_msg - список чатов кем создан и имя чата
const List_chats = sequelize.define(
    'ListChats',
    {
        chat_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.INTEGER, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } }
    },
    { tableName: 'list_chats' }
)

//9 - участники чата ()
const Party = sequelize.define(
    'Party',
    {
        chat_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: List_chats, key: 'chat_id' } },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
        date_create: { type: DataTypes.DATE },
        status: { type: DataTypes.INTEGER }
    },
    { tableName: 'party' }
)

//10 - сообщения пользователей в чате
const List_msg = sequelize.define(
    'List_msg',
    {
        msg_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        chat_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: List_chats, key: 'chat_id' } },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
        content: { type: DataTypes.TEXT },
        data_create: { type: DataTypes.DATE }
    },
    { tableName: 'list_msg' }
)
//11 - статус сообщения - Удален для всех/для себя, прочитан, не прочитан
const Status_msg = sequelize.define(
    'Status_msg',
    {
        msg_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: List_msg, key: 'msg_id' } },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
        status: { type: DataTypes.INTEGER }
    },
    { tableName: 'status_msg' }
)

module.exports = {
    sequelize, pool,
    DictEng,
    User,
    User_session,
    User_word,
    User_word_stc,
    BasketCard,
    Card,
    List_chats,
    List_msg,
    Status_msg,
    Party
}
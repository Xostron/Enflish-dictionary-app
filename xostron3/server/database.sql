create TABLE person(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255)
);
create TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255)
);
////////////////////////////////////////////
create TABLE engDict(
    id SERIAL PRIMARY KEY,
    word VARCHAR(255),
    translation VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id) 
);

create TABLE rusDict(
    id SERIAL PRIMARY KEY,
    word VARCHAR(255),
    translation VARCHAR(255),
    user_id INTEGER REFERENCES person (id) 
);

create TABLE rusDict(
    id SERIAL PRIMARY KEY,
    word VARCHAR(255),
    translation VARCHAR(255),
    user_id INTEGER REFERENCES person (id)
    constraint pk primary key () 
);
////////////////////////////////////////////
create table test1(
    id serial primary key,
    smallint smallint,
    integer integer,
    numeric numeric,
    real real,
    text text,
    varchar varchar,
    hex bytea
);
{
    "id": 1,
    "smallint": 100,
    "integer": 101,
    "numeric": "102.102",
    "real": 130.03,
    "text": "npm run server",
    "varchar": "hellohello",
    "hex": {
        "type": "Buffer",
        "data": [49, 65]
    }
}

////////////////////////////////////////////
create table test2(
    id serial primary key,
    timestamp timestamp,
    timestamptz timestamptz,
    time time,
    timetz timetz,
    date date,
    interval interval
);
{
"timestamp": "12/03/2022 10:00:00",
"timestamptz":"12/03/2022 10:00:00",
"time":"10:00:00",
"timetz":"10:00:00",
"date":"12/03/2022",
"interval":"P0001-02-03T04:05:06"
}
{
    "id": 1,
    "timestamp": "2022-03-12T07:00:00.000Z",
    "timestamptz": "2022-03-12T07:00:00.000Z",
    "time": "10:00:00",
    "timetz": "10:00:00+03",
    "date": "2022-03-11T21:00:00.000Z",
    "interval": {
        "years": 1,
        "months": 2,
        "days": 3,
        "hours": 4,
        "minutes": 5,
        "seconds": 6
    }
}
////////////////////////////////////////////
create table test3(
    id serial primary key,
    boolean boolean,
    point point,
    line line,
    cidr cidr,
    intArr integer[],
    text text[]
);

{
    "boolean": 1,
    "point":"(20,22)",
    "line":"(12,12),(20,22)",
    "cidr":"192.168.1.0/24",
    "intarr": "[12,12,20,22]",
    "text": ["Спасибо","что","ты","есть","у","меня,","Настюша <3"]
}

{
    "id": 48,
    "boolean": false,
    "point": {
        "x": 20,
        "y": 22
    },
    "line": "{1.25,-1,-3}",
    "cidr": "192.168.1.0/24",
    "intarr": [12, 12, 20, 22],
    "text": ["Спасибо", "что", "ты", "есть", "у", "меня,", "Настюша <3"]
}
////////////////////////////////////////////
create table engdict(
    id serial primary key,
    word varchar(255) unique,
    transcription varchar(255),
    translate varchar(255)[],
    comment text
    );
////////////////////////////////////////////
create table user_word(
    repeat_count integer,
    correct_count integer,
    ratio integer,
    create_date timestamptz,
    last_repeat_date timestamptz,
    user_id integer references users(id),
    word_id integer,
    word varchar(255) unique,
    transcription varchar(255),
    translate varchar(255)[],
    comment text
);
////////////////////////////////////////////

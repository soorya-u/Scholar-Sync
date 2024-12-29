-- User Schema

DEFINE TABLE user SCHEMAFULL;

DEFINE FIELD fullName ON user TYPE string;
DEFINE FIELD email ON user TYPE string;
DEFINE FIELD emailVerified ON user TYPE bool DEFAULT false;
DEFINE FIELD password ON user TYPE string;
DEFINE FIELD createdAt ON user TYPE datetime DEFAULT time::now() READONLY;

DEFINE INDEX userEmailIndex ON TABLE user COLUMNS email UNIQUE;

-- Core Schema

DEFINE TABLE core SCHEMAFULL;

DEFINE FIELD name ON core TYPE string;
DEFINE FIELD imageUrl ON core TYPE string;
DEFINE FIELD createdAt ON core TYPE datetime DEFAULT time::now() READONLY;
DEFINE FIELD updatedAt ON core TYPE datetime DEFAULT time::now();

-- Nexus Schema

DEFINE TABLE nexus SCHEMAFULL;

DEFINE FIELD name ON nexus TYPE string;
DEFINE FIELD category ON nexus TYPE string ASSERT $value IN ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth"];
DEFINE FIELD createdAt ON nexus TYPE datetime DEFAULT time::now() READONLY;
DEFINE FIELD updatedAt ON nexus TYPE datetime DEFAULT time::now();

-- File Schema

DEFINE TABLE file SCHEMAFULL;

DEFINE FIELD title ON file TYPE string;
DEFINE FIELD description ON file TYPE string;
DEFINE FIELD fileUrl ON file TYPE string;
DEFINE FIELD fileName ON file TYPE string;
DEFINE FIELD timestamp ON file TYPE datetime DEFAULT time::now() READONLY;

-- Announcement Schema

DEFINE TABLE announcement SCHEMAFULL;

DEFINE FIELD title ON announcement TYPE string;
DEFINE FIELD message ON announcement TYPE string;
DEFINE FIELD timestamp ON announcement TYPE datetime DEFAULT time::now() READONLY;

-- Graph Relations

DEFINE TABLE creator SCHEMAFULL TYPE RELATION FROM user to core;

DEFINE TABLE contains SCHEMAFULL TYPE RELATION FROM core to nexus;

DEFINE TABLE member SCHEMAFULL TYPE RELATION FROM user to nexus;
DEFINE FIELD role ON member TYPE string ASSERT $value IN ["ADMIN", "PSEUDOADMIN", "NORMAL"] DEFAULT "NORMAL";

DEFINE TABLE has SCHEMAFULL TYPE RELATION FROM nexus to file | announcement;

DEFINE TABLE sentBy SCHEMAFULL TYPE RELATION FROM file | announcement to user;

-- User Schema

DEFINE TABLE user SCHEMAFULL;

DEFINE FIELD fullName ON user TYPE string;
DEFINE FIELD email ON user TYPE string;
DEFINE FIELD emailVerified ON user TYPE bool DEFAULT false;
DEFINE FIELD password ON user TYPE string;
DEFINE FIELD userType ON user TYPE string ASSERT $value IN ["ADMIN", "PSEUDOADMIN", "NORMAL"] DEFAULT "NORMAL";
DEFINE FIELD createdAt ON user TYPE datetime DEFAULT time::now() READONLY;

DEFINE INDEX userEmailIndex ON TABLE user COLUMNS email UNIQUE;

-- Core Schema

DEFINE TABLE core SCHEMAFULL;

DEFINE FIELD name ON core TYPE string;
DEFINE FIELD creator ON core TYPE record(user);
DEFINE FIELD nexus ON core TYPE array<record(nexus)>;
DEFINE FIELD createdAt ON core TYPE datetime DEFAULT time::now() READONLY;
DEFINE FIELD updatedAt ON core TYPE datetime DEFAULT time::now();

-- Nexus Schema

DEFINE TABLE nexus SCHEMAFULL;

DEFINE FIELD name ON nexus TYPE string;
DEFINE FIELD creator ON nexus TYPE record(user);
DEFINE FIELD core ON nexus TYPE record(core);
DEFINE FIELD files ON nexus TYPE array<record(file)>;
DEFINE FIELD announcements ON nexus TYPE array<record(announcement)>;
DEFINE FIELD createdAt ON nexus TYPE datetime DEFAULT time::now() READONLY;
DEFINE FIELD updatedAt ON nexus TYPE datetime DEFAULT time::now();

-- File Schema

DEFINE TABLE file SCHEMAFULL;

DEFINE FIELD title ON file TYPE string;
DEFINE FIELD fileUrl ON file TYPE string;
DEFINE FIELD sentBy ON file TYPE record(user);
DEFINE FIELD nexus ON file TYPE record(nexus);
DEFINE FIELD timeStamp ON file TYPE datetime DEFAULT time::now() READONLY;



-- Announcement Schema

DEFINE TABLE announcement SCHEMAFULL;

DEFINE FIELD title ON announcement TYPE string;
DEFINE FIELD message ON announcement TYPE string;
DEFINE FIELD sentBy ON announcement TYPE record(user);
DEFINE FIELD nexus ON announcement TYPE record(nexus);
DEFINE FIELD timeStamp ON announcement TYPE datetime DEFAULT time::now() READONLY;


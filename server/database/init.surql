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
DEFINE FIELD imageUrl ON core TYPE string;
DEFINE FIELD nexus ON core TYPE array<record(nexus)> DEFAULT [];
DEFINE FIELD pseudoAdmins ON core TYPE array<record(user)> DEFAULT [];
DEFINE FIELD createdAt ON core TYPE datetime DEFAULT time::now() READONLY;
DEFINE FIELD updatedAt ON core TYPE datetime DEFAULT time::now();

-- Nexus Schema

DEFINE TABLE nexus SCHEMAFULL;

DEFINE FIELD name ON nexus TYPE string;
DEFINE FIELD creator ON nexus TYPE record(user);
DEFINE FIELD users ON nexus TYPE array<record(user)> DEFAULT [];
DEFINE FIELD category ON nexus TYPE string ASSERT $value IN ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth"];
DEFINE FIELD files ON nexus TYPE array<record(file)> DEFAULT [];
DEFINE FIELD announcements ON nexus TYPE array<record(announcement)> DEFAULT [];
DEFINE FIELD createdAt ON nexus TYPE datetime DEFAULT time::now() READONLY;
DEFINE FIELD updatedAt ON nexus TYPE datetime DEFAULT time::now();

-- File Schema

DEFINE TABLE file SCHEMAFULL;

DEFINE FIELD title ON file TYPE string;
DEFINE FIELD description ON file TYPE string;
DEFINE FIELD fileUrl ON file TYPE string;
DEFINE FIELD fileName ON file TYPE string;
DEFINE FIELD sentBy ON file TYPE record(user);
DEFINE FIELD timeStamp ON file TYPE datetime DEFAULT time::now() READONLY;

-- Announcement Schema

DEFINE TABLE announcement SCHEMAFULL;

DEFINE FIELD title ON announcement TYPE string;
DEFINE FIELD message ON announcement TYPE string;
DEFINE FIELD sentBy ON announcement TYPE record(user);
DEFINE FIELD timeStamp ON announcement TYPE datetime DEFAULT time::now() READONLY;


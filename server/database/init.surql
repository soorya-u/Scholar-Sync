-- User Schema

DEFINE TABLE user SCHEMAFULL;

DEFINE FIELD id ON user TYPE uuid;
DEFINE FIELD full_name ON user TYPE string;
DEFINE FIELD email ON user TYPE string;
DEFINE FIELD salt ON user TYPE string;
DEFINE FIELD password ON user TYPE string;
DEFINE FIELD user_type ON user TYPE string ASSERT $value IN ["ADMIN", "PSEUDOADMIN", "NORMAL"] DEFAULT "NORMAL";
DEFINE FIELD created_at ON user TYPE datetime DEFAULT time::now() READONLY;

-- Core Schema

DEFINE TABLE core SCHEMAFULL;

DEFINE FIELD id ON core TYPE uuid;
DEFINE FIELD name ON core TYPE string;
DEFINE FIELD creator ON core TYPE record(user);
DEFINE FIELD nexus ON core TYPE array<record(nexus)>;
DEFINE FIELD created_at ON core TYPE datetime DEFAULT time::now() READONLY;
DEFINE FIELD updated_at ON core TYPE datetime DEFAULT time::now();

-- Nexus Schema

DEFINE TABLE nexus SCHEMAFULL;

DEFINE FIELD id ON nexus TYPE uuid;
DEFINE FIELD name ON nexus TYPE string;
DEFINE FIELD creator ON nexus TYPE record(user);
DEFINE FIELD core ON nexus TYPE record(core);
DEFINE FIELD files ON nexus TYPE array<record(file)>;
DEFINE FIELD announcements ON nexus TYPE array<record(announcement)>;
DEFINE FIELD created_at ON nexus TYPE datetime DEFAULT time::now() READONLY;
DEFINE FIELD updated_at ON nexus TYPE datetime DEFAULT time::now();

-- File Schema

DEFINE TABLE file SCHEMAFULL;

DEFINE FIELD id ON file TYPE uuid;
DEFINE FIELD title ON file TYPE string;
DEFINE FIELD file_url ON file TYPE string;
DEFINE FIELD sent_by ON file TYPE record(user);
DEFINE FIELD nexus ON file TYPE record(nexus);
DEFINE FIELD time_stamp ON file TYPE datetime DEFAULT time::now() READONLY;



-- Announcement Schema

DEFINE TABLE announcement SCHEMAFULL;

DEFINE FIELD id ON announcement TYPE uuid;
DEFINE FIELD title ON announcement TYPE string;
DEFINE FIELD message ON announcement TYPE string;
DEFINE FIELD sent_by ON announcement TYPE record(user);
DEFINE FIELD nexus ON announcement TYPE record(nexus);
DEFINE FIELD time_stamp ON announcement TYPE datetime DEFAULT time::now() READONLY;


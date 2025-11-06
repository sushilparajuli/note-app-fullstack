-- Initialize seperate database for each micro services 
-- This script runs when POSTGRES container start for first time
-- CREATE database for each service
CREATE DATABASE noteapp_auth;
CREATE DATABASE noteapp_users;
CREATE DATABASE noteapp_notes;
CREATE DATABASE noteapp_tags;

-- Grant permission to noteappadmin user
GRANT ALL PRIVILEGES ON DATABASE noteapp_auth TO noteappadmin;
GRANT ALL PRIVILEGES ON DATABASE noteapp_users TO noteappadmin;
GRANT ALL PRIVILEGES ON DATABASE noteapp_notes TO noteappadmin;
GRANT ALL PRIVILEGES ON DATABASE noteapp_tags TO noteappadmin;
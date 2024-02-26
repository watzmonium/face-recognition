DROP TABLE IF EXISTS requests;

CREATE TABLE requests (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamp NOT NULL,
  status varchar(20) NOT NULL,
  file_name varchar(50) UNIQUE NOT NULL,
  file_id varchar(50) UNIQUE NOT NULL,
  face_count int
);
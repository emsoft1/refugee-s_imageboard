DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS comment;
CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 CREATE TABLE commenting (
     id SERIAL PRIMARY KEY,
      -- get rid of first and last!
      comment VARCHAR NOT NULL,
       username VARCHAR NOT NULL,
      img_id INTEGER NOT NULL  REFERENCES images(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      

INSERT INTO commenting (comment, username, img_id) VALUES (
    'no nononnonnono',
    'mehrdad',18
   
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/spicedling/wg8d94G_HrWdq7bU_2wT6Y6F3zrX-kej.jpg',
    'discoduck',
    'Elvis',
    'We can''t go on together with suspicious minds.'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/spicedling/XCv4AwJdm6QuzjenFPKJocpipRNNMwze.jpg',
    'discoduck',
    'To be or not to be',
    'That is the question.'
);

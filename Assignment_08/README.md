# Assignment Week 08 / Flávio Pessoa

## Part 01 / Data models and structures for sensor data

How can we find the most suitable framework for your data project? This is an inquiry and an exercise on how to: 1) find the best model for the relations/datum/datapoints and 2) how these features will work within the larger scope and goal of your project.

To start, one should always look at the constrains. Be they techincal, phisolophical or both, these limits put our project into a theoretical space: we can start to see and sketch what will work or not. 

We have data streaming from 2 sensors: a photosensor and a knob. They are placed inside my living/bedroom, which is quite well-lit and can be configured to be my working area, my study room, my dinner table and also an entertaiment space. Placing the sensors within this area is a chance to watch patterns of my daily life and to see them interpolate with time and light conditions. From a more techincal view, the sensors output values (intergers) that can be retrieved every milisecond from a breadboard that has wi-fi connectivity.

## Shaping ideas into structures

Here's a visual scheme for a possible visualization of the data:

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)


    psql (9.3.18, server 9.6.2)
    WARNING: psql major version 9.3, server major version 9.6.
             Some psql features might not work.
    SSL connection (cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256)
    Type "help" for help.
    
    sensorfp=> CREATE TABLE studyRoom (
    sensorfp(> workMood int,
    sensorfp(> realTime timestamp DEFAULT current_timestamp,
    sensorfp(> workLight int);
    CREATE TABLE
    sensorfp=> 
    sensorfp=> \d
               List of relations
     Schema |   Name    | Type  |  Owner   
    --------+-----------+-------+----------
     public | studyroom | table | mczoloft
    (1 row)
    
    sensorfp=> \d studyroom
                    Table "public.studyroom"
      Column   |            Type             |   Modifiers   
    -----------+-----------------------------+---------------
     workmood  | integer                     | 
     realtime  | timestamp without time zone | default now()
     worklight | integer                     | 
    
    sensorfp=> INSERT INTO studyRoom VALUES (1000, DEFAULT, 2000);
    INSERT 0 1
    sensorfp=> \d studyroom
                    Table "public.studyroom"
      Column   |            Type             |   Modifiers   
    -----------+-----------------------------+---------------
     workmood  | integer                     | 
     realtime  | timestamp without time zone | default now()
     worklight | integer                     | 
    
    sensorfp=>
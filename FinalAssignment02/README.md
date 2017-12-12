# Final Assigment 2 // Sensor Data
## Part 01 / Data models and structures for sensor data

This is what I wrote on week 08, thinking about this assignment: 

>We have data streaming from 2 sensors: a photosensor and a knob. They are placed inside my living/bedroom, which is quite well-lit and can be configured to be my working area, my study room, my dinner table and also an entertaiment space. Placing the sensors within this area is a chance to watch patterns of my daily life and to see them interpolate with time and light conditions. From a more techincal view, the sensors output values (intergers) that can be retrieved every milisecond from a breadboard that has wi-fi connectivity.

And this was a visual scheme for a possible visualization of the data:

[![v1](https://raw.githubusercontent.com/mczoloft/data-structures/master/FinalAssignment02/ScreenSensorsV2.jpg)]

## Iterations, expectations and dealing with data

A final review for this project revealed to be a good opportunity to check on some ideas about reliability and integrity.

1. My knob started to report weird readings until November; I assembled the breadboard in different schemes, tried to check into the code. Everything seemed to work fine after buying a better knob and changing the placement of wires. But then...
2. My light sensor catch the same 'bug' as his companion, a struggle against real-life tech diseases, such as improper hardware and digital abandon by its owner.

Instead of treating these faults as bugs, this provided a chance to put the data harvesting process on display as well. Bugs could become features; and data visualization features, by design, should bring insight. What could we learn?

[![v2](https://raw.githubusercontent.com/mczoloft/data-structures/master/FinalAssignment02/ScreenSensorsFinal.jpg)]

I've decided to encode the unreliable data from both sensors with colors. There were also missing data sometimes, and I've chose color to deal with it as well.

Each bar on my visualization is getting data from the JSON being delivered by the EC2 instance.

`[{"sensorday":23,"sensormonth":10,"sensorhour":8,"sensorminute":14,"num_obs":"1","max_work":1000,"max_light":2000}`

There's data for the days and hours and minutes (sensorday, sensorhour, sensorminute). They would be sorted (on the client side: with d3).

Values for the light would be mapped (max_light) into the vertical height of the bars, and also would be fitted into a color scale, transforming them into ordinal/nominal/categorical data (on the client side: with d3 as well).

The knob (max_work) was supposed to bring more detailed data, but workload (from school and other issues) kinda turned the data into a simpler recording of my presence at my room. Either I was there or not.

The visualization on the center is a chance to see them aggregated by the last five hours. Each square shows the average max_light reading for a period of 10 minutes, and the mode for max_work for the same period.

The data is being delivered on this URL:
http://ec2-34-234-82-89.compute-1.amazonaws.com:3000/

The code is being run on a node app, together with the AA data; code can be found here: https://github.com/mczoloft/data-structures/blob/master/FinalApp/FinalApp.js
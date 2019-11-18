# Overview

This is the **Wica-Ex** git repository which is in intended to showcase examples of how WICA usage.
 
WICA stands for *Web Interface for Controls Applications*. The basic idea is to support the streaming of live data 
from a distributed control system to update a user's web pages in real-time.
 
Wica comprises two main components:

* [Wica-HTTP](https://github.com/paulscherrerinstitute/wica-http) - this is a backend HTTP server which 
  receives incoming requests from the web and which generates live data streams containing information 
  for the control system points of interest.

* [Wica-JS](https://github.com/paulscherrerinstitute/wica-js) - this is a frontend Javascript library 
  which scans a user's [web page](https://github.com/paulscherrerinstitute/wica-js#a-simple-wica-webpage-example) 
  for HTML5 tags defining points of interest in the control system. The library then generates requests to the 
  backend server to obtain the necessary data and to update the user's web pages in real-time. 

Further details about how these components interoperate is provided in the 
[how it works](https://github.com/paulscherrerinstitute/wica-js#how-it-works) documentation.

Currently WICA interoperates with the EPICS Control Systems using its well established Channel Access (CA) protocol. 

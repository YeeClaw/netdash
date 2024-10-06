# Overview

The current iteration of this project includes the back end server structure to call [Netdata](https://www.netdata.cloud/) API information on nodes existing in my home network for home labs.

As my home lab setup continues to grow, I've found an ever growing need for a central dashboard to manage all of my local machines, monitor performance, and manage applications. My long term solution is to write my own webapp which contains all of this information only existing on my local network.

[Software Demo Video](https://youtu.be/GlwacZC_mA8)

# Development Environment

My environment consists purely of VSCode for editing, bash for managing git, and Postman for testing API calls.

This project is almost purely typescript (for now until I flesh out the actual webapp part of this webapp!) and is written with the Next.js framework which sets the foundation for this project.

# Useful Websites

- [Next.js Documentation](https://nextjs.org/docs)
- [Netdata API Information](https://learn.netdata.cloud/api)

# Future Work

- The front end experience and the rest of the back end
    - (this is the actual webapp part of the webapp)
- Add more Netdata API calls
- Parsers to collect useful information
- Database to store historical information

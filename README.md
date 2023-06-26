# API-Tracker

This is a simple React/Electron app that is meant to store all the API keys that a developer geneates from different services to ensure they are never lost again.
The applicaion is local and the data is not shared or stored online at all.


## Data Storage

All the data is stored on a compiled JSON file. The application in its current state does not support importing of data or export of the same.

It is possible to write and store the to a SQLITE database but that has not been done in this case.


## Encryption

Data is not currently stored in any encrypted form. However, should you want to do this, you should be able to easily modify the code to achieve the same locally and recompile the electron app.

## Known Issues

Currently, there are 2 main issues.
1. When the data is first saved, you have to reload the page when you want to view the saved API keys.
2. There is a pagination issue, if you have more than 5 apis, you're presently unable to navigate with the next page arrows. To get round this, select the max results to view then select again.
3. On initial load of the APIs listing page, the APIs may not be visible. In this case, change the number of results to view per page and the APIs will be shown.
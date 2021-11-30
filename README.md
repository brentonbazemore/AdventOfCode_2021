# How to use

This project contains all of the needed dependencies and isolates each part of each day to it's own little section in the format of dX/ptY.

There are some helper scripts to quickly execute redundant tasks that are common for each day:

## Helper Scripts

### New Day

`. ./newDay.sh dX`

- Execute from the root of the project (AdventOfCode_2021)
- Replace X with day

### Next Part

`. ./nextPart.sh`

- Execute from dX/pt1

### Finish Day

`. ./finishDay.sh`

- Execute from dX/pt2

## Project Scripts
### Run each part

`npm run start`

- Execute from dX/ptY
- This will compile the TS and execute the code automatically each time

## Debugging in VS Code

1. Navigate to the file you wish to debug and place breakpoints
2. Open the Debug Panel in VS Code `Command + Shift + D`
3. Click "JavaScript Debug Terminal"
4. Execute `npm run start` (the debugger will automatically attach)

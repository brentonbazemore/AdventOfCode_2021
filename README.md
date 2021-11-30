# Getting Started

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

# FAQ

### Why did you make this project structure so convoluted?

This structure grew organically over the years and is basically the summation of quick hacks that automate some minor tasks. I wanted a structure that allowed me to quickly go through the parts, but also allow me to run each legacy part in exactly the same way as when I solved it originally. The nested part folders keep me from breaking earlier parts.
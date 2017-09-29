# Guidelines

## The 3 types/categories

A module should be divided in 3 categories:

  * actions
  * logic
  * methods

### actions

It is responsible to handle all operations that have side effects (e.g. `notifySomeone`, `resetData`, `updateSummary`). If possible, the methods should return the status of the operation triggered by the given action.

### logic

It should hold the pure logic without side effects and not making use of external resources (e.g it should not connect to a database).

### methods

The preferable way for other modules to access data related to this module. It can't have side effects.

## Data flow

Both incoming and outgoing data should make use of extended (as much as possible) documents. The signatures should make use of named variables.
In other words, the methods should be declared as `myFn({person, brand})` instead of `myFn(personId, brandId)`.

import { createSelector } from 'reselect'; 

const selectedUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectedUser],
    (user) => user.currentUser
)
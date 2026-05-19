/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/prefer-default-export */
export const isValidItemId = (id: string | undefined): id is string => !!id && !isNaN(+id) && +id > 0;

export const ACTION_TEST = 'TODO.TEST_ACTION';
export const ACTION_SORT = 'TODO.SORT';

export const testAction = ({ text }: { text: string }) => ({
  type: ACTION_TEST,
  text
});

export const sortAction = ({ orderBy }: { orderBy: string }) => ({
  type: ACTION_SORT,
  orderBy
});

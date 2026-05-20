import { toast } from 'sonner';

import { ErrorMessages } from '@lib/errors';

type TodoErrorCode =
    | typeof ErrorMessages.TODO.TODO_NO_ID
    | typeof ErrorMessages.TODO.NOT_FOUND
    | typeof ErrorMessages.TODO.FORBIDDEN
    | typeof ErrorMessages.TODO.CREATE_FAILED
    | typeof ErrorMessages.TODO.UPDATE_FAILED
    | typeof ErrorMessages.TODO.DELETE_FAILED;

const TODO_ERROR_MESSAGES: Record<TodoErrorCode, string> = {
    [ErrorMessages.TODO.TODO_NO_ID]: 'Something went wrong. Please refresh the page and try again.',
    [ErrorMessages.TODO.NOT_FOUND]: 'This task could not be found. It may have been deleted.',
    [ErrorMessages.TODO.FORBIDDEN]: 'You don’t have permission to access this task.',
    [ErrorMessages.TODO.CREATE_FAILED]: 'Couldn’t create the task. Please try again.',
    [ErrorMessages.TODO.UPDATE_FAILED]: 'Failed to save changes. Please try again.',
    [ErrorMessages.TODO.DELETE_FAILED]: 'Couldn’t delete the task. Please try again.',
};

export const handleTodoError = (error: unknown) => {
    const code = (error as any)?.response?.data?.error;

    if (code && code in TODO_ERROR_MESSAGES) {
        toast.error(TODO_ERROR_MESSAGES[code as TodoErrorCode]);

        return;
    }

    toast.error('Something went wrong. Please try again.');
};

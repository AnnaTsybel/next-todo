import { toast } from 'sonner';

import { ErrorMessages } from '@lib/errors';

type TodoTypeErrorCode =
    | typeof ErrorMessages.TODO_TYPES.NOT_FOUND
    | typeof ErrorMessages.TODO_TYPES.FORBIDDEN
    | typeof ErrorMessages.TODO_TYPES.CREATE_FAILED
    | typeof ErrorMessages.TODO_TYPES.UPDATE_FAILED
    | typeof ErrorMessages.TODO_TYPES.DELETE_FAILED
    | typeof ErrorMessages.TODO_TYPES.SYSTEM_TYPE_EDIT
    | typeof ErrorMessages.TODO_TYPES.SYSTEM_TYPE_DELETE;

const TODO_TYPE_ERROR_MESSAGES: Record<TodoTypeErrorCode, string> = {
    [ErrorMessages.TODO_TYPES.NOT_FOUND]: 'This todo type could not be found.',
    [ErrorMessages.TODO_TYPES.FORBIDDEN]: 'You do not have permission to access this todo type.',
    [ErrorMessages.TODO_TYPES.CREATE_FAILED]: 'Failed to create todo type. Please try again.',
    [ErrorMessages.TODO_TYPES.UPDATE_FAILED]: 'Failed to update todo type. Please try again.',
    [ErrorMessages.TODO_TYPES.DELETE_FAILED]: 'Failed to delete todo type. Please try again.',
    [ErrorMessages.TODO_TYPES.SYSTEM_TYPE_EDIT]: 'System todo types cannot be edited.',
    [ErrorMessages.TODO_TYPES.SYSTEM_TYPE_DELETE]: 'System todo types cannot be deleted.',
};

export const handleTodoTypeError = (error: unknown) => {
    const code = (error as any)?.response?.data?.error;

    if (code && code in TODO_TYPE_ERROR_MESSAGES) {
        toast.error(TODO_TYPE_ERROR_MESSAGES[code as TodoTypeErrorCode]);

        return;
    }

    toast.error('Something went wrong. Please try again.');
};

export const handleTodoError = (error: unknown) => {
    const code = (error as any)?.response?.data?.error;

    if (code && code in TODO_TYPE_ERROR_MESSAGES) {
        toast.error(TODO_TYPE_ERROR_MESSAGES[code as TodoTypeErrorCode]);

        return;
    }

    toast.error('Something went wrong. Please try again.');
};

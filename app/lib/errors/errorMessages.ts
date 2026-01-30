export const ErrorMessages = {
    AUTH: {
        UNAUTHORIZED: 'Unauthorized',
        INVALID_PASSWORD: 'Invalid password',
        USER_NOT_EXIST: 'This user does not exist',
        USER_EXIST: 'User already exists',
        INVALID_TOKEN: 'Invalid token',
        TOKEN_EXPIRED: 'Token expired',
    },
    VALIDATION: {
        INVALID_INPUT: 'Invalid input',
        REQUIRED_FIELD: 'Required field missing',
        EMAIL_FORMAT: 'Invalid email format',
        PASSWORD_WEAK: 'Password is too weak',
        NAME_TOO_SHORT: 'Name is too short',
        SURNAME_TOO_SHORT: 'Surname is too short',
    },
    TODO: {
        TODO_NO_ID: 'Todo id not provided',
        NOT_FOUND: 'Todo not found',
        FORBIDDEN: 'You have no access to this todo',
        CREATE_FAILED: 'Failed to create todo',
        UPDATE_FAILED: 'Failed to update todo',
        DELETE_FAILED: 'Failed to delete todo',
    },
    COMMON: {
        NOT_FOUND: 'Not found',
        SERVER_ERROR: 'Unexpected server error',
        NETWORK_ERROR: 'Network error',
        UNKNOWN_ERROR: 'Unknown error occurred',
    },
    API: {
        BAD_REQUEST: 'Bad request',
        FORBIDDEN: 'Forbidden',
        CONFLICT: 'Conflict',
    },
} as const;

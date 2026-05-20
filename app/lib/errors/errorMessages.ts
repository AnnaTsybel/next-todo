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
    TODO_TYPES: {
        NOT_FOUND: 'Todo type not found',
        FORBIDDEN: 'Access denied',
        CREATE_FAILED: 'Internal server error while creating todo type',
        UPDATE_FAILED: 'Internal server error while updating todo type',
        DELETE_FAILED: 'Internal server error while deleting todo type',
        SYSTEM_TYPE_EDIT: 'System todo types cannot be modified',
        SYSTEM_TYPE_DELETE: 'System todo types cannot be deleted',
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
    USER: {
        AVATAR: {
            SIZE: 'File size must be less than 2MB',
            INVALID_TYPE: 'Invalid file type. Only JPEG, PNG, and WebP are allowed',
            NO_IMAGE: 'Avatar file is required',
            NO_DELETE_IMAGE: 'No avatar to delete',
        },
    },
} as const;
